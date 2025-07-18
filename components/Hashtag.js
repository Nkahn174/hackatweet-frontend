import styles from "../styles/Hashtag.module.css";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import { useDispatch } from "react-redux";
import { generateTrendList } from "../reducers/trends";
import { useSelector } from "react-redux";

function Hashtag({ hashtag }) {
  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();
  const [newHashtag, setNewHashtag] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    refreshHashtagTweets();
  }, [hashtag]);

  const refreshHashtagTweets = () => {
    if (!hashtag) return;
    fetch(
      `https://hackatweet-backend-murex-eta.vercel.app/tweets/hashtag/${encodeURIComponent(
        hashtag
      )}`
    )
      .then((res) => res.json())
      .then((data) => setTweets(data.data));
  };

  const refreshTrends = () => {
    fetch("https://hackatweet-backend-murex-eta.vercel.app/tweets/trends")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          dispatch(generateTrendList(data.data));
        }
      });
  };
  const handleKeyDown = (value) => {
    if (value.trim() === "") return;

    fetch(
      `https://hackatweet-backend-murex-eta.vercel.app/tweets/hashtag/${encodeURIComponent(
        value
      )}`
    )
      .then((res) => res.json())
      .then((data) => setTweets(data.data));
  };

  const handleTweetDeleted = () => {
    refreshHashtagTweets(); // mettre à jour la liste affichée
    refreshTrends(); // mettre à jour les tendances
  };

  const tweetTodips = tweets.map((data, i) => {
    return (
      <Tweet
        msg={data.message}
        hastag={data.hashtags}
        nbrLike={data.nbrOfLikes}
        time={data.heure}
        firstname={data.firstname}
        username={data.username}
        isOwner={user && user.username === data.username}
        tweetToken={data.token}
        key={i}
        onTweetDeleted={handleTweetDeleted}
      ></Tweet>
    );
  });
  return (
    <div className={styles.Container}>
      <div className={styles.headerTags}>
        <div className={styles.firstHeader}>
          <h2> Hashtags </h2>
        </div>
        <div className={styles.middleInput}>
          <input
            className={styles.inputHashtags}
            type="text"
            placeholder="#..."
            onChange={(e) => setNewHashtag(e.target.value)}
            value={newHashtag}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleKeyDown(newHashtag);
            }}
          />
        </div>
      </div>
      <div className={styles.HashtagCOntainer}>{tweetTodips}</div>
    </div>
  );
}

export default Hashtag;
