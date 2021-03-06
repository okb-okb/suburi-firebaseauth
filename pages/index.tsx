import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { auth } from "../utils/firebase";

const IndexPage: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 既にサインインしている時はサインアップの必要が無いので
  // ログイン後のページに飛ばす
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push("/contents");
    });
  }, []);

  // ログイン処理
  const logIn = async (e: FormEvent) => {
    // form の動作を止める
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push("/contents");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <form onSubmit={logIn}>
        <div>
          <label htmlFor="email">メールアドレス: </label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード: </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
      <Link href="/signup">新規登録</Link>
    </>
  );
};

export default IndexPage;
