import { SignInUseCase, setupSignInUseCase, Input } from '@/domain/usecases'
import { FindCompanyByTaxId, CreateCompany, Encrypt, GenerateToken } from '@/domain/gateways'

import { MockProxy, mock } from 'jest-mock-extended'
import { BusinessError } from '@/domain/errors'

describe('SignIn UseCase', () => {
  let sut: SignInUseCase
  let repo: MockProxy<FindCompanyByTaxId & CreateCompany>
  let crypto: MockProxy<Encrypt>
  let security: MockProxy<GenerateToken>

  const input: Input = {
    taxId: 'any_tax_id',
    registryId: 'any_registry_id',
    name: 'any_name',
    mobilePhone: 'any_mobile_phone',
    email: 'any_email',
    password: 'any_password'
  }

  beforeAll(() => {
    repo = mock()
    repo.findByTaxId.mockResolvedValue(undefined)
    repo.create.mockResolvedValue('any_id')

    crypto = mock()
    crypto.encrypt.mockResolvedValue('any_encrypted_string')

    security = mock()
    security.generateToken.mockResolvedValue('any_token')
  })

  beforeEach(() => {
    sut = setupSignInUseCase(repo, crypto, security)
  })

  test('Should call findByTaxId with correct input', async () => {
    await sut(input)
    expect(repo.findByTaxId).toHaveBeenCalledWith('any_tax_id')
  })

  test('Shoudld throw if findByTaxId throws', async () => {
    const error = new Error('some_error')
    repo.findByTaxId.mockRejectedValueOnce(error)
    const promise = sut(input)
    await expect(promise).rejects.toThrowError(error)
  })

  test('Should return BusinessError if findById returns record', async () => {
    repo.findByTaxId.mockResolvedValueOnce({
      id: 'any_id',
      taxId: 'any_tax_id',
      registryId: 'any_registry_id',
      name: 'any_name',
      mobilePhone: 'any_mobile_phone',
      email: 'any_email',
      password: 'any_password'
    })
    const result = await sut(input)
    expect(result).toBeInstanceOf(BusinessError)
    expect((result as BusinessError).message).toEqual('Company already exists for this taxId')
  })

  test('Should call encrypt with correct input', async () => {
    await sut(input)
    expect(crypto.encrypt).toHaveBeenCalledWith('any_password')
  })

  test('Shoudld throw if encrypt throws', async () => {
    const error = new Error('some_error')
    crypto.encrypt.mockRejectedValueOnce(error)
    const promise = sut(input)
    await expect(promise).rejects.toThrowError(error)
  })

  test('Should call create with correct input', async () => {
    await sut(input)
    expect(repo.create).toHaveBeenCalledWith({
      taxId: 'any_tax_id',
      registryId: 'any_registry_id',
      name: 'any_name',
      mobilePhone: 'any_mobile_phone',
      email: 'any_email',
      password: 'any_encrypted_string'
    })
  })

  test('Shoudld throw if create throws', async () => {
    const error = new Error('some_error')
    repo.create.mockRejectedValueOnce(error)
    const promise = sut(input)
    await expect(promise).rejects.toThrowError(error)
  })

  test('Should call generateToken with correct input', async () => {
    await sut(input)
    expect(security.generateToken).toHaveBeenCalledWith({
      id: 'any_id',
      name: 'any_name'
    })
  })

  test('Shoudld throw if generateToken throws', async () => {
    const error = new Error('some_error')
    security.generateToken.mockRejectedValueOnce(error)
    const promise = sut(input)
    await expect(promise).rejects.toThrowError(error)
  })

  test('Shoudld return correct output on success', async () => {
    const result = await sut(input)
    expect(result).toBe('any_token')
  })
})
