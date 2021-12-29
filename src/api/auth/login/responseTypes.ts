import { User } from "models/types";

export type LoginResponse = {
  data: User;
};

export type LoginResponseError = {
  data: any;
};
