import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { auth } from "../utils/firebase";

const SignUp: NextPage = () => {
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

  // 新規ユーザー登録
  const createUser = async (e: FormEvent) => {
    // form の動作を止める
    e.preventDefault();

    try {
      // firebase のユーザー登録用メソッド
      await auth.createUserWithEmailAndPassword(email, password);
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <form onSubmit={createUser}>
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
        <button type="submit">登録</button>
      </form>
      <Link href="/">ログイン</Link>
    </>
  );
};

export default SignUp;
