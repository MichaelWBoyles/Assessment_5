import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react';
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import AppNav from "./components/AppNav"


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
const [info, setinfo]= useState(null)

// const signIn=async()=>{
//   console.log('Sign In')
//   let email=document.getElementById("signInEmail").value
//   let password=document.getElementById("signInPassword").value
//   console.log(email)
//   let myResponse = await axios.post('signIn/',{
//     'email':email,
//     'password':password
//   })
//   console.log(myResponse.data)
  
//   if (myResponse.data["signIn"]==true){
//     window.location.reload() // reload's the web page
//     setinfo(null)
//   }
//   else{
//     setinfo('Wrong User-Name or Password')
//   }
// }

// const signUp=async()=>{
//   console.log('Sign Up')

//   let email=document.getElementById("signInEmail").value
//   console.log("email: " + email)
//   let password=document.getElementById("signUpPassword").value
//   if (password.length < 8){
//     setinfo('Password must be 8 letter long')
//   }
//   else{
//     let myResponse = await axios.post('signUp/',{
//       'email':email,
//       'password':password
//     })
//     console.log(myResponse.data)
//     if(myResponse.data.signup == false){setinfo('That user allready exists')}
//     else{setinfo(null)}
//   }
// }

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
      {!user &&<AppNav />}
      {user && <h1>User {user.email} is signed in.</h1>}
      {/* {info && <h2>{info}</h2>} */}
      
      { <div className="card">
        {user && <button onClick={signOut}>Sign Out</button>}
      </div> }

      {!user && <Router>
        <Routes>
          <Route path="/signUp" element={<SignUp />}> </Route>
          <Route path="/signIn" element={<SignIn />}> </Route>
        </Routes>
      </Router>
      }
    </div>
  )
}

export default App
