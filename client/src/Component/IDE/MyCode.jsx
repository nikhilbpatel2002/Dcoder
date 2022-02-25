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
    let url = "http://localhost:5000/code/codeList/"+language[1]; 
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setMyCode(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [language,flag]);
  function handleDelete(e) {
    const confirmBox = window.confirm(
      "Do you really want to delete this Code?"
    );
    if (confirmBox === true) {
      console.log(e.target.id);
      let url = "http://localhost:5000/code/deleteCode/"+ e.target.id; 
      axios
        .delete(url)
        .then((res) => {
          alert(res.data.message)
          setFlag(!flag);
        })
        .catch((err) => {
          alert(err.data);
        });
        
    }
  }
  return (
    <div className="m-4">
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
                    View
                  </button>
                </td>
                <td>
                  <button
                    id={item._id}
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handleDelete}
                  >
                    Delete
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

/* 
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getImageUrl, getSiteUrl, getsite, sites, list } from "./Site";
import {
  dateToHumanReadable,
  secondToHumanReadable,
  getCalendarLink,
} from "./Time";
import "./style.css";
import { useHistory } from "react-router-dom";

export default function Contest() {
  const [contests, setContests] = useState([]);
  const [site, setSite] = useState(["All", "all"]);
  useEffect(() => {
    axios
      .get("https://www.kontests.net/api/v1/" + site[1])
      .then((res) => {
        console.log(sites);
        console.log(res);
        setContests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [site]);

  return (
    <div className="m-4">
      <div className="m-2">
        {list.map((item) => (
          <button
            type="button"
            className={
              site[1] == item[1]
                ? "btn btn-primary m-2"
                : "btn btn-outline-primary m-2"
            }
            onClick={() => {
              setSite(item);
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
              <th scope="col-4">Contest Name</th>
              <th scope="col">Site</th>
              <th scope="col"><center>Start Time</center></th>
              <th scope="col">Duration</th>
              <th scope="col">Add Reminder</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((item, index) => (
              //   <tr key={item.id} style = {item.status =="CODING" ? backgroundColor:"#8affb9" :backgroundColor:"white"}>

              <tr
                key={index}
                style={
                  item.status == "CODING"
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "white" }
                }
              >
                <td>{index + 1}</td>
                <td>
                  <a
                    className="link ml-1 "
                    style={{ textDecoration: "none", color: "#0808ff" }}
                    href={item.url}
                    target="_blank"
                  >
                    {item.name}
                  </a>
                </td>
                <td>
                  {site[1] == "all" ? (
                    <a href={getSiteUrl(item.site)}>
                      <img
                        src={getImageUrl(item.site)}
                        style={{ height: "5vh" }}
                        alt={getImageUrl(item.site)}
                        //   className="position-relative start-50  "
                      />
                    </a>
                  ) : (
                    <a href={getSiteUrl(site[0])}>
                      <img
                        src={getImageUrl(site[0])}
                        style={{ height: "5vh" }}
                        alt={getImageUrl(item.site)}
                        //   className="position-relative start-50  "
                      />
                    </a>
                  )}
                </td>
                <td className="col-2">
                  <center>{dateToHumanReadable(item.start_time)}</center>
                </td>
                <td>{secondToHumanReadable(item.duration)}</td>

                <td>
                  <center>
                    {item.status == "CODING" ? (
                      <span className="dot"></span>
                    ) : (
                      <a href={getCalendarLink(item)}>
                        <i
                          className="fa fa-calendar-plus-o "
                          style={{ fontSize: "24px" }}
                        />
                      </a>
                    )}
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

*/
