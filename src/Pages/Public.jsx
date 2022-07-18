import React, { useState, useEffect , useContext} from 'react'
import '../styles/FilesView.css'

import { ConnectContext } from '../context/ConnectContext'
import PublicCard from '../components/filesView/PublicCard'


export default function Example() {

    const { fetchJudgeCases} = useContext(ConnectContext)
    const [files, setFiles] = useState([])
   
    

    
    const fetch = async() =>{
        const tx = await fetchJudgeCases()
             setFiles(tx)

     }
 
     useEffect(() => {fetch()
        }, [files])
    
    

    return (
        <div className='fileView'>
            <div className="fileView__row">
                { files?.length>0 ?
                    files.map((element,index) => {
                        return(
                            <PublicCard key={index} id={element.id} name={element.caseId} hash={element.fileHash} exhibit={element.caseExhibits}/>
                        )}) :(<div>No Files</div>)
                        
                } 
                              
            </div>
          
            
        </div>
    )

}