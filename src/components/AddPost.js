import { useUser } from "../App";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { dataBase } from "../config/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

export const AddPost = (props) => {
  const user = useUser();
  const schema = yup.object().shape({
    postName: yup.string().required("Post name is required"),
    postDescription: yup
      .string()
      .required("Post content is required")
      .min(10, "A post must be over 10 characters long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(dataBase, "posts");
  const onSubmit = async (data) => {
    await addDoc(postsRef, {
      postName: data.postName,
      postDescription: data.postDescription,
      userName: user?.displayName,
      userID: user?.uid,
      userPic: user?.photoURL,
    });
    props.setIsAddPost(!props.isAddPost);
    window.location.reload();
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    window.location.reload();
  };

  // animations
  const backDrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const model = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.1,
        stiffness: 500,
        damping: 25,
      },
    },
    exit: { y: "100vh", opacity: 0 },
  };
  return (
    <AnimatePresence>
      {props.isAddPost && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 z-10 cursor-pointer flex justify-center items-center"
          onClick={() => props.setIsAddPost(false)}
          variants={backDrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className={`fixed flex flex-col p-7 min-w-96 bg-[#3F4C58] text-white rounded-xl shadow-2xl text-sm z-20 pointer-events-auto ${
              props.isAddPost ? "" : "hidden"
            }`}
            variants={model}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevents click events from closing modal
          >
            {!user ? (
              <div className="texts flex flex-col w-full h-1/2 justify-center items-center">
                <h2 className="text-white font-mono font-semibold text-center text-2xl">
                  Log in
                </h2>
                <h3 className="text-white font-mono text-center text-lg">
                  To make a post
                </h3>
                <button
                  className="bg-white mt-4 px-5 py-2 rounded-xl shadow-md font-mono w-full text-black"
                  onClick={signInWithGoogle}
                >
                  Google
                </button>
              </div>
            ) : (
              <div>
                <div className="flex flex-row justify-start">
                  <h2 className="text-white font-mono mb-3 mx-2 text-lg font-semibold flex-1">
                    Create a post
                  </h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    width="24"
                    height="24"
                    className="text-gray-500 cursor-pointer hover:text-white"
                    onClick={() => props.setIsAddPost(false)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col min-w-full min-h-full justify-end"
                >
                  <div className="flex relative w-full">
                    <input
                      className="bg-[#505C67] mb-5 px-5 py-2 rounded-xl font-mono w-full text-white"
                      type="text"
                      placeholder="Post name"
                      {...register("postName")}
                    ></input>
                    <p
                      id="error-message"
                      className={`absolute ml-2 top-12 bg-red-500 text-white p-2 rounded-md shadow-md text-sm z-10 ${
                        errors.postName ? "" : "hidden"
                      }`}
                    >
                      {errors.postName?.message}
                    </p>
                  </div>
                  <div className="flex relative w-full">
                    <textarea
                      className="bg-[#505C67] mb-5 px-5 py-2 h-40 rounded-xl font-mono w-full text-white"
                      type="text"
                      placeholder="Write your thoughts"
                      {...register("postDescription")}
                    ></textarea>
                    <p
                      id="error-message"
                      className={`absolute ml-2 top-12 bg-red-500 text-white p-2 rounded-md shadow-md text-sm z-10 ${
                        errors.postDescription ? "" : "hidden"
                      }`}
                    >
                      {errors.postDescription?.message}
                    </p>
                  </div>
                  <div className="w-full flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#606B75] w-20 p-3 rounded-xl text-white cursor-pointe hover:bg-[#505C67]"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
