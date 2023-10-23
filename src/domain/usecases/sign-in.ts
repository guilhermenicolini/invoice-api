import { FindCompanyByTaxId, CreateCompany, Encrypt, GenerateToken } from '@/domain/gateways'
import { BusinessError } from '@/domain/errors'

export type Input = CreateCompany.Input
export type Output = string | Error

export type SignInUseCase = (input: Input) => Promise<Output>
type Setup = (
  repo: FindCompanyByTaxId & CreateCompany,
  crypto: Encrypt<string, string>,
  security: GenerateToken<{
    id: string
    name: string
  }>,
) => SignInUseCase

export const setupSignInUseCase: Setup =
  (repo, crypto, security) =>
    async ({ taxId, registryId, name, mobilePhone, email, password }) => {
      const company = await repo.findByTaxId(taxId)
      if (company) return new BusinessError('Company already exists for this taxId')

      const hashedPassword = await crypto.encrypt(password)

      const created = await repo.create({
        taxId,
        registryId,
        name,
        mobilePhone,
        email,
        password: hashedPassword
      })

      const token = await security.generateToken({ id: created, name })

      return token
    }
