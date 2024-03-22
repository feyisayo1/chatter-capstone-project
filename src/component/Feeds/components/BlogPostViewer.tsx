import { marked } from "marked";
import Interact from "./Interact";
import "../styles/blogpostviewer.css";
import { auth, db } from "../../../App";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

interface BlogPost {
  id: string;
  view: [];
  likes: [];
  Comment: {};
  userId: any;
  createdAt: any;
  articleHeading: string;
  markdownContent: string;
}

const BlogPostViewer: React.FC<{ blogPosts: BlogPost[] }> = ({ blogPosts }) => {
  let [user, setUser] = useState<any>(null);

  interface props {
    blog: any;
  }

  useEffect(() => {
    onAuthStateChanged(auth, (e) => {
      if (e) {
        user = e;
        setUser(user);
      } else {
        user = null;
        setUser(user);
      }
    });
  }, []);

  const Blogs: React.FC<props> = ({ blog }) => {
    let [userProfile, setUserProfile] = useState<any>(null);

    const getUserProfile = async () => {
      const userProfileRef = doc(db, "userProfiles", blog.userId);
      const userProfileSnapshot = await getDoc(userProfileRef);
      if (userProfileSnapshot.exists()) {
        userProfile = userProfileSnapshot.data();
        setUserProfile(userProfile);
      }
    };

    useEffect(() => {
      getUserProfile();
    }, []);

    let date = blog.createdAt.toDate();
    let day = ("0" + date.getDate()).slice(-2);
    let year = date.getFullYear();
    let monthIndex = date.getMonth(); // Months are zero-based
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
    let month = monthNames[monthIndex];

    // if (userProfile)
    return (
      <div id="blog-post">
        <section>
          <div>
            {userProfile && (
              <div
                style={{
                  background: `url(${userProfile.userProfilePicture}) center center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            )}
            <div>
              {userProfile && <h3>{userProfile.userName}</h3>}
              {userProfile && (
                <p>
                  {userProfile.userOccupation
                    ? userProfile.userOccupation
                    : "Unemployed"}{" "}
                  .{day} {month}, {year}
                </p>
              )}
            </div>
          </div>
          <h1>{blog.articleHeading}</h1>
        </section>
        <div
          dangerouslySetInnerHTML={{ __html: marked(blog.markdownContent) }}
        />
        {user && <Interact user={user} blog={blog} />}
      </div>
    );
  };

  return (
    <div id="blog-container">
      {blogPosts.map((blogs) => (
        <Blogs blog={blogs} key={blogs.id} />
      ))}
    </div>
  );
};

export default BlogPostViewer;
