declare module 'bcryptjs' {
  export function compare(s: string, hash: string): Promise<boolean>;
  export function hash(s: string, salt: number): Promise<string>;
  export function genSalt(saltRounds: number): Promise<string>;
}
