import { createContext, useContext } from "react";
import { AuthContextProps, initialAuthDetailsState } from "./Helper";

/**
 * AuthContext
 *
 * Context for managing authentication details within the application.
 * Provides a context with authDetails and setAuthDetails function.
 *
 * @context
 * @type {React.Context<AuthContextProps>}
 */
const AuthContext: React.Context<AuthContextProps> =
  createContext<AuthContextProps>({
    authDetails: initialAuthDetailsState,
    setAuthDetails: () => {},
  });

/**
 * useAuthContext
 *
 * Custom hook for consuming the AuthContext within components.
 *
 * @returns {AuthContextProps} The current authentication context.
 * @throws {Error} Throws an error if used outside a FormProvider.
 */
export const useAuthContext = (): AuthContextProps => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return authContext;
};

export default AuthContext;
