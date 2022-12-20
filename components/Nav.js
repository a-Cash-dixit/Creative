import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Post from "../pages/post";
import Popup from "reactjs-popup";
//import "reactjs-popup/dist/styles";

export default function Nav() {
  const [user, loading] = useAuthState(auth);
  //console.log(user);
  //console.log(user.photoURL);
  let url="";
  if(user){
    url=user.photoURL;
  }
  
  return (
    <nav style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",background:"teal",height:"4rem"}}>
      <Link href="/">
        <button style={{color:"pink",background:"teal",border:"none",fontSize:"22px",cursor:"pointer",fontFamily:"monospace"}}>Home</button>
      </Link>
      <ul>
        {!user && (
          <Link href={"/auth/login"}>
            <button style={{color:"brown",background:"khaki",border:"none",fontSize:"16px",cursor:"pointer",fontFamily:"monospace"}}>
              Join Now
            </button>
          </Link>
        )}
        {user && (
          <div style={{display:"flex",alignItems:"center"}}>
            
              <Popup trigger={<button style={{fontWeight:"700", color:"#E1E8ED",background:"#1DA1F2",border:"none",fontSize:"16px",cursor:"pointer",fontFamily:"cursive",borderRadius:"20%"}}>
                Post
              </button>} >
                <Post></Post>
              </Popup>
            <Link href="/dashboard">
              <img
                style={{width:"56%",height:"56%",borderRadius:"100%",margin:"7%"}}
                src={url}
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}