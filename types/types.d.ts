import { ReactNode } from "react";

export interface CredentialsType {
  username: string;
  password: string;
}

export interface ChildrenType {
  children: ReactNode;
}

export interface ParamsIdType {
  params: {
    id: string;
  };
}
