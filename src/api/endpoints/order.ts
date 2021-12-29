export const createOrderUrl: string = `/api/order`;
export const getOrderByUserUrl: (userId: string) => string = (userId) => `/api/order/showByUser/${userId}`;
export const deleteOrderUrl: (id: string) => string = (id) => `/api/order/${id}`;