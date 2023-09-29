"use client";

import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { signin } from "@/requests";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <>
      {isLogin ? (
        <SignInForm
          toggleAuthType={switchAuthModeHandler}
          signInHandler={signin}
        />
      ) : (
        <SignUpForm
          toggleAuthType={switchAuthModeHandler}
          signInHandler={signin}
        />
      )}
    </>
  );
};

export default AuthForm;
