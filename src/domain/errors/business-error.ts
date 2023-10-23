import { BaseError } from './base-error'

export class BusinessError extends BaseError {
  constructor (message: string, error?: Error) {
    super('BusinessError', message, error)
  }
}
