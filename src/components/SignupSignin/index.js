import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth();
  const signupWithEmail = () => {
    if (name != "" &&email !== "" &&password !== "" &&confirmPassword !== "" ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
    else {}
  };

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Signup on <span style={{ color: "rgb(64, 131, 255)" }}>FundWise</span>
      </h2>
      <form>
        <Input
          label="Name"
          type="text"
          placeholder="John Doe"
          state={name}
          setState={setName}
        />
        <Input
          label="Email"
          type="email"
          placeholder="example@example.com"
          state={email}
          setState={setEmail}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          state={password}
          setState={setPassword}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          state={confirmPassword}
          setState={setConfirmPassword}
        />
        <Button
          text="Sign Up using Email and Password"
          onClick={signupWithEmail}
        />
        <p style={{ textAlign: "center", margin: "0px" }}>OR</p>
        <Button text="Sign Up using Gmail" blue={true} />
      </form>
    </div>
  );
}