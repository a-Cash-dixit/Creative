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
    <nav>
      <Link href="/">
        <button>Creative Minds</button>
      </Link>
      <ul>
        {!user && (
          <Link href={"/auth/login"}>
            <button>
              Join Now
            </button>
          </Link>
        )}
        {user && (
          <div>
            <Link href="/post">
              <button>
                Post
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                src={url}
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}