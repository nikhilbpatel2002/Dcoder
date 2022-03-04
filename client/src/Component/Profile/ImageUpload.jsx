import React, { useState } from "react";
import { useEffect } from "react";
import Alert from "./Alert";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function ImageUpload(props) {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [img, setImg] = useState("");

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("something went wrong!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const res = await fetch("/images/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      setImg(data.imageUrl);
      props.setProfile({
        ...props.profile,
        imageUrl: data.imageUrl,
      });
      //props.setImg(data.imageUrl) ;
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setErrMsg("Something went wrong!");
    }
  };
  const handleClose = () =>  
  {
    setSuccessMsg("");
    setErrMsg("");
    closeModal( );
  }
  
  return (
    <div>
      <button className="btn " onClick={() => setOpen((o) => !o)}>
        {/* <img src={profile.imageurl} /> */}
        {props.profile.imageUrl ? <center>
              <img
                className=" m-3 "
                src={props.profile.imageUrl}
                alt="chosen"
                style={{ height: "300px", borderRadius: "50%", width: "300px" }}
              />
            </center> :
            <center>
            <img
              className=" m-3 "
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              alt="chosen"
              style={{ height: "300px", borderRadius: "50%", width: "300px" }}
            />
          </center>}
      </button>
      <Popup
        open={open}
        onClose={closeModal}
        modal
        style={{ borderRadius: "100px" }}
      >
        <div className="container">
          <center>
            <h1 className=" m-3 ">Profile Photo</h1>
          </center>
          <Alert msg={errMsg} type="danger" />
          <Alert msg={successMsg} type="success" />
          {!previewSource ? (
              props.profile.imageUrl ? <center>
              <img
                className=" m-3 "
                src={props.profile.imageUrl}
                alt="chosen"
                style={{ height: "300px", borderRadius: "50%", width: "300px" }}
              />
            </center> :
            <center>
            <img
              className=" m-3 "
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              alt="chosen"
              style={{ height: "300px", borderRadius: "50%", width: "300px" }}
            />
          </center>
          ) : (
            previewSource && (
              <center>
                <img
                  className=" m-3 "
                  src={previewSource}
                  alt="chosen"
                  style={{
                    height: "300px",
                    borderRadius: "50%",
                    width: "300px",
                  }}
                />
              </center>
            )
          )}

          <center>
            <form onSubmit={handleSubmitFile} className="form m-3">
              <div className="row">
                <div className="col-4">
                  <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                  />
                </div>
                <div className="col-4">
                  <button className="btn btn-outline-success" type="submit">
                    upload
                  </button>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleClose}
                  >
                    close
                  </button>
                </div>
              </div>
            </form>
          </center>
        </div>
      </Popup>
    </div>
  );
}
