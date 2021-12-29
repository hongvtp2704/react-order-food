export const loginUrl: string = `/api/auth/login`;
export const verifyUrl: (token: string) => string = (token) => `/api/auth/verify/${token}`;
export const signupUrl: string = `/api/auth/register`;