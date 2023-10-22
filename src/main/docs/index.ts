import { env } from '@/main/config/env'
import { healthPaths } from '@/main/docs/paths'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Invoice API',
    description: 'API to issue Brazil invoices',
    version: env.version,
    contact: {
      name: 'Guilherme Nicolini',
      email: 'guilhermenicolini@gmail.com',
      url: 'https://www.linkedin.com/in/guilhermenicolini'
    },
    license: {
      name: 'MIT Licence',
      url: 'https://spdx.org/licenses/MIT.html'
    }
  },
  tags: [
    {
      name: 'Health',
      description: 'Health check related APIs'
    }
  ],
  paths: {
    ...healthPaths
  }
}
