import { PostsTitle } from "../components/PostsTitle";
import { Posts } from "../components/Posts";

export const Home = () => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="w-full h-full z-0 flex flex-col">
      <PostsTitle />
      <Posts />
    </div>
  );
};
