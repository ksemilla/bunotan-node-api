export interface FindAllResult<T> {
  count: number;
  list: T[];
}

export interface CreateResult {
  id: number;
}

export interface VerifyTokenResult {
  username: string;
  sub: number;
  iat: number;
  exp: number;
}
