import styles from "../styles/Sign.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

function Signup({ onClose }) {
  const dispatch = useDispatch();
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const router = useRouter();

  const handleClick = () => {
    // Exemple de condition
    fetch("https://hackatweet-backend-murex-eta.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
        firstname: signUpFirstname,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: signUpUsername,
              token: data.data.token,
              firstname: signUpFirstname,
              tweetsliked: data.data.tweetsliked,
            })
          );
          setSignUpFirstname("");
          setSignUpPassword("");
          setSignUpUsername("");
          router.push("/login");
        } else {
          alert("Impossible to register");
        }
      });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: "#ffffff" }}
          onClick={onClose}
          className={styles.cross}
        />
        <Image
          src="/inverted_logo.png"
          alt="Twitter logo"
          width={50}
          height={50}
        />

        <h3> Create your hackatweet account </h3>
        <input
          type="text"
          placeholder="Firstname"
          id="signUpFirstname"
          onChange={(e) => setSignUpFirstname(e.target.value)}
          value={signUpFirstname}
          className={styles.inputSign}
        />
        <input
          type="text"
          placeholder="Username"
          id="signUpUsername"
          onChange={(e) => setSignUpUsername(e.target.value)}
          value={signUpUsername}
          className={styles.inputSign}
        />
        <input
          type="password"
          placeholder="Password"
          id="signUppassword"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword}
          className={styles.inputSign}
        />
        <button className={styles.buttonSign} onClick={handleClick}>
          {" "}
          Sign up{" "}
        </button>
      </div>
    </div>
  );
}

export default Signup;
