import React, { useState } from "react";
import EditorBox from '../EditorBox' ; 
// challengeDifficulty, title , description , inputFormat , outputFormat , tags , testcase
// props reuse
//
export default function QuestionWriter() {
  const [question, setQuestion] = useState({
    challengeDifficulty: "",
    title: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    tags: [],
  });
  const checkBoxOptions = [
    { key: "Select an option", value: "" },
    { key: "Binary Search", value: "binary search" },
    { key: "dynamic programming", value: "dynamic programming" },
    { key: "BFS", value: "BFS" },
    { key: "Graph", value: "Graph" },
    { key: "Tree", value: "Tree" },
    { key: "", value: "" }
  ];

  function handleChange(e) {
    const { name, value } = e.target;

    setQuestion({
      ...question,
      [name]: value,
    });

    console.log(question);
  }

  const ModifyProfile = (e) => {
    console.log(question);
    e.preventDefault();
    const url = "http://localhost:5000/question/questionWriter";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(question),
    })
      .then(() => alert("Question Added successfuly"))
      .catch((err) => console.log("error : " + err));
  };

  return (
    <>
      <div className="container ">
        <div className="my-3 col-8 m-4 p-4 " style={{ color: "black" }}>
          <form>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Difficulty Level
              </label>
              <select
                className="form-select"
                name="challengeDifficulty"
                value={question.challengeDifficulty}
                aria-label="Default select example"
                onChange={handleChange}
                required
              >
                <option selected>Open this select menu</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="advance">Advance</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                id="title"
                aria-describedby="Title"
                value={question.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={question.description}
                id="description"
                aria-describedby="Title"
                onChange={handleChange}
              />
               {/* <EditorBox setText = {handleChange}/> */}
            </div>
            <div className="mb-3">
              <label className="form-label">Input Format</label>
              <input
                type="text"
                name="inputFormat"
                value={question.inputFormat}
                className="form-control"
                id="inputFormat"
                aria-describedby="Title"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Output Format</label>
              <input
                type="text"
                name="outputFormat"
                value={question.outputFormat}
                className="form-control"
                id="outputFormat"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tags</label>
              <input
                type="checkbox  "
                name="tags"
                value={question.tags}
                className="form-control"
                id="tags"
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
