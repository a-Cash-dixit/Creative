import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import react from "react";
import {FiTrash,FiEdit3} from "react-icons/fi";
import {FcLikePlaceholder,FcLike} from "react-icons/fc";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "../components/Message";
import Link from "next/link";
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
        //console.log("runn!!");
      setmyPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      //console.log(myPosts);
    });
    return unsubscribe;
  };
  //get users data
  react.useEffect(() => {
    getData();
  }, [user, loading]);
  //delete post
  const deletePost=async (id)=>{
    const docRef=doc(db,"posts",id);
    await deleteDoc(docRef);
  }
  return (
    <div>
      <h1>Your Posts</h1>
      <div>{
        myPosts.map((post)=>{
            return(
                <Message key={post.id} {...post}>
                  <FiTrash size={20} color="red" onClick={()=>deletePost(post.id)} cursor="pointer"></FiTrash>
                    <Link href={{pathname:"/post",query:post}}><FiEdit3 size={20} color="white"></FiEdit3></Link>
                    <FcLike size={20}></FcLike>
                  {/* <div style={{padding:"4%",display:"flex",alignItems:"center"}}>
                    
                  </div> */}
                </Message>
            )
        })}</div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}
