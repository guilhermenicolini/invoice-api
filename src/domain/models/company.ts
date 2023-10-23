import { Address } from '@/domain/models'

export interface Company {
  id: string
  taxId: string
  registryId: string
  name: string
  mobilePhone: string
  email: string
  password: string
  address?: Address
}
