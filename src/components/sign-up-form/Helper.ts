import authenticationServices from "../../services/auth-services/AuthServices";

export const useSignUp = () => {
  const handleSignUp = async () => {
    try {
      const signUp = await authenticationServices.doSignUp();
      console.log(signUp);
    } catch (error: any) {
      console.log(error);
    }
  };
  return { handleSignUp };
};
