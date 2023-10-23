import { BaseError } from '@/domain/errors'

export class ServerError extends BaseError {
  constructor (error: Error | undefined) {
    super('ServerError', 'An error occurred while processing your request. Please, try again later', error)
  }
}
