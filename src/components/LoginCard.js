import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useUser } from "../App";
import { motion, AnimatePresence } from "framer-motion";
import * as yup from "yup";

export const LoginCard = (props) => {
  const user = useUser();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    window.location.reload();
  };

  const userSignOut = async () => {
    await signOut(auth);
    window.location.reload();
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password should be at least over 3 characters long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  const container = {
    hidden: { opacity: 0, x: 500 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
    exit: { opacity: 0, x: 500 },
  };

  return (
    <AnimatePresence>
      {props.isProfile && (
        <motion.div
          className="absolute flex flex-col w-96 h-auto p-5 right-12 top-24 bg-[#A5AAB1] text-white rounded-xl shadow-xl text-sm z-10"
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex flex-row justify-end h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="24"
              height="24"
              className="text-[#3F4C58] cursor-pointer hover:text-white"
              onClick={() => props.handleClick(!props.isProfile)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {!user ? (
            <div className="flex flex-col">
              <div className="texts flex flex-col w-full h-1/2 justify-center items-center">
                <div className="bg-[#3F4C58] w-20 h-20 mx-4 my-5 rounded-full hover:ring-4 hover:ring-[#3F4C58] hover:ring-offset-2 cursor-pointer"></div>
                <h2 className="text-black font-mono font-semibold text-center text-2xl">
                  Log in
                </h2>
                <h3 className="text-black font-mono text-center text-lg mb-2">
                  Make an account if you haven't already
                </h3>
              </div>
              <div className="inputs flex flex-col w-full h-1/2 justify-center items-center">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col min-w-full min-h-full justify-end"
                >
                  <div className="flex relative w-full">
                    <input
                      className="bg-whites mb-5 px-5 py-2 rounded-xl font-mono w-full text-black"
                      type="email"
                      placeholder="Enter email"
                      {...register("email")}
                    ></input>
                    <p
                      id="error-message"
                      className={`absolute ml-2 top-12 bg-[#3F4C58] text-white p-2 rounded-md shadow-md text-sm z-10 ${
                        errors.email ? "" : "hidden"
                      }`}
                    >
                      {errors.email?.message}
                    </p>
                  </div>
                  <div className="flex relative w-full">
                    <input
                      className="bg-whites mb-5 px-5 py-2 rounded-xl font-mono w-full text-black"
                      type="password"
                      placeholder="Enter password"
                      {...register("password")}
                    ></input>
                    <p
                      id="error-message"
                      className={`absolute ml-2 top-12 bg-[#3F4C58] text-white p-2 rounded-md shadow-md text-sm z-10 ${
                        errors.password ? "" : "hidden"
                      }`}
                    >
                      {errors.password?.message}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#3F4C58] mb-5 px-5 py-2 rounded-xl font-mono w-full"
                  >
                    Get started
                  </button>
                </form>
              </div>
              <div className="withGoogle">
                <h3 className="text-black font-mono text-center text-sm">
                  Or sign in with
                </h3>
                <button
                  className="bg-white mt-4 px-5 py-2 rounded-xl shadow-md font-mono w-full text-black"
                  onClick={signInWithGoogle}
                >
                  Google
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full h-2/3 justify-center items-center">
              <div className="bg-[#3F4C58] w-40 h-40 mx-4 rounded-full relative hover:ring-4 hover:ring-[#3F4C58] hover:ring-offset-2 cursor-pointer">
                <img
                  src={user?.photoURL}
                  className="absolute w-full h-full top-0 left-0 object-cover rounded-full"
                />
              </div>
              <h2 className="text-black p-8 font-mono font-semibold text-center text-2xl">
                Hi, {user?.displayName}
              </h2>
              <button
                className="bg-[#3F4C58] px-5 py-2 w-1/2 mb-3 rounded-xl font-mono text-white"
                onClick={userSignOut}
              >
                Log out
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
