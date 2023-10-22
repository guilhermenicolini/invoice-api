import { Controller, HealthCheckController } from '@/application/controllers'
import { env } from '@/main/config/env'

export const makeHealthCheckController = (): Controller => new HealthCheckController(env.version)
