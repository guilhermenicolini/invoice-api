import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'
import { redirect, noCache } from '@/main/middlewares'
import swaggerConfig from '@/main/docs'

export default (app: Express): void => {
  app.get('/', redirect('/api-docs'))
  app.use('/api-docs', noCache, serve, setup(swaggerConfig))
}
