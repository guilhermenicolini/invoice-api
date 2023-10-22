import { adaptController } from '@/main/adapters'
import { makeHealthCheckController } from '@/main/factories/application'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/health', adaptController(makeHealthCheckController()))
}
