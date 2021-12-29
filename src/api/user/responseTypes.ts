import { User } from "models/types";

export type GetUserResponseType = {
  status: number;
  data: User;
};


export type EditUserResponseType = {
  status: number;
  data: User;
};

export type ChangePasswordResponseType = {
  status: number;
  message: string;
}