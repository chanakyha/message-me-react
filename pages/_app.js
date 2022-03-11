import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import Loading from "../components/loading";
import { auth, db, serverTimestamp, setDoc, doc } from "../firebase";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const cityRef = doc(db, "users", user.uid);
      setDoc(
        cityRef,
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
