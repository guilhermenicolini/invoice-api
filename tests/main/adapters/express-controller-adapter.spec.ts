import { adaptController } from '@/main/adapters'
import { Controller } from '@/application/controllers'
import { RequestHandler, Request, Response, NextFunction } from 'express'
import { MockProxy, mock } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { ServerError } from '@/application/errors'

describe('ExpressController Adapter', () => {
  let sut: RequestHandler
  let req: Request
  let res: Response
  let next: NextFunction
  let controller: MockProxy<Controller>

  beforeAll(() => {
    req = getMockReq({
      headers: {
        anyHeader: 'any_header'
      },
      params: {
        anyParam: 'any_param',
        anyHeader: 'param_header'
      },
      body: {
        anyBody: 'any_body',
        anyParam: 'body_param',
        anyHeader: 'body_header'
      }
    })
    next = getMockRes().next
    controller = mock<Controller>()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      body: { data: 'any_data' }
    })
  })

  beforeEach(() => {
    res = getMockRes().res
    sut = adaptController(controller)
  })

  test('Should call handle with correct request', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({
      anyHeader: 'any_header',
      anyParam: 'any_param',
      anyBody: 'any_body'
    })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  test('Should call handle with empty request', async () => {
    const req = getMockReq()

    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  test('Should return 200 and valid data', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ data: 'any_data' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  test('Should return 400 and valid error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 400,
      error: new Error('any_error')
    })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 and valid error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 500,
      error: new ServerError(new Error('any_error'))
    })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while processing your request. Please, try again later' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
