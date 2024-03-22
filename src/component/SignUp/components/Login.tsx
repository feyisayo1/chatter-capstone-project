import "../styles/login.css";
import { useState } from "react";
import { auth } from "../../../App";
import SignInWithOthers from "./SignInWithOthers";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [checkUser, setCheckUseer] = useState("");

  const handleEmail = (e: any) => {
    email = e.target.value;
    setEmail(email);
  };
  const handlePassword = (e: any) => {
    password = e.target.value;
    setPassword(password);
  };
  //the fuctions below is used to re renendring caution messages to the sign up form when the signInWithEmailAndPassword retuens an error

  const handelUserNotFound = () => {
    checkUser = "User not found.";
    setCheckUseer(checkUser);
  };
  const handelInvaldCredentials = () => {
    checkUser = "Wrong Email or Passowrd \n Try Again";
    setCheckUseer(checkUser);
  };
  const handelTooManyAttempts = () => {
    checkUser = "Too many unsuccessful sign-in attempts. \n Try again later.";
    setCheckUseer(checkUser);
  };
  const handelUserDisabled = () => {
    checkUser =
      "User account has been disabled by an administrator. \n Try again later.";
    setCheckUseer(checkUser);
  };
  const handelFailedNetwork = () => {
    checkUser =
      "Network error occurred. Please check your internet connection.";
    setCheckUseer(checkUser);
  };

  const logInUser = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        window.location.href = "/feeds";
      }
    } catch (error: unknown) {
      if (error instanceof Error && "code" in error) {
        switch (error.code) {
          case "auth/user-not-found":
            handelUserNotFound();
            break;
          case "auth/invalid-credential":
            handelInvaldCredentials();
            break;
          case "auth/too-many-requests":
            handelTooManyAttempts();
            break;
          case "auth/user-disabled":
            handelUserDisabled;
            break;
          case "auth/network-request-failed":
            handelFailedNetwork();
            break;
          default:
            setCheckUseer("An error occurred");
        }
      } else {
        setCheckUseer("Unknown error occurred. Please Try Again");
      }
    }
    e.target.reset();
  };

  return (
    <form id="log-in" onSubmit={logInUser}>
      {checkUser && <p>{checkUser}</p>}

      <label htmlFor="Email">
        Email address
        <input
          type="email"
          name=""
          id="Email"
          placeholder="Johndoe@gmail.com"
          onChange={handleEmail}
        />
      </label>

      <label htmlFor="Password">
        Password
        <input
          type="password"
          name=""
          id="Password"
          placeholder="**********"
          onChange={handlePassword}
        />
      </label>

      <div>
        <button onClick={logInUser}>Log in</button>

        <SignInWithOthers />
      </div>
    </form>
  );
};

export default Login;
