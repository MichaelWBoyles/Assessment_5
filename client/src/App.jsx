import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react';


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common["X-CSRFToken"]=csrftoken


function App() {

// const [count, setCount] = useState(0)
const [user, setUser]= useState(null)

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
  }
}

const signUp=async()=>{
  console.log('Sign Up')
  let email=document.getElementById("signInEmail").value
  console.log("email: " + email)
  let password=document.getElementById("signUpPassword").value
  let myResponse = await axios.post('signUp/',{
    'email':email,
    'password':password
  })
  console.log(myResponse.data) 
}

const signOut=async()=>{
  console.log('Sign Out') 
  let myResponse = await axios.get('signOut/')
  if (myResponse.data["signout"]==true){
    window.location.reload() // reload's the web page
  }
  
}

const curr_user=async()=>{
  let myResponse=await axios.get('current_user')
  let user= myResponse.data && myResponse.data[0] && myResponse.data[0].fields
  setUser(user)
}
useEffect(() =>{
  curr_user()
},[])



  return (
    <div className="App">
      {user && <h1>{user.email}</h1>}
      <div className="card">
        <input id='signInEmail' placeholder='email' />
        <br/>
        <input id='signInPassword' placeholder='current password' type="password"/>
        <br/>
        <input id='signUpPassword' placeholder='sign up password only'/>
        <br/>
        <button onClick={signIn}>Sign In</button>
        <button onClick={signUp}>Sign Up</button>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  )
}

export default App
