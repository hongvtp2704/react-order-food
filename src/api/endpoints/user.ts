export const getUserUrl: (id: string) => string = (id) => `/api/users/show/${id}`;
export const editUserUrl: (id: string) => string = (id) => `/api/users/${id}`;
export const changePasswordUrl: (id: string) => string = (id) => `/api/users/update-password/${id}`;