import React from 'react'
import '../../styles/FileCard.css'

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';





const SharedCard = ({ name, hash, address, type  }) => {
    
 
    
    return (
        <div className='fileCard'>
            <div className="fileCard--top">
            {(() => {
        switch (type) {
          case 'mp4' || 'mkv':
            return <VideoLibraryIcon style={{ fontSize: 130 }}/>
          case 'jpeg' || 'png':
            return <PhotoLibraryIcon style={{ fontSize: 130 }} />
          case 'pdf':
            return <PictureAsPdfIcon style ={{ fontSize: 130 }} />
          default:
            return <InsertDriveFileIcon style={{ fontSize: 130 }} />
        }
      })()}

            
            </div>

            <div className="fileCard--bottom">
                <p><a href={`https://ipfs.infura.io/ipfs/${hash}`} style={{textDecoration: 'none', color: 'black'}}>{name.slice(0,8)}...{name.slice(-4)}</a></p>
                <div> Shared by <a href={`https://mumbai.polygonscan.com/address/${address}`}>{address.slice(0, 6)}...{address.slice(-4)}</a></div> 
            </div>
            
        </div>
    )
}

export default SharedCard
