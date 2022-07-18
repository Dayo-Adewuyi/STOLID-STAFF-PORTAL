import * as React from 'react';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


import {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';



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


function ChildModal({ name, hash, id, type }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
        <div>
      <Button onClick={handleOpen} variant="contained">Share</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
         
          
          
          <button
        className="button"
        data-clipboard-action="copy"
        data-clipboard-target={`https://ipfs.infura.io/ipfs/${hash}`}
      >
        Copy Link
      </button>
          
          <img alt="" src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ipfs.infura.io/ipfs/"  + hash}></img>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </Modal>
      </div>
  );
}

export default ChildModal