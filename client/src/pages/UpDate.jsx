import axios from 'axios'
import { useState } from 'react'

const UpDate=()=>{

    // const [info, setinfo]= useState(null)

    const upDate=async()=>{
        console.log('Up Date')
        let value=document.getElementById("value").value
        let test=document.getElementById("test").value
        console.log(value)
        let myResponse = await axios.post('upDate/',{
            'value':value,
            'test':test
          })
          console.log(myResponse.data)
    }

    return(
        <form>
            
            <div>
                <h1>Update</h1>
            </div>

            <input id='value' placeholder='value' />
            <br/>
            <input id='test' placeholder='test'/>
            <br/>
            <button onClick={upDate}>Update</button>
        </form>

    )
}

export default UpDate