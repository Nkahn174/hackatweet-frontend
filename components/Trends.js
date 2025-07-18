import { useState, useEffect } from "react";
import styles from "../styles/Trends.module.css";
import { useSelector, useDispatch } from "react-redux";
import { generateTrendList } from "../reducers/trends";

function Trends({ onHashtagClick }) {
  const dispatch = useDispatch();
  const trends = useSelector((state) => state.trends.value);

  useEffect(() => {
    fetch("https://hackatweet-backend-murex-eta.vercel.app/tweets/trends")
      .then((response) => response.json())
      .then((data) => {
        dispatch(generateTrendList(data.data));
      });
  }, []);

  const hashtagTrends = trends.map((data, i) => {
    return (
      <div
        className={styles.hashtag}
        onClick={() => onHashtagClick(data.hashtag)}
        key={i}
      >
        <p className={styles.hashtagName}> {data.hashtag} </p>
        <p className={styles.hashtagNbr}> {data.nbrTweets} Tweets</p>
      </div>
    );
  });
  return (
    <>
      <h2 className={styles.title}> Trends</h2>
      <div className={styles.hashtagContainer}>{hashtagTrends}</div>
    </>
  );
}

export default Trends;
