import axios from 'axios'
import { useState } from 'react'

const SignIn=()=>{

    const [info, setinfo]= useState(null)

    const signIn=async()=>{

        console.log('Sign In')
        let email=document.getElementById("signInEmail").value
        let password=document.getElementById("signInPassword").value
        console.log(email)
        let myResponse = await axios.post('signIn/',{
          'email':email,
          'password':password
        })
        console.log(myResponse.data)
        
        if (myResponse.data["signIn"]==true){
          window.location.reload() // reload's the web page
          setinfo(null)
        }
        else{
          setinfo('Wrong User-Name or Password')
        }
      }

    return(
        <form>

            
            <div>
                {info && <h2>{info}</h2>}
                {!info && <h1>Login</h1>}
            </div>

            <input id='signInEmail' placeholder='email' />
            <br/>
            <input id='signInPassword' placeholder='current password' type="password"/>
            <br/>
            <button onClick={signIn}>Sign In</button>
        </form>
    )
}

export default SignIn