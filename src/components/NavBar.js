import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginCard } from "./LoginCard";
import { useUser } from "../App";
import { motion, AnimatePresence } from "framer-motion";

export const NavBar = () => {
  const user = useUser();
  const [isProfile, setIsprofile] = useState(false);
  const firstName = user?.displayName.split(" ")[0];

  const handleClick = () => {
    setIsprofile(!isProfile);
  };

  const container = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        id="navBar"
        className="h-32 px-5 rounded-3xl flex items-center"
        variants={container}
        initial="hidden"
        animate="visible"
        layout
      >
        <motion.div className="flex-1 flex justify-start">
          <motion.h2
            className="w-auto py-3 px-4 font-semibold text-third-title font-mono rounded-full text-[#606B75] border-4 border-[#606B75]"
            layout
          >
            {user ? firstName : "Guest"}
          </motion.h2>
        </motion.div>
        <Link
          to={"/"}
          className="px-3 font-semibold text-2xl font-mono text-[#606B75] border-[#606B75] hover:border-b-4"
        >
          Home
        </Link>
        <div>
          <div
            className="bg-[#3F4C58] w-10 h-10 mx-4 rounded-full relative hover:ring-4 hover:ring-[#3F4C58] hover:ring-offset-2 cursor-pointer"
            onClick={handleClick}
          >
            {user && (
              <motion.img
                src={user?.photoURL || "../imgs/defaultPic.jpg"}
                className="absolute w-full h-full top-0 left-0 object-cover rounded-full"
              />
            )}
          </div>
          <LoginCard isProfile={isProfile} handleClick={handleClick} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
