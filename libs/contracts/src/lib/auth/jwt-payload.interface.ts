export interface JwtPayloadInterface {
  email: string;
  roles: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isJwtPayload(arg: any): arg is JwtPayloadInterface {
  return arg && arg.email && arg.roles;
}
