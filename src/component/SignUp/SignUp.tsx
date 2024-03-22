import "./signup.css";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import SignUpHeader from "./components/SignUpHeader";

const SignUp = () => {
  const [data, setData] = useState(true);

  const observer = (data: any) => {
    setData(data);
  };
  return (
    <section id="sign-up">
      <section className="a">
        <div>
          <div>
            <h4>CATTER</h4>
            <p>
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </p>
          </div>
        </div>
      </section>
      <section className="b">
        <div>
          <SignUpHeader collectDataFromSignUpHeader={observer} />
          {data ? <Register /> : <Login />}
        </div>
      </section>
    </section>
  );
};

export default SignUp;
