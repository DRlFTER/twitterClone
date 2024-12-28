import { useState } from "react";
import { AddPost } from "./AddPost";
import { motion } from "framer-motion";

export const PostsTitle = () => {
  const [isAddPost, setIsAddPost] = useState(false);

  const handleAddPostClick = () => {
    setIsAddPost(!isAddPost);
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.8,
      },
    },
  };

  return (
    <motion.div
      id="names"
      className="mx-5 my-4 h-20 py-3 px-5 rounded-3xl flex justify-center items-center bg-[#606B75]"
      variants={item}
      initial="hidden"
      animate="visible"
    >
      <h3 className="flex-1 pl-5 text-[#1B2224] font-semibold text-third-title font-mono">
        Social media sim
      </h3>
      <motion.button
        className="flex-2 text-white font-semibold font-mono text-lg px-5 py-3 bg-[#505C67] hover:bg-[#3F4C58] rounded-2xl"
        variants={item}
        onClick={handleAddPostClick}
        whileTap={{ scale: 0.9 }}
      >
        + Add post
      </motion.button>
      <AddPost isAddPost={isAddPost} setIsAddPost={setIsAddPost} />
    </motion.div>
  );
};
