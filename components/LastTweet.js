import styles from '../styles/LastTweets.module.css';
import { useEffect, useState } from 'react';

import Tweet from './Tweet';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { generateTweetList } from '../reducers/tweets';
import { generateTrendList } from '../reducers/trends';
import { addTweetToStore } from '../reducers/tweets';

function LastTweets(){ 

    const dispatch = useDispatch()
    
    const user = useSelector((state) => state.user.value);
    useEffect(()=>{
        fetch('https://hackatweet-backend-murex-eta.vercel.app/tweets').then(response=>response.json()).then(
          data=>{
            dispatch(generateTweetList(data.data));
          }
        )

    },[dispatch])
    
    const writeTweet= ()=>{
        fetch('https://hackatweet-backend-murex-eta.vercel.app/tweets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user.username, firstname: user.firstname,message: newTweet })}).then(response=>response.json()).then(
            (data)=>{
              console.log(data)
              dispatch(addTweetToStore(data.data));
              setNewTweet('');
              refreshTrends();
            }
          )
    
    }





    const refreshTrends = () => {
  fetch('https://hackatweet-backend-murex-eta.vercel.app/trends')
    .then((res) => res.json())
    .then((data) => {
      if (data?.data) {
        dispatch(generateTrendList(data.data));
      }
    });
};

    const tweets = useSelector((state) => state.tweets.value);

    const tweetTodips = tweets.slice().reverse().map((data,i)=>{
      return (<Tweet msg={data.message} hastag ={data.hashtags} nbrLike = {data.nbrOfLikes} time ={data.heure} firstname={data.firstname} username={data.username} isOwner={data.username === user.username} key={i} tweetToken = {data.token} onTweetDeleted={refreshTrends} ></Tweet> )
    })
    
    const [newTweet,setNewTweet] = useState('')
    return (
        <div className={styles.Container}>
          <div className={styles.headerLogin}>
            <div className={styles.firstHeader}> 
                  <h2> Home </h2>
              </div>
                <div className={styles.middleInput}>
              <input  className={styles.inputTweet} type='text' placeholder="What's up?" onChange={(e) => setNewTweet(e.target.value)} value={newTweet}/>
              </div>
              <div className={styles.lastHeader}> 
                <p>{newTweet.length}/280 </p>
                <button className={styles.addTweet} onClick={()=>writeTweet()}> Tweet</button>
              </div>
          </div>
          
          <div className={styles.tweetContainer}>
              {tweetTodips}
          </div>
        </div>
    )
}


export default LastTweets