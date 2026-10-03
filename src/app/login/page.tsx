"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn, signOut } = useAuth();
  const [name, setName] = useState(user?.profile?.name ?? "");
  const [email, setEmail] = useState(user?.profile?.email ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn(email, name);
    router.push("/");
  }

  return (
    <div className="page-wrap login-page">
      <div className="login-art">
        <span className="login-art-index">MEMBER No. 01</span>
        <div className="login-art-circle">m.</div>
        <p>
          Everyday looks
          <br />
          good on you.
        </p>
        <span className="login-art-footer">MARKETLANE · CUSTOMER CLUB</span>
      </div>
      <section className="login-panel">
        {user ? (
          <>
            <p className="eyebrow">GOOD TO SEE YOU AGAIN</p>
            <h1>
              Hello,
              <br />
              <em>{user.profile?.name?.split(" ")[0] ?? "friend"}.</em>
            </h1>
            <p className="login-intro">
              Your Marketlane details are ready whenever you are.
            </p>
            <div className="account-detail">
              <span>ACCOUNT EMAIL</span>
              <strong>{user.profile?.email}</strong>
            </div>
            <div className="account-detail">
              <span>MEMBER SINCE</span>
              <strong>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Today"}
              </strong>
            </div>
            <Link href="/cart" className="button-primary account-continue">
              Go to your bag <ArrowRight size={15} />
            </Link>
            <button
              className="text-action sign-out"
              onClick={signOut}
              type="button"
            >
              <LogOut size={14} /> Sign out
            </button>
          </>
        ) : (
          <>
            <p className="eyebrow">YOUR GOOD FINDS, ALL IN ONE PLACE</p>
            <h1>
              Welcome
              <br />
              <em>back.</em>
            </h1>
            <p className="login-intro">
              Sign in to make checkout a little quicker.
            </p>
            <form className="login-form" onSubmit={handleSubmit}>
              <label className="field">
                Your name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  required
                />
              </label>
              <label className="field">
                Email address
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
              <button className="button-primary" type="submit">
                Continue with email <ArrowRight size={16} />
              </button>
            </form>
            <p className="login-privacy">
              <ShieldCheck size={14} /> Your details stay yours. Always.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
