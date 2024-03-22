import { useState } from "react";
import "../styles/signupheader.css";

interface props {
  collectDataFromSignUpHeader: (data: any) => void;
}

const SignUpHeader: React.FC<props> = ({ collectDataFromSignUpHeader }) => {
  let [greeting, setGreeting] = useState(true);

  const showLogInComponent = () => {
    greeting = false;
    setGreeting(greeting);
    let right =
      document.getElementById("sign-up-header")?.firstElementChild
        ?.lastElementChild?.firstElementChild;
    right?.classList.add("right");
    collectDataFromSignUpHeader(false);
  };

  const showRegisterComponent = () => {
    greeting = true;
    setGreeting(greeting);
    let left =
      document.getElementById("sign-up-header")?.firstElementChild
        ?.lastElementChild?.firstElementChild;
    if (left?.classList.length !== 0) {
      left?.classList.remove("right");
      left?.classList.add("left");
    }
    collectDataFromSignUpHeader(true);
  };

  return (
    <div id="sign-up-header">
      <section>
        <div>
          <p onClick={showRegisterComponent}>REGISTER</p>
          <p onClick={showLogInComponent}>LOG IN</p>
        </div>
        <div>
          <div></div>
        </div>
      </section>
      <h1>{greeting ? "Register as a Writer/Reader" : "Welcome back"}</h1>
    </div>
  );
};

export default SignUpHeader;
