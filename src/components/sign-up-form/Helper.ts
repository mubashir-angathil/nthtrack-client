import authenticationServices from "../../services/auth-services/AuthServices";
import { SubmitHandler } from "react-hook-form";
import { InferType, object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cookieServices from "../../services/storage-services/CookieServices";
import { useAuthContext } from "../../utils/helpers/context/auth-context/AuthContext";
import { Location, useLocation, useNavigate } from "react-router-dom";
import routes from "../../utils/helpers/routes/Routes";
import { useEffect, useState } from "react";
import { ApiError } from "../../services/Helper";
import generalFunctions from "../../utils/helpers/functions/GeneralFunctions";

// Define the validation schema for the sign-up form
export const signUpFormSchema = object({
  username: string().required(),
  email: string().email().required(),
  password: string().min(4).required(),
  confirmPassword: string().min(4).required(),
}).required();

// Define the type for the form inputs based on the schema
export type SignUpFormInputs = InferType<typeof signUpFormSchema>;

// Custom hook for handling sign-up logic
export const useSignUp = () => {
  const location: Location = useLocation();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  // Initialize the React Hook Form with validation resolver and default values
  const { handleSubmit, control, setError } = useForm<SignUpFormInputs>({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    setAuthDetails,
    authDetails: { auth },
  } = useAuthContext();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    if (data.password === data.confirmPassword) {
      await handleSignUp(data);
    } else {
      setError("confirmPassword", { message: "Password does not match!!" });
    }
  };

  // Function to handle sign-up logic
  const handleSignUp = async (props: SignUpFormInputs) => {
    try {
      // Call the sign-up API from authenticationServices
      const { data, success } = await authenticationServices.doSignUp({
        username: generalFunctions.capitalizeString(props.username),
        email: props.email,
        password: props.password,
      });

      // If sign-up is successful, set authentication details in cookies
      if (data && success) {
        location.state.from = routes.home.path.concat(
          "/",
          routes.projects.path,
        );
        cookieServices.setAuthDetails(data);
        setAuthDetails({
          auth: true,
          user: data,
        });
      }
    } catch (error) {
      // Handle errors from the sign-up API
      generalFunctions.fieldErrorsHandler(error as ApiError, setError);

      console.error("SignUp:", error);
    }
  };

  useEffect(() => {
    if (auth)
      if (location.state) {
        navigate(location.state.from, { replace: true });
      } else {
        navigate(routes.home.path, {
          replace: true,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, navigate]);

  // Return the necessary properties for the form
  return {
    isVisiblePassword,
    setIsVisiblePassword,
    control,
    handleSubmit,
    onSubmit,
  };
};
