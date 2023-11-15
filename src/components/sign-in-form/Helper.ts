import { useEffect, useState } from "react";
import authenticationServices from "../../services/auth-services/AuthServices";
import { SubmitHandler } from "react-hook-form";
import { InferType, object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cookieServices from "../../services/storage-services/CookieServices";
import { useAuthContext } from "../../utils/helpers/context/auth-context/AuthContext";
import { Location, useLocation, useNavigate } from "react-router-dom";
import routes from "../../utils/helpers/routes/Routes";
import { ApiError } from "../../services/Helper";
import generalFunctions from "../../utils/helpers/functions/GeneralFunctions";

// Define the validation schema for the sign-in form
export const signInFormSchema = object({
  usernameOrEmail: string().email().required(),
  password: string().min(4).required(),
}).required();

// Define the type for the form inputs based on the schema
export type SignInFormInputs = InferType<typeof signInFormSchema>;

// Custom hook for handling sign-up logic
export const useSignIn = () => {
  const location: Location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  // Initialize the React Hook Form with validation resolver and default values
  const { handleSubmit, control, setError } = useForm<SignInFormInputs>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const {
    setAuthDetails,
    authDetails: { auth },
  } = useAuthContext();

  const navigate = useNavigate();

  // Handle form submission
  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    setIsLoading(true);
    await handleSignIn(data);
    setIsLoading(false);
  };

  // Function to handle sign-in logic
  const handleSignIn = async (props: SignInFormInputs) => {
    try {
      // Call the sign-in API from authenticationServices
      const {
        data: { success, data },
      } = await authenticationServices.doSignIn({
        usernameOrEmail: props.usernameOrEmail,
        password: props.password,
      });
      // If sign-in is successful, set authentication details in cookies
      if (success && data) {
        cookieServices.setAuthDetails(data);
        setAuthDetails({
          auth: true,
          user: data,
        });
        navigate(routes.home.path, {
          replace: true,
        });
      }
    } catch (error) {
      // Handle errors from the sign-ip API
      generalFunctions.fieldErrorsHandler(error as ApiError, setError);

      console.error("SignIn:", error);
    }
  };
  useEffect(() => {
    if (auth)
      if (location.state) {
        navigate(location.state.from, { replace: true });
      } else {
        navigate(routes.home.path, { replace: true });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, navigate]);

  // Return the necessary properties for the form
  return { isLoading, control, handleSubmit, onSubmit };
};
