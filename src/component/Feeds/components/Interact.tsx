import "../styles/interact.css";
import { db } from "../../../App";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ChartSquare, Heart, Message2 } from "iconsax-react";

interface props {
  user: any;
  blog: any;
}

const Interact: React.FC<props> = ({ user, blog }) => {
  let [comment, setComment] = useState<boolean>(false);

  const handleCommentSection = () => {
    if (!comment) {
      comment = true;
      setComment(comment);
    } else {
      comment = false;
      setComment(comment);
    }
  };

  const LikeButton = () => {
    let [liked, setLiked] = useState<boolean>(false);
    let [updatedLikes, setUpdatedLikes] = useState<any>(blog.likes);

    const handleLike = async () => {
      const blogDocRef = doc(db, "blogPosts", blog.id);
      try {
        if (!liked) {
          updatedLikes = [...updatedLikes, user.uid];
          setUpdatedLikes(updatedLikes);
          liked = true;
          setLiked(liked);
          await updateDoc(blogDocRef, { likes: updatedLikes });
        } else {
          updatedLikes = [];
          setUpdatedLikes(updatedLikes);
          await blog.likes.map((e: any) => {
            if (e !== user.uid) {
              updatedLikes.push(e);
            }
          });
          setUpdatedLikes(updatedLikes);
          liked = false;
          setLiked(liked);
          await updateDoc(blogDocRef, { likes: updatedLikes });
        }
      } catch (error) {
        console.error("Error adding user to likes array:", error);
      }
    };

    useEffect(() => {
      if (blog.likes.includes(user.uid)) {
        liked = true;
        setLiked(liked);
      } else {
        liked = false;
        setLiked(liked);
      }
    }, []);

    return (
      <>
        {liked ? (
          <button
            style={{ color: "#543ee0", fill: "#543ee0" }}
            onClick={handleLike}
          >
            <Heart style={{ fill: "#543ee0" }} />
            <p>{updatedLikes.length !== 0 ? updatedLikes.length : null}</p>
          </button>
        ) : (
          <button onClick={handleLike}>
            <Heart />
            <p>{updatedLikes.length !== 0 ? updatedLikes.length : null}</p>
          </button>
        )}
      </>
    );
  };

  const View = () => {
    let [view, setView] = useState<boolean>(false);

    useEffect(() => {}, []);

    blog.view.map((views: any) => {
      if (user.uid == views) {
        view = true;
        setView(view);
      } else {
        view = false;
        setView(view);
      }
    });

    return (
      <>
        {view ? (
          <button style={{ color: "#543ee0" }}>
            <ChartSquare />
            <p>{blog.view.length !== 0 ? blog.view.length : null}</p>
            <p>Views</p>
          </button>
        ) : (
          <button>
            <ChartSquare />
            <p>{blog.view.length !== 0 ? blog.view.length : null}</p>
            <p>Views</p>
          </button>
        )}
      </>
    );
  };

  const CommentSec = () => {
    let [commentText, setCommentText] = useState("");
    let [allComment, setAllComments] = useState<any>(null);

    useEffect(() => {
      fetchCurrentBlogData();
    }, [commentText]);

    const fetchCurrentBlogData = async () => {
      const docRef = doc(db, "blogPosts", blog.id);
      const docSnapshot = await getDoc(docRef);
      allComment = docSnapshot.data();
      allComment = allComment.comments;
      setAllComments(allComment);
    };

    const handleAddComment = async () => {
      try {
        const comment = {
          userId: user.uid,
          date: new Date(),
          text: commentText,
        };

        const blogDocRef = doc(db, "blogPosts", blog.id);
        const updatedComments = [...allComment, comment];
        await updateDoc(blogDocRef, { comments: updatedComments });
        commentText = "";
        setCommentText(commentText);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    };

    const AllComment = () =>
      allComment.map((comment: any, index: any) => {
        return (
          <div
            key={index}
            className={comment.userId === user.uid ? "user-comment" : ""}
          >
            <p>{comment.text}</p>
          </div>
        );
      });

    const CommentButton = () => {
      if (commentText !== "") {
        return <button onClick={handleAddComment}>Add Comment</button>;
      } else
        return (
          <button
            onClick={handleAddComment}
            style={{ backgroundColor: "#a699f8" }}
          >
            Add Comment
          </button>
        );
    };

    return (
      <section id="all-comment">
        <div>{allComment && <AllComment />}</div>
        <CommentButton />
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Type your comment"
        />
      </section>
    );
  };

  return (
    <>
      <section id="interact">
        {comment && <CommentSec />}
        <div>
          <LikeButton />
          <button onClick={handleCommentSection}>
            <Message2 />
          </button>
          <View />
        </div>
      </section>
    </>
  );
};

export default Interact;
