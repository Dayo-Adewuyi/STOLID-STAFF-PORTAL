import React from 'react'
import '../../styles/FileCard.css'
import {create as ipfsHttpClient} from 'ipfs-http-client'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { useAlert } from 'react-alert'
import { ConnectContext } from '../../context/ConnectContext';
import { useContext, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';


const ipfs = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

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
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const MAX_COUNT = 50;

const FileCard = ({ name, hash, id}) => {
    const { addExhibit, updateCaseFile } = useContext(ConnectContext);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [exhibits, setExhibits] = useState([]) 
    const [uploading, setUploading] = useState(false)
    const [uploadedFiles, setUploadedFiles]= useState([])
    const [file, setFile] = useState({})
    const [fileLimit, setFileLimit]= useState(false)
   
    const alert = useAlert()
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileEvent = (e) =>{
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles)
    }
    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file)=>{
            if(uploaded.findIndex((f)=> f.name === file.name)=== -1){
                uploaded.push(file)
                if(uploaded.length === MAX_COUNT) setFileLimit(true)
                if(uploaded.length > MAX_COUNT){
                    alert(`you can only add a maximum of ${MAX_COUNT} files`)
                    setFileLimit(false)
                    limitExceeded = true;
                    return true
                }
            }
        })
        if(!limitExceeded) setUploadedFiles(uploaded)
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
    const handleClick = async() => {
        const added = await ipfs.add(file)
        const fileHash=  (added.path).toString()
        await updateCaseFile(id, fileHash );
        alert.success("Case succesfully updated")
    }
    const handleShare = async() => {

        for( let i = 0; i < uploadedFiles.length; i++){
            const pushToIpfs = await ipfs.add(uploadedFiles[i])
            const individualHash = (pushToIpfs.path).toString()
            exhibits.push(individualHash)
        }
         
        await addExhibit(exhibits, id);
        alert.success("exhibit successfully added")
    }
  

  
    
    return (
        <div className='fileCard'>
            <div className="fileCard--top">
         
             <InsertDriveFileIcon style={{ fontSize: 130 }} />
        
               
            </div>

            <div className="fileCard--bottom">
                <p><a href={`https://ipfs.infura.io/ipfs/${hash}`} style={{textDecoration: 'none', color: 'black'}}>{name}</a></p> 
                <div><span><EditIcon style ={{ fontsize: 10, cursor: 'pointer' } } onClick={() => handleOpen()} /></span></div>    
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
                <div style={modalStyle} className={classes.paper}>
                    <label>Upload New Case File </label>
                    <input type="file" onChange={handleChange}  className="input--field"/>
                    <button style={{marginBottom: "10px"}} onClick={()=>handleClick()} className= "btn" >Upload Case File</button>
                    <input type="file" onChange={handleFileEvent}  multiple className="input-text"/>
                    <button onClick={()=>handleShare()} className="btn" >Upload New Exhibits</button>
                    
                    
                    </div>
            </Modal>
        </div>
    )
}

export default FileCard
