import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import languages from "./Language";

export default function MyCode() {
  const [language, setLanguage] = useState(["All", "all"]);
  const [flag, setFlag] = useState(false);
  const [myCode, setMyCode] = useState([]);
  let history = useHistory();
  useEffect(() => {
    
      let url = "http://localhost:5000/code/codeList/" + language[1];
      const user = JSON.parse(localStorage.getItem('user')) ;
      axios
        .post(url,user)
        .then((res) => {
          console.log(res);
          setMyCode(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    
  }, [language, flag]);
  function handleDelete(e) {
    const confirmBox = window.confirm(
      "Do you really want to delete this Code?"
    );
    if (confirmBox === true) {
      console.log(e.target.id);
      let url = "http://localhost:5000/code/deleteCode/" + e.target.id;
      axios
        .delete(url)
        .then((res) => {
          alert(res.data.message);
          setFlag(!flag);
        })
        .catch((err) => {
          alert(err.data);
        });
    }
  }
  function handleCopy(e) {
    console.log(e.target.id );
    navigator.clipboard.writeText("http://localhost:3000/code/" + e.target.id);
    alert("Copied to Clipboard!", "success");
  };
  return (
    <div className="m-4 ">
      <div className="m-2">
        <button
          type="button"
          className={
            language[1] == "all"
              ? "btn btn-primary m-2"
              : "btn btn-outline-primary m-2"
          }
          onClick={() => {
            setLanguage(["All", "all"]);
          }}
        >
          All
        </button>
        {languages.map((item) => (
          <button
            type="button"
            className={
              language[1] == item[1]
                ? "btn btn-primary m-2"
                : "btn btn-outline-primary m-2"
            }
            onClick={() => {
              setLanguage(item);
            }}
            id={item._id}
          >
            {item[0]}
          </button>
        ))}
      </div>
      <div className=" border border-2 m-3 p-2 rounded">
        <table
          className="table table-striped "
          style={{ backgroundColor: "white" }}
        >
          <thead>
            <tr
              className="my-5"
              style={{ backgroundColor: "#736e6e", color: "white" }}
            >
              <th scope="col">#</th>
              <th scope="col">File Name</th>
              <th scope="col">Language</th>
              <th scope="col">View</th>
              <th scope="col">Delete</th>
              <th scope="col">Share</th>
            </tr>
          </thead>
          <tbody>
            {myCode.map((item, index) => (
              <tr key={index}>
                <td>{index + 1} </td>
                <td>{item.fileName}</td>
                <td>{item.language}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    id={item._id}
                    onClick={() => {
                      history.push("/ide/" + item._id);
                    }}
                  >
                    {/* View */}
                    <a style={{ cursor: "pointer" }}>
                      <i className="fa fa-edit " style={{ fontSize: "24px" }} />
                    </a>
                  </button>
                </td>
                <td>
                  <button
                    id={item._id}
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handleDelete}
                  >
                    {/* Delete */}
                    <a style={{ cursor: "pointer" }}>
                      <i
                        className="fa fa-remove "
                        style={{ fontSize: "24px" }}
                      />
                    </a>
                  </button>
                </td>
                <td>
                  <button
                    id={item._id}
                    onClick={handleCopy}
                    className="btn btn-outline-primary"
                  >
                    <a style={{ cursor: "pointer" }}  >
                      <i
                        className="fa fa-share "
                        style={{ fontSize: "24px" }}
                        
                      />
                    </a>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
