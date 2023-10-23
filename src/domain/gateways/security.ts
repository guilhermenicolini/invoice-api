export interface GenerateToken<T = any> {
  generateToken: (input: T) => Promise<string>
}
