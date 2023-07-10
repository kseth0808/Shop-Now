import React, { useEffect, useState } from 'react';
import { storage } from '../Firebase';
import { getDownloadURL, listAll, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';
import Home from './Home';

function Items() {
  const [imageUpload, setimageUpload] = useState();
  const [imageList, setimageList] = useState([]);

  const imagesListRef = ref(storage, "image/");

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `image/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((URL)=>{
        setimageList((prev) => [...prev, URL]);
      })
    });
  };



  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      setimageList([])
      response.items.forEach((item) => {
        getDownloadURL(item).then((URL) => {
          setimageList((prev) => [...prev, URL]);
        });
      });
    });
  }, []);
  
  return (
    <div>
      <input type="file" onChange={(event) => { setimageUpload(event.target.files[0]); }} />
      {imageList.map((URL) => (
        <img src={URL} key={URL} alt="Uploaded" />
      ))}
      <button onClick={uploadImage}>submit</button>
      <Home img={imageList} />
    </div>
  );
}

export default Items;
