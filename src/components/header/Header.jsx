import React from 'react'

import '../../styles/Header.css'

import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useContext,useState, useEffect } from 'react';
import { ConnectContext } from '../../context/ConnectContext';
import ethLogo from '../../assets/ethlogo.png'


const Header = () => {
    const {currentAccount } = useContext(ConnectContext);
   
    const style = {
        transform: 'rotate(360deg)',
        transition: 'transform 150ms ease'
    }
    return (
        <div className='header'>
            <div className="header__logo" style={style}>
              
                🗄️
                <span className='header__text'>STOLID STAFF PORTAL</span>
            </div>
            <div className="header__searchContainer">
                <div className="header__searchBar">
                    <SearchIcon />
                    <input type="text" placeholder='Search Files'  />
                    <ExpandMoreIcon />
                </div>
            </div>
            <div className="header__icons">
                <span>
                  
                    
                </span>
                
                {currentAccount && <button className='btn'><img alt="Network logo" className="logo" src={ethLogo} width="10px" height="10px"/>{currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </button>}
            </div>
        </div>
    )
}

export default Header
