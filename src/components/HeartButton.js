import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  query,
  where,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { dataBase } from "../config/firebase";
import { useUser } from "../App";

export const HeartButton = (props) => {
  const user = useUser();
  const { post } = props;
  const [likes, setLikes] = useState([]);
  const [hasUserLiked, setHasUserLiked] = useState(false);

  const likesRef = collection(dataBase, "likes");
  const likesDoc = query(likesRef, where("postID", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    const likesData = data.docs.map((doc) => ({
      userID: doc.data().userID,
      likeID: doc.id,
    }));
    setLikes(likesData);
    setHasUserLiked(likesData.some((like) => like.userID === user?.uid));
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userID: user?.uid,
        postID: post.id,
      });
      if (user) {
        const newLike = { userID: user.uid, likeID: newDoc.id };
        setLikes((prev) => [...prev, newLike]);
        setHasUserLiked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postID", "==", post.id),
        where("userID", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      if (!likeToDeleteData.empty) {
        const likeID = likeToDeleteData.docs[0].id;
        const likeToDelete = doc(dataBase, "likes", likeID);
        await deleteDoc(likeToDelete);

        setLikes((prev) => prev.filter((like) => like.likeID !== likeID));
        setHasUserLiked(false);
      }
    } catch (err) {
      console.log("Error removing like: ", err);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="likesContainer flex flex-row justify-center items-center">
      <button
        onClick={hasUserLiked ? removeLike : addLike}
        className={`${
          hasUserLiked ? "text-[#3F4C58]" : "text-[#606B75]"
        } focus:outline-none transition-transform transform hover:scale-110 active:scale-95`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="w-6 h-6 mt-4 mx-2"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
      <h2
        className={`mt-4 mr-2 font-mono ${
          hasUserLiked ? "text-[#3F4C58]" : "text-[#606B75]"
        }`}
      >
        {likes?.length}
      </h2>
    </div>
  );
};
