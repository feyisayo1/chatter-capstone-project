import "./navbar.css";
import { auth, db } from "../../../../App";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import {
  Save2,
  Login,
  Logout,
  Chart1,
  Hashtag,
  TrendUp,
  FtxToken,
  Briefcase,
  ProfileTick,
  Profile2User,
  Personalcard,
  DirectboxDefault,
  NotificationBing,
} from "iconsax-react";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface props {
  userExist: (data: any) => void;
  renderComponent: {
    renderDraft: (e: any) => void;
    renderFeeds: (e: any) => void;
    renderBookMark: (e: any) => void;
    renderTeamBlogs: (e: any) => void;
    renderAnalytics: (e: any) => void;
    renderNotification: (e: any) => void;
  };
}

const NavBar: React.FC<props> = ({ userExist, renderComponent }: any) => {
  let [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (userExist) {
      checkifUserProfileExists();
    }
  }, [userExist]);

  const createUserProfile = async () => {
    const userID = userExist.uid;
    const userRef = doc(db, "userProfiles", userID);
    const userDoc = await getDoc(userRef);
    const userFileExists = userDoc.exists();
    if (!userFileExists) {
      const userProfileData = {
        userBlogs: {},
        userOccupation: null,
        userName: userExist.displayName,
        userEmailAddress: userExist.email,
        userBackGroundProfilePicture: null,
        userCreationDate: userExist.metadata.creationTime,
        userProfilePicture:
          "https://firebasestorage.googleapis.com/v0/b/chatter-ebb5e.appspot.com/o/Default%20Pics%2Fblank-profile-picture-973460_1920.png?alt=media&token=f39574c8-b0e6-4805-bf5f-5ac241dbf3de",
      };
      await setDoc(userRef, userProfileData);
    }
  };

  const checkifUserProfileExists = async () => {
    const userID = userExist.uid;
    const userRef = doc(db, "userProfiles", userID);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      userProfile = userDoc.data();
      setUserProfile(userProfile);
    } else {
      await createUserProfile();
      window.location.href = "/";
    }
  };

  const Userprofile = () => {
    if (userProfile !== null) {
      return (
        <Link to="user-account">
          <div
            style={{
              background: `url(${userProfile.userProfilePicture}) no-repeat center`,
              backgroundSize: "cover",
            }}
          >
            <div></div>
          </div>
          <p>Account</p>
        </Link>
      );
    } else {
      return (
        <Link to="user-account" style={{ color: "#543ee0" }}>
          <ProfileTick />
          <p>Account</p>
        </Link>
      );
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  return (
    <section id="nav-bar">
        <Link to="/">
          <h1>CHATTER</h1>
        </Link>
      <section className="over-view">
        <div>
          <Briefcase />
          <h3>Overview</h3>
        </div>
        <nav>
          <button onClick={renderComponent.renderFeeds}>
            <FtxToken />
            <p>Feed</p>
          </button>

          <button onClick={renderComponent.renderBookMark}>
            <Save2 />
            <p>Bookmarks</p>
          </button>

          <button onClick={renderComponent.renderTeamBlogs}>
            <Profile2User />
            <p>Team blogs</p>
          </button>

          <button onClick={renderComponent.renderDraft}>
            <DirectboxDefault />
            <p>Draft</p>
          </button>

          <button onClick={renderComponent.renderAnalytics}>
            <Chart1 variant="Broken" />
            <p>Analytics</p>
          </button>
        </nav>
      </section>

      <section className="trending tags">
        <div>
          <TrendUp />
          <h3>Trending tags</h3>
        </div>

        <nav>
          <Link to="">
            <Hashtag />
            <p>Programming</p>
          </Link>

          <Link to="">
            <Hashtag />
            <p>Data science</p>
          </Link>

          <Link to="">
            <Hashtag />
            <p>Technology</p>
          </Link>

          <Link to="">
            <Hashtag />
            <p>Machine learning</p>
          </Link>

          <Link to="">
            <Hashtag />
            <p>Politics</p>
          </Link>
        </nav>
      </section>

      <section className="persoanl">
        <div>
          <Personalcard />
          <h3>Personal</h3>
        </div>

        <nav>
          {userExist && <Userprofile />}

          <button onClick={renderComponent.renderNotification}>
            <NotificationBing />
            <p>Notifications</p>
          </button>

          {userExist ? (
            <button onClick={logOut}>
              <Logout color="#c50c0c" />
              <p style={{ color: "#c50c0c" }}>Log Out</p>
            </button>
          ) : (
            <Link to="/sign-up">
              <Login color="#543ee0" />
              <p style={{ color: "#543ee0" }}>Log In</p>
            </Link>
          )}
        </nav>
      </section>
    </section>
  );
};

export default NavBar;
