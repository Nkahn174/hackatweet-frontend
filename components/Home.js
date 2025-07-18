import styles from '../styles/Home.module.css';
import Image from 'next/image'
import { useState } from 'react';
import Signup from './Signup';
import Signin from './Signin';


function Home() {

  const [isSignupOpen, setSignupOpen] = useState(false)
  const [isSigninOpen, setSigninOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>

      </div>
       <div className={styles.middleContainer}>
        <Image src="/inverted_logo.png" alt="Twitter logo" width={100} height={100}/>
        <h1 className={styles.mainTitle}> See what's happening </h1>
        <h2 className={styles.subTitle}> Join Hackatweet today.</h2>

        <button onClick={() => setSignupOpen(true)} className={styles.signupButton}> Sign up </button>
        <p className={styles.accountText}> Already have an account ?</p>
        <button onClick={() => setSigninOpen(true)} className={styles.signinButton}> Sign in </button>
        {isSignupOpen && <Signup onClose={() => setSignupOpen(false)} />}
        {isSigninOpen && <Signin onClose={() => setSigninOpen(false)} />}
      </div>
      <div className={styles.rightContainer}>

      </div>
    </div>
  );
}

export default Home;
