import { useState, useEffect } from "react";
import {
  ref,
  uploadBytesResumable,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./firebase.config";
//Referensi : https://firebase.google.com/docs/storage/web/upload-files
function App() {
  const [imageUpload, setImageUpload] = useState();
  const [imageList, setImageList] = useState([]);
  const [upSucces, setUpSucess] = useState(false);
  //Fetch all photos:
  useEffect(() => {
    handleGetFotos();
  }, []);
  const imagesRef = ref(storage, "images/");

  const handleGetFotos = async () => {
    setImageList([]);
    listAll(imagesRef).then((res) => {
      res.items.forEach((item, i) => {
        getDownloadURL(item).then((url) => {
          console.log("url: " + i, url);
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  };

  //Upload foto
  const handleUploadFoto = async (e) => {
    e.preventDefault();
    console.log("file: ", imageUpload);
    
    const imageRef = ref(storage, `images/${imageUpload.name + Date.now()}`);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);
    uploadTask.on("state_changed", (snap) => {
      console.log("snap",snap);
      if(snap.bytesTransferred==snap.totalBytes){
        console.log("done")
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      }
    });

    
  };

  return (
    <div>
      <form>
        <input
          type="file"
          onChange={(e) => setImageUpload(e.target.files[0])}
        />
        <button onClick={(e) => handleUploadFoto(e)}>Upload</button>
      </form>
      <div className="display">
        {imageList.map((image, i) => {
          return (
            <div key={i}>
              <h1>Sisksa</h1>
              <img src={image} width={100} height={100} />;
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
