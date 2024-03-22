import "../styles/register.css";
import { useState } from "react";
import { auth } from "../../../App";
import SignInWithOthers from "./SignInWithOthers";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";

const Register: React.FC = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [emailCheck, setEmailCheck] = useState("");
  let [passwordCheck, setPasswordCheck] = useState("");
  let [confirmPasword, setConfirmPassword] = useState("");
  let [selectedOption, setSelectedOption] = useState("Writer");
  const [fullName, setFullName] = useState({
    firstName: "",
    lastName: "",
  });

  const handleFullName = (e: any) => {
    if (e.target.name == "first-name") {
      fullName.firstName = e.target.value;
      setFullName(fullName);
    }
    if (e.target.name == "last-name") {
      fullName.lastName = e.target.value;
      setFullName(fullName);
    }
  };

  const handleEmail = (e: any) => {
    email = e.target.value;
    setEmail(email);
    setEmailCheck("");
    e.target.style.borderColor = "#ced4da";
  };

  const handleOption = (e: any) => {
    selectedOption = e.target.value;
    setSelectedOption(selectedOption);
  };

  const handlePassword = (e: any) => {
    password = e.target.value;
    setPassword(password);
    if (confirmPasword == "") {
      password = e.target.value;
      setPassword(password);
    } else if (password == confirmPasword) {
      setPasswordCheck("");
      e.target.parentElement.nextElementSibling.lastElementChild.style.borderColor =
        "green";
    } else {
      setPasswordCheck("password doesn't match");
      e.target.parentElement.nextElementSibling.children[1].style.borderColor =
        "red";
    }
  };

  const handleConfirmPassword = (e: any) => {
    confirmPasword = e.target.value;
    setConfirmPassword(confirmPasword);

    if (password !== confirmPasword) {
      e.target.style.borderColor = "red";

      setPasswordCheck("password doesn't match");
    }
    if (password == confirmPasword) {
      e.target.style.borderColor = "green";
      setPasswordCheck("");
    }
  };

  const SignInUser = async (e: any) => {
    e.preventDefault();
    if (password == confirmPasword) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user) {
          await updateProfile(user, {
            displayName: `${fullName.firstName} ${fullName.lastName}`,
          });
          window.location.href = "/feeds";
        }
        e.target.reset();
      } catch (error: unknown) {
        if (error instanceof Error && "code" in error) {
          switch (error.code) {
            case "auth/email-already-in-use":
              handleEmailAlreadyExist();
              break;
            case "auth/weak-password":
              handleWeakPassword();
              break;
            // Handle other specific error codes as needed
            default:
              console.log("An error :", error.message);
          }
        } else {
          console.log("Unknown error occurred:", error);
        }
      }
    } else {
      setPasswordCheck("password doesn't match");
      let reCheckPassword: any = document.getElementById("confirm-password");
      reCheckPassword.previousElementSibling.style.animation =
        "shake .5s ease ";
      setTimeout(
        () => (reCheckPassword.previousElementSibling.style.animation = ""),
        1000
      );
    }
  };

  //the fuctions below is used to re renendring caution messages to the sign up form when the signUpWithEmailAndPassword retuens an error

  const handleWeakPassword = () => {
    setPasswordCheck("The password must have atleast 6 characters.");
    let reCheckPassword: any = document.getElementById("confirm-password");
    reCheckPassword.style.borderColor = "red";
    reCheckPassword.previousElementSibling.style.animation = "shake .5s ease ";
    setTimeout(
      () => (reCheckPassword.previousElementSibling.style.animation = ""),
      500
    );
  };

  const handleEmailAlreadyExist = () => {
    emailCheck = "Email address is already in use by another account";
    setEmailCheck(emailCheck);
    let reCheckEmail: any = document.getElementById("email");

    if (reCheckEmail.name == "email") {
      reCheckEmail.style.borderColor = "red";
      setTimeout(
        () => (reCheckEmail.previousElementSibling.style.animation = ""),
        600
      );
    }
  };

  return (
    <form id="register" onSubmit={SignInUser}>
      <div className="nameholder">
        <label htmlFor="first-name">
          First Name
          <input
            required
            type="text"
            name="first-name"
            id="first-name"
            onChange={handleFullName}
          />
        </label>

        <label htmlFor="last-name">
          Last Name
          <input
            required
            type="text"
            name="last-name"
            id="last-name"
            onChange={handleFullName}
          />
        </label>
      </div>

      <div>
        <label htmlFor="dropdown">You are joining as?</label>
        <select id="dropdown" value={selectedOption} onChange={handleOption}>
          <option value="writer">Writer</option>
          <option value="reader">Reader</option>
        </select>
      </div>

      <label htmlFor="email">
        Email
        {emailCheck && <span>{emailCheck}</span>}
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="Johndoe@gmail.com"
          onChange={handleEmail}
        />
      </label>

      <label htmlFor="password">
        Password
        <input
          required
          type="password"
          name="password"
          id="password"
          placeholder="**********"
          onChange={handlePassword}
        />
      </label>

      <label htmlFor="confirm-password">
        <p>Confirm Password</p>
        {passwordCheck && <span>{passwordCheck}</span>}

        <input
          required
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="**********"
          onChange={handleConfirmPassword}
        />
      </label>

      <button type="submit">Create account</button>

      <SignInWithOthers />
    </form>
  );
};

export default Register;
