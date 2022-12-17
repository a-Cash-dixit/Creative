import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const [user, loading] = useAuthState(auth);
  //console.log(user);
  //console.log(user.photoURL);
  let url="";
  if(user){
    url=user.photoURL;
  }
  
  return (
    <nav style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",background:"teal"}}>
      <Link href="/">
        <button style={{color:"pink",background:"teal",border:"none",fontSize:"22px",cursor:"pointer",fontFamily:"monospace"}}>Creative Minds</button>
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
            <Link href="/post">
              <button style={{color:"brown",background:"khaki",border:"none",fontSize:"16px",cursor:"pointer",fontFamily:"monospace"}}>
                Post
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                style={{width:"60%",height:"60%",borderRadius:"100%",margin:"7%"}}
                src={url}
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}