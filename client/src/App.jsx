import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react';
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import AppNav from "./components/AppNav"

import UpDate from "./pages/UpDate"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


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

// variables that can be recaled later
const [user, setUser]= useState(null)
const [picture, setPicture]= useState(null)

// API
// 826 characters
// https://rickandmortyapi.com/documentation
// character: used to get all the characters. or character/(number) to git one caracter
// location: used to get all the locations.
// episode: used to get all the episodes.
// Example: console.log(res.data.results[0].origin.url)
      // fetch("https://rickandmortyapi.com/api")
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //   });
useEffect(() => { axios.get("https://rickandmortyapi.com/api/character")
  .then((res) => {
  // console.log(res.data.results[0].origin.url);
  const imag = res.data.results[0].origin.url;
  console.log(imag);
  setPicture(imag);
  console.log(picture)
  })
}, [])

useEffect(() => {
  console.log('--picture--')
  console.log(picture)
},[]);

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
  console.log(user)
  setUser(user)
}
useEffect(() =>{
  curr_user()
},[])

// if (user) {
//   let picture = user['picture']
//   let user_image = "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
//   console.log(user_image)
// }

  return (
    <div className="App">
      <img id="" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"></img>
      {/* <img src={user_image} id="image" height="150px" width ="150px"></img> */}
      {/* <script>
      const a1 = 'https://rickandmortyapi.com/api/character/avatar/2.jpeg';
      const image = document.getElementById("image");
      image.src = a1;
      </script> */}

      {!user &&<AppNav />}
      {user && <h1>User {user.email} is signed in.</h1>}
      {/* {user && <h1>--- {user.picture} ---</h1>} */}
      
      { <div className="card">
        {user && <button onClick={signOut}>Sign Out</button>}
      </div> }

      {user && 
      <Navbar>
          <Nav>
              <Nav.Link href="/" >Home</Nav.Link>
              <br/>
              <Nav.Link href="/#/upDate" >Update</Nav.Link>
          </Nav>
      </Navbar>
      }
      {user && <Router>
        <Routes>
          <Route path="/upDate" element={<UpDate />}></Route>
        </Routes>
      </Router>
      }

      {!user && <Router>
        <Routes>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/signIn" element={<SignIn />}></Route>
        </Routes>
      </Router>
      }
    </div>
  )
}

export default App
