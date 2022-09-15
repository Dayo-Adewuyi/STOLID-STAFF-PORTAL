import React, { useState, useEffect, useContext } from 'react'
import '../../styles/NewFile.css'
import { create } from 'ipfs-http-client'

import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { ConnectContext } from "../../context/ConnectContext";
import { useAlert } from 'react-alert'

const auth = 'Basic ' + Buffer.from('2Eomvq3H625IP8qyBAadDwoTA9C' + ':' + 'ce347ed17e4e9599d4b30d429991f1b5').toString('base64');
const ipfs = create({
    host: 'https://ipfs.infura.io:5001/api/v0',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});;

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
        backgroundColor: '#ad8762',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const MAX_COUNT = 100;

const NewFile = () => {
    const { createCase } = useContext(ConnectContext);
    const alert = useAlert()
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const [exhibits, setExhibits] = useState([])
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState({})
    const [fileUrl, setFileUrl] = useState('')
    const [uploading, setUploading] = useState(false)
    const [description, setdescription] = useState("")
    const [fileLimit, setFileLimit] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [judgeAddress, setJudgeAddress] = useState("")
    const [clerkAddress, setClerkAddress] = useState("")


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file)
                if (uploaded.length === MAX_COUNT) setFileLimit(true)
                if (uploaded.length > MAX_COUNT) {
                    alert(`you can only add a maximum of ${MAX_COUNT} files`)
                    setFileLimit(false)
                    limitExceeded = true;
                    return true
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)
    }
    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles)
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        setUploading(true)
        try {
            const added = await ipfs.add(file)

            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            const hash = (added.path).toString()

            for (let i = 0; i < uploadedFiles.length; i++) {
                const pushToIpfs = await ipfs.add(uploadedFiles[i])
                const individualHash = (pushToIpfs.path).toString()
                exhibits.push(individualHash)
            }

            await createCase(description, hash, judgeAddress, clerkAddress, exhibits)

            //setUrl(url)
            setFileUrl(url)
            alert.success("File successfully uploaded")

            setUploading(false)


        } catch (err) {
            console.log('Error uploading the file : ', err)
        }



    }

    return (
        <div className='newFile'>
            <div className="newFile__container" onClick={handleOpen}>
                <AddIcon fontSize='large' style={{ fill: "green" }} />
                <p>New</p>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <p>Enter Case Details</p>
                    {
                        uploading ? (
                            <p>Uploading...</p>
                        ) : (
                            <>
                                <label>CASE REF</label>
                                <input type='text' placeholder='case description' name='file Description' value={description} onChange={(e) => setdescription(e.target.value)} required /><br></br>
                                <label>JUDGE ADDRESS</label>
                                <input type='text' placeholder='judge address' name='file Description' value={judgeAddress} onChange={(e) => setJudgeAddress(e.target.value)} required /><br></br>
                                <label>CLERK ADDRESS</label>
                                <input type='text' placeholder='clerk address' name='file Description' value={clerkAddress} onChange={(e) => setClerkAddress(e.target.value)} required /><br></br>
                                <label>Upload Case File</label>
                                <input type="file" onChange={handleChange} className="input-text" /><br></br>
                                <label>Upload All Exhibits</label>
                                <input type="file" onChange={handleFileEvent} multiple className="input-text" /><br></br>
                                <button onClick={handleUpload}>Submit Entry</button>
                                <div>{
                                    uploadedFiles.map(file => (
                                        <div key={file.name}>
                                            {file.name}
                                        </div>
                                    ))
                                }</div>
                            </>
                        )
                    }
                </div>
            </Modal>
        </div>
    )
}

export default NewFile
