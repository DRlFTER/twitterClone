import { getDocs, collection } from "firebase/firestore";
import { dataBase } from "../config/firebase";
import { useEffect, useState } from "react";
import { useUser } from "../App";
import { HeartButton } from "./HeartButton";
import { motion } from "framer-motion";

export const Posts = () => {
  const [postsList, setPostsList] = useState(null);
  const postsRef = collection(dataBase, "posts");
  const [error, setError] = useState(null);
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

  useEffect(() => {
    getPosts();
  }, [user]);

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
      className="max-w-full min-h-[600px] mx-5 my-2 mb-5 p-5 rounded-2xl bg-[#2C3A47] flex flex-row flex-wrap gap-4 relative"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {!user && (
        <h2 className="text-black font-semibold font-mono text-button-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#606B75] py-5 px-7 rounded-3xl">
          Log in to see posts
        </h2>
      )}
      {postsList &&
        postsList.map((post) => (
          <motion.div
            key={post.id}
            className="h-auto postContainer p-3 bg-[#505C67] self-start rounded-xl max-w-md"
            variants={item}
          >
            <h2 className="text-[#A5AAB1] font-mono mx-3 mb-2 text-lg font-semibold">
              {post.postName}
            </h2>
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
