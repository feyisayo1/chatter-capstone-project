import "../styles/signinwithothers.css";
import { auth, provider } from "../../../App";
import { signInWithPopup } from "firebase/auth";

const SignInWithOthers = () => {
  const signInHoverout = (e: any) => {
    e.target.previousElementSibling.style.width = "10%";
  };

  const signInHoverin = (e: any) => {
    e.target.previousElementSibling.style.width = "80%";
  };

  const signUpWithGooglePopUp = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      if (user) {
        window.location.href = "/feeds";
      }
    } catch (error: any) {
      switch ((error as typeof error)?.code) {
        case 'auth/account-exists-with-different-credential':
          // Display message for account exists with different credential
          break;
        case 'auth/cancelled-popup-request':
          console.log("An error occured :Please Ensure no pop-up blocker is enabled");
          break;
        default:
          console.log("an Unkown error occured");
          // Display a generic error message
          break;
      }
    }
  };

  return (
    <div id="SignInWithOthers">
      <button type="button" onClick={signUpWithGooglePopUp}>
        <img src="../../../google.png" alt="google-logo" />
        <p>Sign up with google</p>
      </button>
      <button
        onMouseOver={signInHoverout}
        onMouseOut={signInHoverin}
        type="button"
      >
        <img src="../../../linkedin.png" alt="linkedin-logo" />
        <p>Sign up with Linkedin</p>
      </button>
    </div>
  );
};

export default SignInWithOthers;
