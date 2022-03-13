import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import Loading from "../components/Loading";
import { auth, db, serverTimestamp, setDoc, doc } from "../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth < 427) {
      alert(
        "This Page is not for Mobile, So it will redirect to my GitHub Page"
      );
      router.push("https://github.com/chanakyha");
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 427) {
        alert(
          "This Page is not for Mobile, So it will redirect to my GitHub Page"
        );
        router.push("https://github.com/chanakyha");
      }
    });
  }, []);

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
