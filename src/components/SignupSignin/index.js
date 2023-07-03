import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
export default function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signupWithEmail = () => {
    setLoading(true);
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("user>>>", user);
            toast.success("user created success");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc();
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("password does not match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };

  function createDoc() {}

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Signup on <span style={{ color: "rgb(64, 131, 255)" }}>FundWise</span>
      </h2>
      <form onSubmit={(e) => e.preventDefault()}>
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
          disabled={loading}
          text={loading ? "Loading..." : "Sign Up using Email and Password"}
          onClick={signupWithEmail}
        />
        <p style={{ textAlign: "center", margin: "0px" }}>OR</p>
        <Button
          text={loading ? "Loading" : "Sign Up using Gmail"}
          blue={true}
        />
      </form>
    </div>
  );
}
