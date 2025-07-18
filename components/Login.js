import Image from "next/image";
import styles from "../styles/Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUser } from "@fortawesome/free-solid-svg-icons";

import Trends from "./Trends";
import LastTweets from "./LastTweet";
import Hashtag from "./Hashtag";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/user";
function Login() {
  const [showHashtag, setShowHashtag] = useState(false);
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const dispatch = useDispatch();
  const [refreshTrends, setRefreshTrends] = useState(false);

  const handleTweetDeleted = () => {
    setRefreshTrends(!refreshTrends); // Cela déclenche le useEffect dans <Trends />
  };
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleHashtagClick = (hashtag) => {
    setSelectedHashtag(hashtag);
    setShowHashtag(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.logo}>
          <Image
            src="/inverted_logo.png"
            alt="Twitter logo"
            width={50}
            height={50}
            onClick={() => setShowHashtag(false)}
            className={styles.twitterLogo}
          />
        </div>
        <div className={styles.users}>
          <div className={styles.usersInfo}>
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#ffffff" }}
              className={styles.userIcon}
              size="2x"
            />
            <div className={styles}>
              <p> Firstname</p>
              <p> @Username</p>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.middleContainer}>
        {showHashtag ? <Hashtag hashtag={selectedHashtag} /> : <LastTweets />}
      </div>
      <div className={styles.rightContainer}>
        <Trends onHashtagClick={handleHashtagClick} />
      </div>
    </div>
  );
}

export default Login;
