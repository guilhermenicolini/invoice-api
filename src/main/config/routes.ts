import { Router, Express } from 'express'
import healthCheckRoute from '@/main/routes/health-check-route'

export default (app: Express): void => {
  const router = Router({ mergeParams: true })
  healthCheckRoute(router)
  app.use(router)
}
