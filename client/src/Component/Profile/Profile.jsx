import React, { useState } from "react";

export default function Profile() {
  // const [fName, setFName] = useState("");
  // const [lName, setLName] = useState("");
  // const [companyName, setCompanyName] = useState("");
  // const [collegeName, setCollegeName] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  // const [gender, setGender] = useState("");
  // const [contactNumber, setContactNumber] = useState("");
  // const [address, setAddress] = useState("");
  const [profile, setProfile] = useState({
    fName: "",
    lName: "",
    companyName: "",
    collegeName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    address: "",
  });

  function handleChange (e)
  {
      const {name , value} = e.target
      
      setProfile({
          ...profile,
          [name] : value
      })
  }
  const ModifyProfile = (e) => {
    console.log(JSON.stringify(profile));
    alert(
      JSON.stringify(profile)
    );
    e.preventDefault();
    const url = 'http://localhost:5000/modifyProfile';
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(profile)

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
                name = "fName"
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
                name = "lName"
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
                name = "companyName"
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
                name = "collegeName"
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
                name = "dateOfBirth"
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
                name = "gender"
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
                name = "contactNumber"
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
                name = "address"
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
