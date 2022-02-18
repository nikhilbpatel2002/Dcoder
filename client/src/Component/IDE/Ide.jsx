import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import languages from "./Language";

export default function Ide() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  let [language, setLanguage] = useState("c");

  function handleRun(e) {
    e.preventDefault();
    console.log("language", language);
    axios
      .post("http://localhost:5000/ide/", {
        code: code,
        input: input,
        language: language,
      })
      .then((res) => {
        console.log(res.data);
        setOutput(res.data.output);
      });
  }

  function handleEditorChange(value, event) {
    // here is the current value
    setCode(value);
  }

  function handleInputChange(value, event) {
    // here is the current value
    setInput(value);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("Copied to Clipboard!", "success");
  };

  return (
    <div className="row bg-dark px-4" style={{ height: "95vh" }}>
      <div className="col-8">
        <div className="  border border-2 m-2 p-2 rounded  border  bg-dark">
          <div className="row">
            <div className="col-4 ">
              <select
                className="form-select bg-dark "
                aria-label="Default select example"
                style={{ color: "white" }}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  console.log( "onchange" ,e.target.value);
                }}
              >
                {languages.map((item, index) => (
                  <option value={item[1]}  key={index}>
                    {item[0]}
                  </option>
                ))}
              </select>
            </div>
            <div className=" col m-2 d-md-flex justify-content-md-end">
              <a onClick={handleCopy} style={{ cursor: "pointer" }}>
                <i
                  className="fa fa-copy "
                  style={{ fontSize: "24px", color: "white" }}
                />
              </a>
            </div>
          </div>
          <Editor
            height="70vh"
            defaultLanguage={language[0]}
            defaultValue=""
            theme="vs-dark"
            onChange={handleEditorChange}
          />
          <div className="mx-3 d-md-flex justify-content-md-end">
            <button
              type="submit"
              className="btn btn-outline-primary my-3 "
              onClick={handleRun}
            >
              Run
            </button>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div
          className="border border-2 rounded my-2 "
          // style={{ height: "45%", color: "white" }}
        >
          <h5 className="mx-4" style={{ color: "white" }}>
            Input
          </h5>
          <Editor
            height="38vh"
            defaultLanguage="C++"
            defaultValue=""
            theme="vs-dark"
            onChange={handleInputChange}
          />
        </div>

        <div
          className="border border-2 rounded my-2"
          // style={{ height: "45%", color: "white" }}
        >
          <h5 className="mx-4" style={{ color: "white" }}>
            Output
          </h5>
          <Editor
            height="38vh"
            defaultLanguage="C++"
            defaultValue={output}
            value={output}
            theme="vs-dark"
            // onChange={handleOutputChange}
          />
        </div>
      </div>
    </div>
  );
}
