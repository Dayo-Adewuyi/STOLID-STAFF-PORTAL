import React from "react";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Admin from "./Pages/Admin";

import Public from "./Pages/Public"
import Layout from "./components/Layout"
import FilesView from './components/filesView/FilesView'
import { ConnectProvider } from './context/ConnectContext';





import './App.css';

export default function App() {
  
  return (
    <ConnectProvider>
    
    <Router>
          
          <Layout>
           <Routes> 
           
             
               
              
         <Route exact path="/" element={<FilesView />}></Route>
               <Route exact path="/admin" element={<Admin />}></Route>
               
              
               <Route exact path="/public-files" element={<Public />}></Route>
               
             
           
             </Routes>
             </Layout>
             
         </Router>
        
    </ConnectProvider>
  );
  
}
