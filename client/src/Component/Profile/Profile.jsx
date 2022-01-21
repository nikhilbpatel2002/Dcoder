import React, { useState } from "react";

export default function Profile() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
//   const [profile, setProfile] = useState({
//     fName: "",
//     lName: "",
//     companyName: "",
//     collegeName: "",
//     dateOfBirth: "",
//     gender: "",
//     contactNumber: "",
//     address: "",
//   });

  const ModifyProfile = (e) => {
    console.log(JSON.stringify({
      fName,
      lName,
      companyName,
      collegeName,
      dateOfBirth,
      gender,
      contactNumber,
      address,
    }));
    alert(
      JSON.stringify({
        fName,
        lName,
        companyName,
        collegeName,
        dateOfBirth,
        gender,
        contactNumber,
        address,
      })
    );
    e.preventDefault();
    const url = 'http://localhost:5000/modifyProfile';
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({fName,lName,companyName,collegeName,dateOfBirth,gender,contactNumber,address })

        })
            .then(() => alert("profile modify successfuly") )
            .catch(err => console.log('error : ' + err));
  };
  return (
    <>
      <div className="container "> 
        <div className="my-3 col-8 m-4 p-4 " style={{ color: "black" }}>
          <form>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="First Name"
                aria-describedby="Title"
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="Last Name"
                aria-describedby="Title"
                onChange={(e) => setLName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="Company Name"
                aria-describedby="Title"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">College Name</label>
              <input
                type="text"
                className="form-control"
                id="College Name"
                aria-describedby="Title"
                onChange={(e) => setCollegeName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="Date"
                className="form-control"
                id="Date of Birth"
                aria-describedby="Date"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <input
                type="text"
                className="form-control"
                id="Gender"
                aria-describedby="Title"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                className="form-control"
                id="Contact Number"
                aria-describedby="Title"
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="Address"
                aria-describedby="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={ModifyProfile}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
