import styles from '../styles/Sign.module.css';
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faXmark } from "@fortawesome/free-solid-svg-icons";
function Signin ({ onClose }){
  const dispatch = useDispatch()
    const [signInUsername,setSignInUsername] = useState('')
    const [signInPassword,setSignInPassword] = useState('')

      const router = useRouter();
    
        const handleClick = () => {

      
            fetch('https://hackatweet-backend-murex-eta.vercel.app/users/signin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username: signInUsername, password: signInPassword })
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.data.token,firstname: data.data.firstname,tweetsliked:data.data.tweetsliked }));
          setSignInUsername('');
          setSignInPassword('');
          router.push('/login')
        }else{
          alert ('Impossible to login')
        }
      });
          
          
        } 
      
//first
    return(
    <div className={styles.overlay}>
      <div className={styles.modal}>
          <FontAwesomeIcon icon={faXmark} style={{color: "#ffffff"}}onClick={onClose} className={styles.cross}/>
            <Image src="/inverted_logo.png" alt="Twitter logo" width={100} height={100}/>
                        
            <h3> Create your hackatweet account </h3>

            <input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} className={styles.inputSign}/>
            <input type="password" placeholder="Password" id="signInpassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} className={styles.inputSign}/>
            <button onClick={handleClick}className={styles.buttonSign}> Sign in </button>

          </div>
    </div>
    )
}



export default Signin;