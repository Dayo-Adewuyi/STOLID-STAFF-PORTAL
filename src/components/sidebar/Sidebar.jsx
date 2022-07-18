import React,{useContext, useEffect, useState} from 'react'
import '../../styles/Sidebar.css'

import NewFile from './NewFile.jsx'
import SidebarItem from './SidebarItem.jsx'

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import GavelSharpIcon from '@material-ui/icons/GavelSharp';

import { ConnectContext } from '../../context/ConnectContext'


const Sidebar = () => {


    const { checkModerator} = useContext(ConnectContext)


    const [currentAccount, setCurrentAccount] = useState("");
    
    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;
    
        if (!ethereum) {
          console.log('Make sure you have metamask!');
          return;
        } else {
          console.log('We have the ethereum object', ethereum);
        }
        
        const accounts = await ethereum.request({ method: 'eth_accounts' });
    
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
    }
    useEffect(() => {
      checkIfWalletIsConnected();
      
    },[currentAccount])
    return (
        <div className='sidebar'>
            <NewFile />

            <div className="sidebar__itemsContainer">
                <SidebarItem arrow icon={(<InsertDriveFileIcon style={{ fill : "green" }} />)} label={'Clerk Files'} url={""}/>
                <SidebarItem arrow icon={(<GavelSharpIcon style={{ fill : "green" }} />)} label={'Judge Files'} url={"public-files"}/>
                              
                <SidebarItem icon={(<GavelSharpIcon style={{ fill : "green" }} />)} label={'Admins'} url={"admin"} />
                
               
                
                
                <hr/>
                
               

            </div>

        </div>
    )
}

export default Sidebar
