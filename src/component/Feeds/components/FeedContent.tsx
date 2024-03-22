import "../styles/feedcontent.css";
import { Edit2 } from "iconsax-react";
import { auth, db } from "../../../App.tsx";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import BlogPostViewer from "./BlogPostViewer.tsx";
import { onAuthStateChanged } from "firebase/auth";
import FeedContentHeader from "./FeedContentHeader";
import { ToastContainer, toast } from 'react-toastify';
import { getDocs, collection } from "firebase/firestore";

interface props {
  renderComponent: {
    renderPostEditor: () => void;
  };
}

const FeedContent: React.FC<props> = ({ renderComponent }: any) => {
  let [userLogin, setUserLogin] = useState<any>(null);
  let [blogPosts, setBlogPosts] = useState<any[]>([]);

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
    const fetchBlogPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogPosts"));
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        blogPosts = posts;
        setBlogPosts(blogPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  const HandlePost = () => {
    if (userLogin) {
      if (renderComponent) renderComponent.renderPostEditor();
    }else{
      toast.error(`Please sign in to post feed`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

  return (
    <section id="feed-content">
      <div>
        <div>
          <h3>FEEDS</h3>
          <p>Explore different content you’d love </p>
        <ToastContainer />
        </div>
        <button onClick={HandlePost}>
          <Edit2 />
          <p>Post a content</p>
        </button>
      </div>
      <div>
        <FeedContentHeader />
        <BlogPostViewer blogPosts={blogPosts} />
      </div>
    </section>
  );
};

export default FeedContent;
