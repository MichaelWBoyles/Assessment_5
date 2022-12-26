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
  let email='mike@gmail.com'
  let password='mike1234'
  let myResponse = await axios.post('signIn/',{
    'email':email,
    'password':password
  })
  console.log(myResponse.data) 
}
const signUp=async()=>{
  console.log('Sign Up')
  let email='mike@gmail.com'
  let password='mike1234'
  let myResponse = await axios.post('signUp/',{
    'email':email,
    'password':password
  })
  console.log(myResponse.data) 
}
const signOut=async()=>{
  console.log('Sign Out') 
  let myResponse = await axios.get('signOut/')
  console.log(myResponse.data) 
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
      <div>
        <button onClick={signIn}>Sign In</button>
        <button onClick={signUp}>Sign Up</button>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  )
}

export default App
