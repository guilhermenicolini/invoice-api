import initSwagger from './swagger'
import initRoutes from './routes'
import express, { Express } from 'express'

export default (): Express => {
  const app = express()

  initSwagger(app)
  initRoutes(app)

  return app
}
