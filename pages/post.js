import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import react from "react";
import {
    doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
//import { getAutoCloseDelay } from "react-toastify/dist/utils";
export default function Post() {
  const [post, setPost] = react.useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const updateData = route.query;
  //console.log(route);
  //Submit post
  const SubmitPost = async (e) => {
    e.preventDefault();
    //some checks
    if (!post.description) {
      toast.error("Description Field Empty 🤨", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if (post.description.length > 300) {
      toast.error("Description Field too long 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if (post.id) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      toast.success("Edited Successfully 🖊",{
        position:toast.POSITION.TOP_CENTER,
        autoClose:1500
      })
      return route.push("/");
    } else {
      //make a post
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        user: user.uid,
        timeStamp: serverTimestamp(),
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });
      toast.success("Posted Successfully 🧨",{
        position:toast.POSITION.TOP_CENTER,
        autoClose:1500
      })
      return route.push("/");
    }
  };
  const checkUser = async () => {
    if (loading) {
      return;
    }
    if (!user) {
      route.push("/auth/login");
    }
    if (updateData.id) {
      setPost({ description: updateData.description, id: updateData.id });
    }
  };
  react.useEffect(() => {
    checkUser();
  }, [user, loading]);
  return (
    <div style={{ display: "flex", background: "orange" }}>
      <form style={{ padding: "2%" }} onSubmit={SubmitPost}>
        <h1 style={{ color: "brown", fontFamily: "monospace" }}>
          {post.id ? "Edit the Post" : "Create a New Post"}
        </h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <textarea
            style={{ background: "skyblue", color: "white" }}
            placeholder="Description..."
            rows={8}
            cols={15}
            value={post.description}
            onChange={(e) => {
              setPost({ ...post, description: e.target.value });
            }}
          ></textarea>
          <p style={{ color: "brown", fontFamily: "monospace" }}>
            {post.description.length}/300
          </p>
        </div>
        <button
          style={{
            color: "brown",
            background: "khaki",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            fontFamily: "monospace",
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
