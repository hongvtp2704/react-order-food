export type EditUserRequestType = {
  email: string;
  phone: string;
  name: string;
  address: string;
};

export type ChangePasswordRequest = {
  oldpassword: string;
  password: string;
}