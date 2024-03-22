import SignUp from "./SignUp/SignUp";
import Feeds from "./Feeds/Feeds.tsx";
import { Routes, Route } from "react-router-dom";
import Landingpage from "./landpage/Landingpage.tsx";
import UserAccount from "./Feeds/components/NavBar/components/UserAccount";

const Home = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user-account" element={<UserAccount />} />
      </Routes>
    </>
  );
};

export default Home;
