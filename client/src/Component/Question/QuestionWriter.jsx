import React, { useState } from "react";
import useForm from "react-hook-form";
import EditorBox from "../EditorBox";
import availableTags from "./Tags";
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
    tags: ["dp", "bs"],
  });

  const tempTags = new Map();

  function handleChange(e) {
    const { name, value } = e.target;

    setQuestion({
      ...question,
      [name]: value,
    });

    console.log(question);
  }

  function handleChangeTag(e) {
    const { name, value } = e.target;

    if (tempTags.has(name)) {
      tempTags.delete(name);
    } else {
      tempTags.set(name, value);
    }
  }

  const handleSubmit = (e) => {
    question.tags = Array.from(tempTags.values());
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
              
               <EditorBox name="description" setQuestion={setQuestion} question={question}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Input Format</label>
              <EditorBox name="inputFormat" setQuestion={setQuestion} question={question}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Output Format</label>
              <EditorBox name="outputFormat" setQuestion={setQuestion} question={question}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Sample Input</label>
              <EditorBox name="sampleInput" setQuestion={setQuestion} question={question}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Sample Output</label>
              <EditorBox name="sampleOutput" setQuestion={setQuestion} question={question}/>
            </div>
            <div className="mb-3 ">
              <label className="form-label">Tags</label>

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
            <br />

            <button
              type="submit"
              className="btn btn-primary my-3"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
