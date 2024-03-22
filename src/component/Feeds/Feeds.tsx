import "./Feeds.css";
import ReactDOM from "react-dom/client";
import { auth, db } from "../../App.tsx";
import Post from "./components/Post/Post.tsx";
import { onAuthStateChanged } from "firebase/auth";
import SearchBar from "./components/SearchBar.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import FeedContent from "./components/FeedContent.tsx";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState, useRef, useEffect } from "react";
import Draft from "./components/NavBar/components/Draft.tsx";
import BookMark from "./components/NavBar/components/BookMark.tsx";
import TeamBlogs from "./components/NavBar/components/TeamBlogs.tsx";
import Analytics from "./components/NavBar/components/Analytics.tsx";
import Notification from "./components/NavBar/components/Notification.tsx";

const Feeds = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  let [navbutton, setNavButton] = useState<any>(null);
  let [userLogin, setUserLogin] = useState<any>(null);
  let [allRenderMethods, setAllRenderMethods] = useState<any>(null);

  // checking if the user is signed in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        userLogin = user;
        setUserLogin(userLogin);
      } else {
        userLogin = null;
        setUserLogin(userLogin);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (componentRef.current) {
      const instance = new MountComponent(componentRef.current);
      allRenderMethods = instance.getAllRenderMethods();
      setAllRenderMethods(allRenderMethods);
      instance.renderFeedsOnPageLoad();
      return () => {
        // Cleanup function to handle any necessary cleanup
      };
    }
  }, []);

  useEffect(() => {
    navbutton = document.querySelectorAll("#nav-bar > section > nav > button");
    setNavButton(navbutton);
    if (navbutton) {
      navbutton.forEach((e: any) => {
        e.style.color = "#626262";
      });
      navbutton[0].style.color = "#543ee0";
    }
  }, []);

  useEffect(() => {
    if (userLogin) {
      createUserProfile();
    }
  }, [userLogin]);

  const createUserProfile = async () => {
    const userID = userLogin.uid;
    const userRef = doc(db, "userProfiles", userID);
    const userDoc = await getDoc(userRef);
    const userFileExists = userDoc.exists();
    if (!userFileExists) {
      const userProfileData = {
        userBlogs: {},
        userOccupation: null,
        userName: userLogin.displayName,
        userEmailAddress: userLogin.email,
        userBackGroundProfilePicture: null,
        userCreationDate: userLogin.metadata.creationTime,
        userProfilePicture:
          "https://firebasestorage.googleapis.com/v0/b/chatter-ebb5e.appspot.com/o/Default%20Pics%2Fblank-profile-picture-973460_1920.png?alt=media&token=f39574c8-b0e6-4805-bf5f-5ac241dbf3de",
      };
      await setDoc(userRef, userProfileData);
    }
  };

  class MountComponent {
    root;

    constructor(container: any) {
      if (container) {
        this.root = ReactDOM.createRoot(container);
      }
    }

    renderContent(component: any) {
      if (this.root) {
        this.root.render(<React.StrictMode>{component}</React.StrictMode>);
      }
    }

    renderPostEditor() {
      if (this.root) {
        this.renderContent(<Post renderComponent={allRenderMethods} />);
      }
    }

    renderFeedsOnPageLoad() {
      this.renderContent(<FeedContent renderComponent={allRenderMethods} />);
    }

    renderFeeds(e: any) {
      this.renderContent(<FeedContent renderComponent={allRenderMethods} />);
      this.updateNavButtonColor(e);
    }

    renderBookMark(e: any) {
      this.renderContent(<BookMark />);
      this.updateNavButtonColor(e);
    }

    renderTeamBlogs(e: any) {
      this.renderContent(<TeamBlogs />);
      this.updateNavButtonColor(e);
    }

    renderDraft(e: any) {
      this.renderContent(<Draft />);
      this.updateNavButtonColor(e);
    }

    renderAnalytics(e: any) {
      this.renderContent(<Analytics />);
      this.updateNavButtonColor(e);
    }

    renderNotification(e: any) {
      this.renderContent(<Notification />);
      this.updateNavButtonColor(e);
    }

    updateNavButtonColor(e: any) {
      navbutton.forEach((button: any) => {
        button.style.color = "#626262";
      });
      e.target.style.color = "#543ee0";
    }

    getAllRenderMethods() {
      return {
        renderDraft: this.renderDraft.bind(this),
        renderFeeds: this.renderFeeds.bind(this),
        renderBookMark: this.renderBookMark.bind(this),
        renderTeamBlogs: this.renderTeamBlogs.bind(this),
        renderAnalytics: this.renderAnalytics.bind(this),
        renderPostEditor: this.renderPostEditor.bind(this),
        renderNotification: this.renderNotification.bind(this),
      };
    }
  }

  return (
    <section id="feeds">
      <NavBar userExist={userLogin} renderComponent={allRenderMethods || {}} />
      <div>
        <SearchBar userExist={userLogin} />
        <div ref={componentRef}></div>
      </div>
    </section>
  );
};

export default Feeds;
