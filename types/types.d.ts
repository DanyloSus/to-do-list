// import from libraries
import { ReactNode } from "react";

// type for credential on authentification
export interface CredentialsType {
  username: string;
  password: string;
}

// type for faster children props
export interface ChildrenType {
  children: ReactNode;
}

// type for params from link
export interface ParamsIdType {
  params: {
    id: string;
  };
}
