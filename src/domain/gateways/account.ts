import { Company } from '@/domain/models'

export interface FindCompanyByTaxId {
  findByTaxId: (taxId: string) => Promise<Company | undefined>
}

export interface CreateCompany {
  create: (input: Pick<Company, 'taxId' | 'registryId' | 'name' | 'mobilePhone' | 'email' | 'password'>) => Promise<string>
}

export namespace CreateCompany {
  export type Input = Pick<Company, 'taxId' | 'registryId' | 'name' | 'mobilePhone' | 'email' | 'password'>
  export type Output = string
}
