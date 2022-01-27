import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios
      .get("/question/questionList/")
      .then((res) => {
        console.log(res);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const goToBlog = (e) => {
    history.push("/question/" + e.id);
  };

  return (
    <>
      <table className="table table-hover" style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Read Question</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    history.push("/question/" + item._id);
                  }}
                  id={item._id}
                >
                  Read 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* 

export default function BlogTable(props) {
  const [posts, setPosts] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios
      .get("/education/data/" + props.name)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const goToBlog = (e) => {
    history.push("/blog/" + e.id);
  };

  return (
    <>
      <table className="table table-hover" style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Read Blog</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    history.push("/blog/" + item._id);
                  }}
                  id={item._id}
                >
                  Read Blog
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
 */


/*  */