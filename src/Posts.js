import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { dataBase } from "../config/firebase";
import { useEffect, useState } from "react";
import { useUser } from "../App";
import { HeartButton } from "./HeartButton";
import { motion } from "framer-motion";

export const Posts = () => {
  const [postsList, setPostsList] = useState(null);
  const postsRef = collection(dataBase, "posts");
  const [error, setError] = useState(null);
  const [activePostId, setActivePostId] = useState(null);
  const user = useUser();

  const getPosts = async () => {
    try {
      if (user) {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    } catch (err) {
      setError("You do not have permission to view posts. Please log in.");
      console.error("Error fetching posts:", err);
    }
  };

  const deletePost = async (postId) => {
    try {
      const postDoc = doc(dataBase, "posts", postId);
      await deleteDoc(postDoc);
      setPostsList((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  useEffect(() => {
    getPosts();
  }, [user, postsList]);

  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="max-w-full min-h-96 mx-5 my-2 p-5 rounded-2xl bg-[#2C3A47] flex flex-row flex-wrap gap-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {postsList &&
        postsList.map((post) => (
          <motion.div
            key={post.id}
            className="h-auto postContainer p-3 bg-[#505C67] self-start rounded-xl max-w-md"
            variants={item}
          >
            <div className="flex flex-row justify-start items-center relative">
              {activePostId === post.id && (
                <button
                  className="absolute bg-[#7B848D] rounded-xl px-1 right-0 top-8 shadow-slate-700 shadow-md"
                  onClick={
                    post.userID === user.uid ? () => deletePost(post.id) : null
                  }
                >
                  <h2 className="font-mono text-black m-2">Delete</h2>
                </button>
              )}
              <h2 className="text-[#A5AAB1] font-mono mx-3 mb-2 text-lg font-semibold">
                {post.postName}
              </h2>
              {post.userID === user.uid && (
                <div
                  className="mb-2 ml-auto cursor-pointer"
                  onClick={() =>
                    setActivePostId(activePostId === post.id ? null : post.id)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#A5AAB1"
                    className="self-end"
                  >
                    <circle cx="12" cy="5" r="2"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                    <circle cx="12" cy="19" r="2"></circle>
                  </svg>
                </div>
              )}
            </div>
            <div className="bg-[#7B848D] rounded-lg m-1 p-2">
              <div className="postInfo flex justify-start items-start p-2 w-full break-words whitespace-normal font-mono">
                {post.postDescription}
              </div>
              <div className="userInfo flex flex-row justify-start items-center">
                <div className="flex flex-row flex-1 ustify-start items-center">
                  <div className="bg-[#3F4C58] w-8 h-8 m-1 mt-3 rounded-full relative hover:ring-4 hover:ring-[#3F4C58] hover:ring-offset-2 cursor-pointer">
                    <img
                      className="absolute w-full h-full top-0 left-0 object-cover rounded-full"
                      src={post.userPic || "../imgs/default.png"}
                    />
                  </div>
                  <h2 className="text-black font-mono font-semibold text-center text-normal mb-1 mx-3 mt-3">
                    {post.userName}
                  </h2>
                </div>
                <HeartButton post={post} />
              </div>
            </div>
          </motion.div>
        ))}
    </motion.div>
  );
};
