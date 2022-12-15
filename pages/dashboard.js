import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import react from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "../components/Message";
export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [myPosts, setmyPosts] = react.useState([]);
  //see if user is locked
  const getData = async () => {
    if (loading) {
      return;
    }
    if (!user) {
      return route.push("/auth/login");
    }
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef,where("user", "==", user.uid));
    //console.log(q);
    const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log("runn!!");
      setmyPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      console.log(myPosts);
    });
    return unsubscribe;
  };
  //get users data
  react.useEffect(() => {
    getData();
  }, [user, loading]);
  return (
    <div>
      <h1>Your Posts</h1>
      <div>{
        myPosts.map((post)=>{
            return(
                <Message key={post.id} {...post}></Message>
            )
        })}</div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}
