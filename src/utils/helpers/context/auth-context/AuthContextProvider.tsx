import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { AuthContextProps, initialAuthDetailsState } from "./Helper";
import cookieServices from "../../../../services/storage-services/CookieServices";

/**
 * AuthContextProvider
 *
 * Provides the AuthContext to the entire application, managing authentication details.
 * Reads authentication details from cookies on mount and updates the context accordingly.
 *
 * @component
 * @param {Object} props - React component properties.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the AuthContextProvider.
 * @returns {JSX.Element} Rendered AuthContextProvider.
 */
const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // State to hold authentication details
  const [authDetails, setAuthDetails] = useState<
    AuthContextProps["authDetails"]
  >(initialAuthDetailsState);

  /**
   * Update authDetails from cookies on mount.
   */
  const updateAuthDetailsFromCookie = () => {
    const newAuthDetails = cookieServices.getAuthDetails();

    if (newAuthDetails) {
      // If newAuthDetails is present in the cookie, update authDetails
      setAuthDetails({
        auth: true,
        user: newAuthDetails,
      });
    }
  };

  // useEffect to run updateAuthDetailsFromCookie on mount
  useEffect(() => {
    updateAuthDetailsFromCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render AuthContext.Provider with updated authDetails
  return (
    <AuthContext.Provider value={{ authDetails, setAuthDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
