

import React from 'react'
import './App.css'
import { useState,useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { AiFillLike,AiFillDislike } from 'react-icons/ai';



const Project = () => {
  const [screensize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.outerWidth,
  });
  const updateScreenSize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.outerWidth,
    });
  }
    useEffect(() => {
      window.addEventListener('resize', updateScreenSize);
      return () => {
      window.addEventListener('resize', updateScreenSize);
      };
    }, []);
    const handleUploadButtonClick = () => {
      fileInputRef.current.click();
    };
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [prevUploadedFiles, setPrevUploadedFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
   
   

    const handleFileInputChange = (event) => {
      const files = event.target.files;
      const newUploadedFiles = [];
      let invalidFileType = false;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'application/pdf') {
          newUploadedFiles.push(file);
        }
      }
  
        
        if (newUploadedFiles.length > 0) {
          const allUploadedFiles = [...prevUploadedFiles, ...newUploadedFiles];
          setUploadedFiles(allUploadedFiles);
      
          if (newUploadedFiles.length > 0 && prevUploadedFiles.length > 0) {
            alert('You are adding new files 📂📂');
          }
          setPrevUploadedFiles(allUploadedFiles);
        } else {
          alert('Sorry! 🙇🙇 Only PDF files are allowed to upload');
        }
  
    };
    
    const fileInputRef = React.createRef(); 
  

    const handleDownloadFile = (file) => {
      if (!file || !file.type || !file.type.startsWith("application/pdf")) {
        console.error("Invalid file object:", file);
        return;
      }
    
      const blob = file.slice(0, file.size, file.type);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
    const [likedFiles, setLikedFiles] = useState([]);
    const [dislikedFiles, setDislikedFiles] = useState([]);

const handleLikeClick = (index) => {
  
  if (likedFiles.includes(index)) {
    setLikedFiles(likedFiles.filter((item) => item !== index));
  } else {
    setLikedFiles([...likedFiles, index]);
    setDislikedFiles(dislikedFiles.filter((item) => item !== index));
  }
};

const handleDislikeClick = (index) => {
  if (dislikedFiles.includes(index)) {
    setDislikedFiles(dislikedFiles.filter((item) => item !== index));
  } else {
    setDislikedFiles([...dislikedFiles, index]);
    setLikedFiles(likedFiles.filter((item) => item !== index));
  }
};
const [showLikedFiles, setShowLikedFiles] = useState(false);
const [shortlistedFiles, setShortlistedFiles] = useState([]); 
const toggleLikedFiles = () => {
  setShowLikedFiles(!showLikedFiles);
  if (!showLikedFiles) {
    const newShortlistedFiles = uploadedFiles.filter((file, index) => likedFiles.includes(index));
    setShortlistedFiles(newShortlistedFiles); // Update state with shortlisted files
  } else {
    setShortlistedFiles([]);
  }
};

    
  return (
    <div className='wholePage'>
        <h1 className='Title'>Uploading and shortlisting</h1>
        <div className='button-container' >
        <input type='file' id='fileInput' multiple hidden ref={fileInputRef} onChange={handleFileInputChange} accept='application/pdf' />
        <button id='uploadButton' onClick={handleUploadButtonClick}>UPLOAD_FILES</button>
        </div>
        {uploadedFiles.length > 0 && (
        <div>
        <h2>Uploaded Files 🗃️ :</h2>
        <div className='Table-Container'>
        <table className='file-table'>
          <thead>
            <tr>
              <th>File Name 🗄️</th>
              <th>Download ⤵️</th>
              <th>Like</th>
              <th>Dislike</th>
              
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((file, index) => (
              <tr key={index}>
                <td>{file.name}</td> 
                <td><button onClick={() => handleDownloadFile(file)} className='Downloadpdf'>Download</button></td>
                <td><AiFillLike onClick={() => handleLikeClick(index)} style={{ color: likedFiles.includes(index) ? 'green' : 'black' }}/></td>
                <td><AiFillDislike onClick={() => handleDislikeClick(index)} style={{ color: dislikedFiles.includes(index) ? 'red' : 'black' }}/></td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedFile && (
          <div>
            <Document file={selectedFile}>
              <Page pageNumber={1} />
            </Document>
          </div>
        )}<br/><br/>
        <button onClick={toggleLikedFiles}>
        {showLikedFiles ? 'Hide Liked Files' : 'Show Liked Files'}
      </button>
      <h2>ShortListed Files 🗃️ :</h2>
      {showLikedFiles && (
      <table className='Likedtable'>
        <thead>
          <tr>
           <th>Upvoted Files</th>
          </tr> 
        </thead>
        <tbody>
          {shortlistedFiles.map((file, index) => (
            <tr className='Likedfiles' key={index} >
             <td>{file.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      </div>
    </div>
     )}
  </div>
)   
}
export default Project;
