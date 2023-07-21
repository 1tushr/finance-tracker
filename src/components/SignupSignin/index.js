import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, doc, provider, setDoc } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
export default function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState();
  const navigate = useNavigate();

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
            createDoc(user);
            navigate("/dashboard");
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

  function loginUsingEmail() {
    if ((email !== "") & (password !== "")) {
      console.log("email", email);
      console.log("password", password);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          toast.success("login success");
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } else {
      toast.error("all fields are necessary");
    }
  }
  async function createDoc(user) {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("doc created");
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      // toast.error("doc already exists");
      setLoading(false);
    }
  }
  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>>>>>>", user);
          toast.success("user authenticated!");
          createDoc(user);
          setLoading(false);
           navigate("/dashboard");
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          setLoading(false)
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error("user not authenticated!");
        });
    } catch (e) {
      setLoading(false)
      toast.error(e.message);
      setLoading(false);
    }
  }
  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login <span style={{ color: "rgb(64, 131, 255)" }}>FundWise</span>
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
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

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Email and Password"}
              onClick={loginUsingEmail}
            />
            <p className="p-mode">OR</p>
            <Button
              text={loading ? "Loading" : "Login using Gmail"}
              blue={true}
              onClick={googleAuth}
            />
            <p className="p-mode" onClick={(e) => setLoginForm(!loginForm)}>
              Or Don't Have An Account Already? Click Here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Signup on{" "}
            <span style={{ color: "rgb(64, 131, 255)" }}>FundWise</span>
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
            <p className="p-mode">OR</p>
            <Button
              text={loading ? "Loading" : "Sign Up using Gmail"}
              blue={true}
              onClick={googleAuth}
            />
            <p className="p-mode" onClick={(e) => setLoginForm(!loginForm)}>
              Or Have An Account Already? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
}
