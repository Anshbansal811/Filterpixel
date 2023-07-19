import React, { useEffect, useState } from 'react';
import "./GalleryScreen.css";
const Dasboard = () => {
     // Replace with your API key
  const API_KEY = 'AIzaSyDauwfRarigk5-69wD2wsdEJjZdkDjEnE4';
  // Replace with the actual ID of your Google Drive folder
  const FOLDER_ID = '1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS';

  const [imageLinks, setImageLinks] = useState([]);

  const listFilesInFolder = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
    }).then(() => {
      return window.gapi.client.request({
        path: `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+(mimeType='image/jpeg'+or+mimeType='image/png'+or+mimeType='image/gif')`,
      });
    }).then((response) => {
      const links = response.result.files.map(file => file.id);
      setImageLinks(links);
    }).catch((error) => {
      console.error('Error fetching images:', error);
    });
  };

  useEffect(() => {
    // Load the Drive API client library when the component mounts.
    window.gapi.load('client', listFilesInFolder);
  }, []);

  return (
    <div>
    <div className="gallery-screen">
      <div className="main-screen" />
      <header className="nav-bar">
        <div className="newlogo-1-parent">
          <img className="newlogo-1-icon" alt="" src="/newlogo-1.svg" />
          <div className="filterpixel">FilterPixel</div>
        </div>
      </header>
    </div>
      <div id="imagesContainer">
      <div className="images">
        <div className="group-parent1">
          <div className="group-wrapper">
            <div className="group-wrapper">
              <div className="photo-1580824456266-c578703e13" />
            </div>
          </div>
          <h1>Google drive fetching</h1>
          {imageLinks.map((link, index) => (
          <img key={index} src={`https://drive.google.com/uc?id=${link}`} alt={`Image ${index + 1}`} width='300px' height='300px'/>
        ))}
        </div>
      </div>
      </div>
    </div>
  );
};
export default Dasboard;
