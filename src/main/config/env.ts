interface Env {
  version: string
  port: number
}

export const env: Env = {
  version: process.env.npm_package_version as string,
  port: parseInt(process.env.PORT as string || '5053')
}
