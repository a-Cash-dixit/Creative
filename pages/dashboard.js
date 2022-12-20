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
  orderBy,
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
    //var q = query(collectionRef,where("user", "==", user.uid));
    var q=query(collectionRef,orderBy("timestamp","desc"));
    //console.log(q);
    const unsubscribe = onSnapshot(q, (snapshot) => {
        //console.log("runn!!");
      //console.log(snapshot.docs);
      let array=[];
      snapshot.docs.map((doc)=>{
        if(doc.data().user===user.uid){
          array.push({...doc.data(),id:doc.id});
        }
      })
      //console.log(array);
      setmyPosts(array);
      return unsubscribe;
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
      <div style={{background:"#243447",color:"white",fontFamily:"fantasy",letterSpacing:"2px",height:"3rem",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        <h4>Posts</h4>
        <h4>Likes</h4>
        <h4>Comments</h4>
      </div>
      <div>{
        myPosts.map((post)=>{
            return(
                <Message key={post.id} {...post}>
                  <FiTrash size={20} color="red" onClick={()=>deletePost(post.id)} cursor="pointer"></FiTrash>
                    <Link href={{pathname:"/post",query:post}}><FiEdit3 size={20} color="white"></FiEdit3></Link>
                    <div style={{display:"flex",color:"#AAB8C2",justifyContent:"space-around",alignItems:"center"}}>
                    <FcLike size={20}></FcLike>
                    {post.likes && `${post.likes.length}`}
                    </div>
                  {/* <div style={{padding:"4%",display:"flex",alignItems:"center"}}>
                    
                  </div> */}
                </Message>
            )
        })}</div>
      <button style={{fontWeight:"700", color:"#E1E8ED",background:"#1DA1F2",border:"none",fontSize:"16px",cursor:"pointer",fontFamily:"cursive",borderRadius:"10%"}} onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}
