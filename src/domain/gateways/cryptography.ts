export interface Encrypt<T = any, R = any> {
  encrypt: (input: T) => Promise<R>
}
