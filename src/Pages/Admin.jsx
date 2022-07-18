import React, { useState, useContext} from 'react'
import '../styles/Admin.css'
import { ConnectContext } from '../context/ConnectContext'



export default function Admin() {

    const { reassign,addRegistrar,removeRegistrar,removeCJN, pauseContract, unpauseContract} = useContext(ConnectContext)
    
    const [address, setAddress] = useState("")
    const [id, setId] = useState(0)
    const [judge, setJudge] = useState("")
    const [clerk, setClerk] = useState("")
  
    const handleChange = (e) => {
        setAddress(e.target.value)
    }
    const handleAdd = async() => {
        await addRegistrar(address)
        alert("registrar successfully added")
    }

    const handleRemove = async() =>{
        await removeRegistrar(address)
        alert("Registrar successfully removed")
    }

    const remove = async() => {
        await removeCJN(address)
        alert("CJN  successfully changed")
    }
   
    const change = async() =>{

        await reassign(id,judge,clerk)

        alert("case succefully assigned")
    }

    return (
        <div className='Admin'>
         <div className='input-field'>
            
            <label>Address</label>
            <input type='text' placeholder='input Registrar ddress' onChange={handleChange}/>
            <button onClick={handleAdd}>Add Registrar </button><button onClick={handleRemove}>Remove Registrar </button><br></br>
            <label>Address</label>
            <input type='text' placeholder='input CJN address' onChange={handleChange}/>
            <button onClick={remove}>Change Chief Justice </button>
         </div>
         <div>
            <div>
                <h3>Re-Assign Case</h3>
                <input type='text' placeholder='input Case Id' onChange={(e)=>{setId(e.target.value)}}/>
                <input type='text' placeholder='Address Judge' onChange={(e)=>{setJudge(e.target.value)}}/>
                <input type='text' placeholder='Address Clerk' onChange={(e)=>{setClerk(e.target.value)}}/>
                <button onClick={change}>Re-Assign</button>  

            </div>

            <button onClick={pauseContract}>Pause</button>
            <button onClick={unpauseContract}>Unpause</button>
         </div>  
        </div>
    )

}