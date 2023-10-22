import { ServerError } from '@/application/errors'

export enum HttpStatusCode {
  unknown = -1,
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export interface HttpResponse<T = any> {
  statusCode: HttpStatusCode
  error?: Error
  body?: T
}

export const serverError = (error: unknown): HttpResponse => ({
  statusCode: HttpStatusCode.serverError,
  error: new ServerError(error instanceof Error ? error : undefined)
})
