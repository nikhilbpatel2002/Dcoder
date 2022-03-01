import React, { useState, useEffect } from "react";
import axios from "axios";
import availableTags from "./Tags";
import { useHistory } from "react-router-dom";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("all");
  const [flag, setFlag] = useState(false);
  const [tag, setTag] = useState("all");
  let history = useHistory();
  useEffect(() => {
    axios
      .get("/question/MyQuestionList/"+JSON.parse(localStorage.getItem('user'))._id+"/" + difficulty + "/" + tag)
      .then((res) => {
        console.log(res);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [difficulty, tag, flag]);

  // search by tags
  const tempTags = new Map();

  // const availableTags = ["Array" , "String" , "Hash Table" , "Dynamic Programming" , "Math" , "Depth-First Search" , "Sorting" , "Greedy" , "Breadth-First Search" , "Database" , "Tree" , "Binary Search" , "Matrix" , "Binary Tree" , "Two Pointers" , "Bit Manipulation" , "Stack" , "Design" , "Heap (Priority Queue)" , "Backtracking" , "Graph" , "Simulation" , "Prefix Sum" , "Sliding Window" , "Counting" , "Linked List" , "Union Find" , "Recursion" , "Monotonic Stack" , "Binary Search Tree" , "Trie" , "Ordered Set" , "Divide and Conquer" , "Bitmask" , "Queue" , "Geometry" , "Memoization" , "Enumeration" , "Game Theory" , "Topological Sort" , "Hash Function" , "Segment Tree" , "Interactive" , "Data Stream" , "Binary Indexed Tree" , "String Matching" , "Rolling Hash" , "Shortest Path" , "Randomized" , "Combinatorics" , "Monotonic Queue" , "Iterator" , "Concurrency" , "Number Theory" , "Merge Sort" , "Brainteaser" , "Probability and Statistics" , "Doubly-Linked List" , "Quickselect" , "Bucket Sort" , "Minimum Spanning Tree" , "Counting Sort" , "Suffix Array" , "Shell" , "Line Sweep" , "Reservoir Sampling" , "Eulerian Circuit" , "Strongly Connected Component" , "Radix Sort" , "Rejection Sampling" , "Biconnected Component"]

  function handleChangeTag(e) {
    const { name, value } = e.target;

    if (tempTags.has(name)) {
      tempTags.delete(name);
    } else {
      tempTags.set(name, value);
    }
  }
  function handleDelete(e) {
    const confirmBox = window.confirm(
      "Do you really want to delete this Question?"
    );
    if (confirmBox === true) {
      console.log(e.target.id);
      axios
        .delete("/question/" + e.target.id)
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
    <div className="container ">
      <div className="container  row">
        <form className="col-4 mt-4">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              <h4> Difficulty Level</h4>
            </label>
            <select
              className="form-select"
              name="challengeDifficulty"
              aria-label="Default select example"
              onChange={(e) => {
                setDifficulty(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="advance">Advance</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </form>
        <div className="col-3"></div>
        <form className="col-4 mt-4">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              <h4> Search by Tags</h4>
            </label>
            <select
              className="form-select"
              name="challengeDifficulty"
              aria-label="Default select example"
              onChange={(e) => {
                setTag(e.target.value);
              }}
            >
              <option value="all">All</option>
              {availableTags.map((value, index) => (
                <option value={value} key={index}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* <form className="col-4   mt-4" >
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
           <h4> Search by Tags</h4>
          </label>
          <div
                className="btn-group container overflow-scroll  border border-2 my-3 p-3 rounded"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                {availableTags.map((value, key) => (
                  <div key={key} className="m-1">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id={key}
                      name={key}
                      value={value}
                      autocomplete="off"
                      onChange={handleChangeTag}
                    />
                    <label className="btn btn-outline-primary  " for={key}>
                      {value}
                    </label>
                  </div>
                ))}
              </div>
        </div>
      </form> */}
      </div>
      <div className="container border border-2 m-3 p-2 rounded">
      <table className="table table-striped  " style={{ backgroundColor: "white" }}>
        <thead>
          <tr  style={{ backgroundColor: "#736e6e", color: "white" }}>
            <th scope="col">Title</th>
            <th scope="col">Difficulty Level</th>
            <th scope="col">Tags</th>
            <th scope="col">Read Question</th>
            <th scope="col">Edit Question</th>
            <th scope="col">Delete Question</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.challengeDifficulty}</td>
              <td>{item.tags.map((item)=>(
                <span>{item} , </span>
              ))}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => {
                    history.push("/question/" + item._id);
                  }}
                  id={item._id}
                >
                  Read
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    history.push("/question/editor/" + item._id);
                  }}
                  id={item._id}
                >
                  Edit
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


