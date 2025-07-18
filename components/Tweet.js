import styles from '../styles/Tweet.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash,faUser } from "@fortawesome/free-solid-svg-icons";
import HighlightHashtags from './HighlightHashtags';
import { useState,useEffect } from 'react';
import timeSince from '../modules/timeSince'
import { deleteTweetToStore } from '../reducers/tweets';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

import { addTweetLiked,removeTweetLiked } from '../reducers/user';

function Tweet(props){
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(props.nbrLike || 0);

  // Initialiser isLiked si tweet est déjà liké par l'user
  useEffect(() => {
    if (user?.tweetsliked && user.tweetsliked.includes(props.tweetToken)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [user, props.tweetToken]);

  // Sync likesCount si props.nbrLike change
  useEffect(() => {
    setLikesCount(props.nbrLike || 0);
  }, [props.nbrLike]);

  
const toggleLike = () => {
  const newLikeState = !isLiked;

  // Mise à jour immédiate UI
  setIsLiked(newLikeState);
  setLikesCount(prev => newLikeState ? prev + 1 : prev - 1);

  const urlUserLike = newLikeState 
    ? 'https://hackatweet-backend-murex-eta.vercel.app/users/newtweetliked' 
    : 'https://hackatweet-backend-murex-eta.vercel.app/users/unlikedtweet';

  fetch(urlUserLike, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tokenUser: user.token,
      tokenTweet: props.tweetToken,
    }),
  })
  .then(res => res.json())
  .then(dataUser => {
    if (!dataUser.results) throw new Error("User update failed");

    return fetch('https://hackatweet-backend-murex-eta.vercel.app/tweets/likesupdate', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: props.tweetToken,
        modifyLike: newLikeState ? 'true' : 'false',
      }),
    });
  })
  .then(res => res.json())
  .then(dataTweet => {
    if (!dataTweet.result) throw new Error("Tweet update failed");

    if (newLikeState) {
      dispatch(addTweetLiked(props.tweetToken));
    } else {
      dispatch(removeTweetLiked(props.tweetToken));
    }
  })
  .catch(() => {
    setIsLiked(!newLikeState);
    setLikesCount(prev => newLikeState ? prev - 1 : prev + 1);
  });
};

const HandleRemoveClick = (token) => {
  fetch('https://hackatweet-backend-murex-eta.vercel.app/tweets', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: token }),
  })
    .then((response) => response.json())
    .then(() => {
      dispatch(deleteTweetToStore(token));
            if (props.onTweetDeleted) {
        props.onTweetDeleted(); 
      }; 
    });
};

    return (
        <div className={styles.tweetContainer}>
          <div className={styles.user}>
            <FontAwesomeIcon icon={faUser} style={{color: "#ffffff"}} size="2x" />
            <p> {props.firstname} <span className={styles.tweetInfo}>@{props.username} {timeSince(props.time)} </span> </p>
          </div>
          <div className={styles.tweetMsg}> 
            <HighlightHashtags msg={props.msg}/>
            </div>
            <div className={styles.tweeInteract}> 
            <FontAwesomeIcon icon={faHeart} style={{ color: isLiked ? "#ff69b4" : "#ffffff" }} className={styles.iconToHover} onClick={toggleLike} /> {likesCount}
            {props.isOwner && <FontAwesomeIcon icon={faTrash} style={{color: "#ffffff"}} className={styles.iconToHover} onClick={() => HandleRemoveClick(props.tweetToken)}/>}
        </div>
        </div>
    )
}

export default Tweet