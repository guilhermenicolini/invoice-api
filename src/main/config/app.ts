import initRoutes from './routes'
import express, { Express } from 'express'

export default (): Express => {
  const app = express()

  initRoutes(app)

  return app
}
