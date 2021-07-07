export interface CredentialsInterface {
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCredentials(arg: any): arg is CredentialsInterface {
  return arg && arg.email && arg.password;
}
