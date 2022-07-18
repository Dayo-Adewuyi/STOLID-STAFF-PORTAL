import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/SidebarItem.css'

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const SidebarItem = ({ arrow, icon, label, url }) => {
    return (
        <div className='sidebarItem'>
            <div className="sidebarItem__arrow">
                {arrow && (<ArrowRightIcon />)}
            </div>
            
            <div className='sidebarItem__main'>
                {icon}
                <p><Link to={`/${url}`}>{label}</Link></p>
            </div>
        </div>

    )
}

export default SidebarItem
