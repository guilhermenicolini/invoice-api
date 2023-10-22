import { Controller } from '@/application/controllers'
import { HttpResponse, HttpStatusCode } from '@/application/helpers'
import { ServerError } from '@/application/errors'

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: HttpStatusCode.ok,
    body: 'any_body'
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub()
  })

  test('Should return 500 if perform throws', async () => {
    const error = new Error('perform_error')
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const response = await sut.handle('any_request')
    expect(response).toEqual({
      statusCode: 500,
      error: new ServerError(error)
    })
    expect((response.error as ServerError).innerException).toEqual(error)
  })

  test('Should return 500 with no error if perform throws not error', async () => {
    const error = 'perform_error'
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const response = await sut.handle('any_value')
    expect(response).toEqual({
      statusCode: 500,
      error: new ServerError(undefined)
    })
    expect((response.error as ServerError).innerException).toEqual(undefined)
  })

  test('Should return same result as perform', async () => {
    const response = await sut.handle('any_value')

    expect(response).toEqual(sut.result)
  })
})
