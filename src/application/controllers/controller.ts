import { HttpResponse, serverError } from '@/application/helpers'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      const result = await this.perform(httpRequest)
      return result
    } catch (err) {
      return serverError(err)
    }
  }
}
