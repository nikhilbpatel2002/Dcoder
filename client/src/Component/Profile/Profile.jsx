import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./Style.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

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
    imageUrl:
      "",
  });
  const [img, setImg] = useState(
    ""
  );
  var curr = new Date();
  var date;
  let [flag,setFlag] = useState(true);
  useEffect(() => {
    axios
      .get("/modifyProfile/" + JSON.parse(localStorage.getItem("user"))._id)
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
        curr.setDate(profile.dateOfBirth);
        date = curr.toISOString().substr(0, 10);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);
  function handleChange(e) {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
    console.log(JSON.stringify(profile));
  }
  const ModifyProfile = async (e) => {
    console.log(JSON.stringify(profile));
    setProfile({ ...profile, imageUrl: img });
    e.preventDefault();
    let url = "http://localhost:5000/modifyProfile/";
    await axios.put(url, profile).then((res) => {
      console.log(res.data);
      setFlag(!flag)
      alert(res.data.message, "success");
    });
  };
  
  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="my-3 col-7 m-4 p-4 " style={{ color: "black" }}>
            <form>
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
                  defaultValue={date}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>

                <div
                  value={profile.gender}
                  name="gender"
                  onChange={handleChange}
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    value="MALE"
                    name="gender"
                    checked={profile.gender === "MALE"}
                  />
                  <label
                    class="form-check-label me-3"
                    for="flexRadioDefault1"
                    value="MALE"
                  >
                    Male
                  </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    value="FEMALE"
                    name="gender"
                    checked={profile.gender === "FEMALE"}
                  />{" "}
                  <label
                    class="form-check-label "
                    for="flexRadioDefault1"
                    value="FEMALE"
                  >
                    Female
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <PhoneInput
                  name="contactNumber"
                  placeholder="Enter phone number"
                  // className="form-control"
                  value={profile.contactNumber}
                  onChange={(value) => {
                    setProfile({ ...profile, contactNumber: value });
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
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
            </form>
          </div>
          <div className="my-3 col-2 m-4 p-4 " style={{ color: "black" }}>
           
            <ImageUpload profile={profile} setProfile={setProfile} />
            {/* <img src= "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"/> */}
            
          </div>
        </div>
      </div>
    </>
  );
}
