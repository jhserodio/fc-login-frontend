const JWT = 'jwt';

export const getJwtToken = () => localStorage.getItem(JWT);
export const putJwtToken = (jwt: string) => localStorage.setItem(JWT, jwt);
export const clearJwtToken = () => localStorage.removeItem(JWT);
