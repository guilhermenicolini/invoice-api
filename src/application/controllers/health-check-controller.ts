import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'

export class HealthCheckController extends Controller {
  constructor (
    private readonly version: string
  ) {
    super()
  }

  override async perform (): Promise<HttpResponse> {
    return ok({ status: 'online', version: this.version })
  }
}
