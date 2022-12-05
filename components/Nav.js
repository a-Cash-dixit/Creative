import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const [user, loading] = useAuthState(auth);
  console.log(user);
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
                src={user.photoURL}
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}