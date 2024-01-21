import React from "react";

/**
 * AuthContextProps
 *
 * Defines the shape of the authentication context, including authDetails and setAuthDetails.
 *
 * @interface
 */
export interface AuthContextProps {
  authDetails: AuthDetailsProps;
  setAuthDetails: React.Dispatch<React.SetStateAction<AuthDetailsProps>>;
}

/**
 * AuthDetailsProps
 *
 * Defines the shape of the authentication details, including auth status and user information.
 *
 * @interface
 */
interface AuthDetailsProps {
  auth: boolean;
  user: {
    id: number | null;
    email: string | null;
    username: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    picture?: string;
  };
}

/**
 * initialAuthDetailsState
 *
 * Represents the initial state for authDetails, setting auth to false and user details to null.
 *
 * @constant
 * @type {AuthDetailsProps}
 */
export const initialAuthDetailsState: AuthDetailsProps = {
  auth: false,
  user: {
    id: null,
    email: null,
    username: null,
    accessToken: null,
    refreshToken: null,
  },
};
