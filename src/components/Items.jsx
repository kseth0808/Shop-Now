  import React, { useEffect, useState } from 'react';
  import { storage } from '../Firebase';
  import { getDownloadURL, listAll, ref, uploadBytes, updateMetadata, getMetadata, deleteObject } from 'firebase/storage';
  import { v4 as uuidv4 } from 'uuid';
  import Home from './Home';

  function Items(props) {
    const [imageUpload, setimageUpload] = useState();
    const [categoryInput, setCategoryInput] = useState('');
    const [imageList, setimageList] = useState([]);
    const imagesListRef = ref(storage, 'image/');

    const uploadImage = () => {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `image/${imageUpload.name + uuidv4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((URL) => {
          const category = categoryInput.trim();
          updateMetadata(snapshot.ref, { customMetadata: { category } })  
            .then(() => {
              setimageList((prev) => [...prev, { URL, category }]);
            })
            .catch((error) => {
              console.log('Error updating metadata:', error);
            });
        });
      });
    };

    const deleteImage = (image) => {
      const imageRef = ref(storage, image.URL);
      deleteObject(imageRef)
        .then(() => {
          setimageList((prev) => prev.filter((item) => item.URL !== image.URL));
        })
        .catch((error) => {
          console.log('Error deleting image:', error);
        });
    };

    useEffect(() => {
      listAll(imagesListRef)
        .then((response) => {
          setimageList([]);
          response.items.forEach((item) => {
            getDownloadURL(item)
              .then((URL) => {
                getMetadata(item)
                  .then((metadata) => {
                    const category = metadata?.customMetadata?.category || 'Your Category';
                    setimageList((prev) => [...prev, { URL, category }]);
                  })
                  .catch((error) => {
                    console.log('Error getting metadata:', error);
                  });
              });
          });
        })
        .catch((error) => {
          console.log('Error listing images:', error);
        });
    }, []);
    return (
      <div>
        <input type="file" onChange={(event) => { setimageUpload(event.target.files[0]); }} />
        <input
          type="text"
          value={categoryInput}
          onChange={(event) => { setCategoryInput(event.target.value); }}
          placeholder="Enter Category"
        />
        {imageList.map((image) => (
          <div key={image.URL}>
            <img src={image.URL} alt="Uploaded" />
            <p>Category: {image.category}</p>
            <button onClick={() => deleteImage(image)}>Delete</button>
          </div>
        ))}
        <button onClick={uploadImage}>submit</button>
        <button onClick={() =>{{props.imageTransfer(imageList)}}}>Submit</button>
        <Home/>
      </div>
    );
  }

  export default Items;
