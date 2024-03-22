import "../style/user-account.css";
import { Calendar1 } from "iconsax-react";
import { useEffect, useState } from "react";
import { db, auth } from "../../../../../App";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserAccount = () => {
  let [user, setUser] = useState<any>(null);
  let [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const checkUser = onAuthStateChanged(auth, (e) => {
      if (e) {
        user = e;
        setUser(user);
      } else {
        user = null;
        setUser(user);
      }
    });
    return checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      checkifUserProfileExists();
    }
  }, [user]);

  const createUserProfile = async () => {
    const userID = user.uid;
    const userRef = doc(db, "userProfiles", userID);
    const userDoc = await getDoc(userRef);
    const userFileExists = userDoc.exists();
    if (!userFileExists) {
      const userProfileData = {
        userBlogs: {},
        userOccupation: null,
        userName: user.displayName,
        userEmailAddress: user.email,
        userBackGroundProfilePicture: null,
        userCreationDate: user.metadata.creationTime,
        userProfilePicture:
          "https://firebasestorage.googleapis.com/v0/b/chatter-ebb5e.appspot.com/o/Default%20Pics%2Fblank-profile-picture-973460_1920.png?alt=media&token=f39574c8-b0e6-4805-bf5f-5ac241dbf3de",
      };
      await setDoc(userRef, userProfileData);
    }
  };

  const checkifUserProfileExists = async () => {
    const userID = user.uid;
    const userRef = doc(db, "userProfiles", userID);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      userProfile = userDoc.data();
      setUserProfile(userProfile);
    } else {
      await createUserProfile();
      window.location.href = "/user-account";
    }
  };

  let date;
  let day;
  let year;
  let monthIndex; // Months are zero-based
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month;
  if (userProfile) {
    date = new Date(userProfile.userCreationDate);
    year = date.getFullYear();
    monthIndex = date?.getMonth();
    month = monthNames[monthIndex];
    day = ("0" + date.getDate()).slice(-2);
  }
  if (userProfile)
    return (
      <section id="user-account">
        <div
          style={{
            background: `url(${userProfile.userBackGroundProfilePicture}) center center no-repeat`,
            backgroundSize: "cover",
          }}
        ></div>
        <section>
          <span>
            <div
              style={{
                background: `url(${userProfile.userProfilePicture}) center center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
            <h1>{userProfile.userName}</h1>
            <span>
              <Calendar1 />
              <p>
                {day} {month} {year}
              </p>
            </span>
          </span>
          <button>Edit Profile</button>
        </section>
      </section>
    );
};

export default UserAccount;
