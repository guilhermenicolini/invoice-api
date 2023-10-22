export const healthPaths = {
  '/health': {
    get: {
      tags: ['Health'],
      summary: 'Healrh check for Invoice API',
      descrition: 'This API is open and can be executed by **anyone**',
      operationId: 'healthCheck',
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'online'
                  },
                  version: {
                    type: 'string',
                    example: '1.0.0'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
