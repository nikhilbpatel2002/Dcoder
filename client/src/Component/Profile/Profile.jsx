import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Style.css";

export default function Profile() {
  const [profile, setProfile] = useState({
    userId: "",
    fName: "",
    lName: "",
    companyName: "",
    collegeName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    address: "",
    image:""
  });
  var date  ;
  useEffect(() => {
    axios
      .get("/modifyProfile/" + JSON.parse(localStorage.getItem("user"))._id)
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
        date = new Date(profile.dateOfBirth);
        date = date.toISOString().substr(0,10);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handleChange(e) {
    const { name, value } = e.target;
    console.log(JSON.stringify(profile));
    setProfile({
      ...profile,
      [name]: value,
    });
  }
  const ModifyProfile = async (e) => {
    console.log(JSON.stringify(profile));
    e.preventDefault();
    let url = "http://localhost:5000/modifyProfile/";
    await axios.put(url, profile).then((res) => {
      console.log(res.data);
      alert(res.data.message, "success");
    });
  };
  /* 
  const handleSubmit = (e) => {
    question.tags = Array.from(tempTags.values());
    console.log(question);
    e.preventDefault();
    // const url = "http://localhost:5000/question/questionWriter";
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(question),
    const url = "http://localhost:5000/question/questionEditor/" + props.id;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(question),
    })
      .then((res) =>(alert("Question Updated successfully.")))
      .catch((err) => console.log("error : " + err));
  };
  let url = "http://localhost:5000/code/updatecode/" + codeId;
      await axios
        .put(url, {
          code: code,
          fileName: saveFileName,
          language: language,
        })
        .then((res) => {
          console.log(res.data);
          text = "File updated successfully!";
          // alert(text + " " +res.data.id, "success");
          alert(res.data.message, "success");
        });
  */
  return (
    <>
      <div className="container ">
        <form>
          <div className="row">
            <div className="my-3 col-7 m-4 p-4 " style={{ color: "black" }}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="First Name"
                  name="fName"
                  value={profile.fName}
                  aria-describedby="Title"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Last Name"
                  name="lName"
                  value={profile.lName}
                  aria-describedby="Title"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Company Name"
                  name="companyName"
                  value={profile.companyName}
                  aria-describedby="Title"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">College Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="College Name"
                  name="collegeName"
                  value={profile.collegeName}
                  aria-describedby="Title"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="Date"
                  className="form-control"
                  id="Date of Birth"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  aria-describedby="Date"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  id="Gender"
                  name="gender"
                  value={profile.gender}
                  aria-describedby="Title"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="Contact Number"
                  name="contactNumber"
                  value={profile.contactNumber}
                  aria-describedby="Title"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="Address"
                  name="address"
                  value={profile.address}
                  aria-describedby="Address"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={ModifyProfile}
              >
                Save
              </button>
            </div>
            <div className="my-3 col-2 m-4 p-4 " style={{ color: "black" }}>
              <div className="circle">
                <div>
                  <label for="fileField">
                    <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
                  </label>

                  <input
                    type="file"
                    id="fileField"
                    name="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    // onChange={}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
