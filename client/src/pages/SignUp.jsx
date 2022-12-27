import axios from 'axios'
import { useState } from 'react'

const SignUp=()=>{

    const [info, setinfo]= useState(null)

    const signUp=async()=>{

        console.log('Sign Up')
      
        let email=document.getElementById("signInEmail").value
        console.log("email: " + email)
        let password=document.getElementById("signUpPassword").value
        if (password.length < 8){
          setinfo('Password must be 8 letter long')
        }
        else{
          let myResponse = await axios.post('signUp/',{
            'email':email,
            'password':password
          })
          console.log(myResponse.data)
          if(myResponse.data.signup == false){setinfo('That user allready exists')}
          else{setinfo(null)}
        }
      }
    return(
        <form>

            <div>
                {info && <h2>{info}</h2>}
                {!info && <h1>Sign Up</h1>}
            </div>
            
            <input id='signInEmail' placeholder='email' />
            <br/>
            <input id='signUpPassword' placeholder='sign up new password'/>
            <br/>
            <button onClick={signUp}>Sign Up</button>

        </form>
    )
}

export default SignUp