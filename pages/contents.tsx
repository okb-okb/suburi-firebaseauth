import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { auth } from "../utils/firebase";
import { AuthContext } from "../context/Auth";

const Contents: NextPage = () => {
  const router = useRouter();
  // Context を使用
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    // ログインしていない状態で見ようとした時にログイン画面へ戻す
    auth.onAuthStateChanged((user) => {
      user || router.push("/");
    });
  }, []);

  const logOut = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // ログインしていない時に見ようとしても見られないようにする
  return (
    <>
      {currentUser.currentUser ? (
        <>
          <div>ようこそ、{currentUser.currentUser?.email}さん</div>
          <button onClick={logOut}>ログアウト</button>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Contents;
