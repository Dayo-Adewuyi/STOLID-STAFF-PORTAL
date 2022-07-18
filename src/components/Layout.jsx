import React from 'react'
import Sidebar from './sidebar/Sidebar'
import '../styles/Layout.css'
import Header from './header/Header'


const Layout = (props) => {
  return (
    <>   
    <Header />
   <div className="app__main">
   <Sidebar />
{props.children}
</div>
</>
  )
}

export default Layout