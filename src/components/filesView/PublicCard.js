import React from 'react'
import '../../styles/FileCard.css'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import GavelSharpIcon from '@material-ui/icons/GavelSharp';
import { ConnectContext } from '../../context/ConnectContext';
import { useContext, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ClipboardJS from "clipboard";
import { useAlert } from 'react-alert'




function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const PublicCard = ({ name, hash, id, exhibit }) => {
    const { closeCase } = useContext(ConnectContext);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const alert = useAlert()
    
    
  
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

   
    
    
    
    const handlePrivate = async() => {
        await closeCase(id)
        alert.success("Case Closed")
    }
    
  
    
    return (
        <div className='fileCard'>
            <div className="fileCard--top">
            
            <InsertDriveFileIcon style={{ fontSize: 130 }} />
        
          
            </div>

            <div className="fileCard--bottom">
                <p><a href={`https://ipfs.infura.io/ipfs/${hash}`} style={{textDecoration: 'none', color: 'black'}}>{name}</a></p> 
                <div><span><VisibilityIcon style ={{ fontsize: 10, cursor: "pointer" } } onClick={() => handleOpen()}/></span><span><GavelSharpIcon style ={{ fontSize: 15, cursor : 'pointer'}} onClick={() => handlePrivate()} /></span></div>    
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
             <div style={modalStyle} className={classes.paper}>
                <iframe  src={"https://ipfs.infura.io/ipfs/"  + hash}
                width="100%"
                height="400px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
                title="test"/>
            <div>
              <h3>EXHIBITS</h3>
              {
                exhibit.map((element,index) => {
                  return(
                      <ul>
                        <li key = {index}><a href={`https://ipfs.infura.io/ipfs/${element}`} target="_blank" rel="noreferrer noopener">exhibit {index}</a> </li>
                      </ul>
                  )})
              }
            </div>
          
          </div>
            </Modal>
        </div>
    )
}

export default PublicCard
