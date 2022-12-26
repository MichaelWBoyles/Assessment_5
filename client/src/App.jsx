import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
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

const signIn=async()=>{
  console.log('Sign In') 
  let myResponse = await axios.post('signIn/')
  console.log(myResponse.data) 
}
const signUp=async()=>{
  console.log('Sign Up') 
  let myResponse = await axios.post('signUp/')
  console.log(myResponse.data) 
}
const signOut=async()=>{
  console.log('Sign Out') 
  let myResponse = await axios.post('signOut/')
  console.log(myResponse.data) 
}


  return (
    <div className="App">
      <div>
        <button onClick={signIn}>Sign In</button>
        <button onClick={signUp}>Sign Up</button>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  )
}

export default App
