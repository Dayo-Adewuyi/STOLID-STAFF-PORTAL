import React from 'react'
import '../../styles/FileItem.css'

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import moment from 'moment';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FileItem = ({ id, caption, timestamp, fileUrl, size }) => {
    // const fileDate = `${new Date(timestamp*1000).getDate()} ${monthNames[new Date(timestamp).getMonth() + 1]} ${new Date(timestamp*1000).getFullYear()}`
    // const fileDate = `${timestamp.toDate().getDate()} ${monthNames[timestamp.toDate().getMonth() + 1]} ${timestamp.toDate().getFullYear()}`
    const fileDate=moment.unix(timestamp)

    const getReadableFileSizeString = (fileSizeInBytes) => {
        let i = -1;
        const byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);

        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    };

    return (
        <div className='fileItem'>
            <a href={`https://ipfs.infura.io/ipfs/${fileUrl}`} target="_blank" download>
                <div className="fileItem--left">
                    <InsertDriveFileIcon />
                    <p>{caption}</p>
                </div>
                <div className="fileItem--right">
                    <p>{fileDate.format('DD MMMM YYYY')}</p>
                    <p>{getReadableFileSizeString(size)}</p>
                </div>
            </a>
        </div>
    )
}

export default FileItem
