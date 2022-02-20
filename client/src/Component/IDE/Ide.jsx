import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import  { useState, useEffect } from "react";
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
  // useEffect(() => {
  //   // setCode(code," ") ; 
  // }, [code]);

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

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([code], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile";
    document.body.appendChild(element);
    element.click();
  };

  let showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      // const hello = text ; 
      // console.log(hello);
      setCode(reader.result) ;
      console.log(code);
      // console.log(reader.result);
    };
    reader.readAsText(e.target.files[0]);
  };
  return (
    <div
      className="row  px-4"
      style={{ height: "95vh", backgroundColor: "#242526" }}
    >
      <div className="col-8 my-2">
        <div className="  border border-1 rounded ">
          <div className="row">
            <div className="col-4 my-1 mx-3">
              <select
                className="form-select border border-light m-1 rounded border-1 "
                aria-label="Default select example"
                style={{ color: "white", backgroundColor: "#242526" }}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  console.log("onchange", e.target.value);
                }}
              >
                {languages.map((item, index) => (
                  <option value={item[1]} key={index}>
                    {item[0]}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4"></div>
            <div className="col-2">
              <div className="row">
                <div className="col-4">
                  <i
                    onClick={downloadTxtFile}
                    className="fa  mx-3  pt-2  fa-download"
                    style={{ fontSize: "24px", color: "white" }}
                  ></i>
                </div>
                <div className="col-4">
                  <label for="files" className="btn">
                    <i
                      className="fa  mx-3 pt-2  fa-upload"
                      style={{ fontSize: "24px", color: "white" }}
                    ></i>
                  </label>
                  <input
                    id="files"
                    style={{ display: "none" }}
                    type="file"
                    onChange={showFile}
                  />
                </div>

                <div className="col-4">
                  <a onClick={handleCopy} style={{ cursor: "pointer" }}>
                    <i
                      className="fa fa-copy mx-4   pt-3 "
                      style={{ fontSize: "24px", color: "white" }}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className=" col m-2  d-md-flex justify-content-md-end">
              <button
                type="submit"
                className="btn btn-outline-light  "
                onClick={handleRun}
              >
                Run
              </button>
            </div>
          </div>
          <Editor
            height="78vh"
            defaultLanguage={language[0]}
            defaultValue=""
            theme="Pastels-on-Dark"
            onChange={handleEditorChange}
          />
          {/* <div className="mx-3 d-md-flex justify-content-md-end">
            <button
              type="submit"
              className="btn btn-outline-light my-3 "
              onClick={handleRun}
            >
              Run
            </button>
          </div> */}
        </div>
      </div>
      <div className="col-4 p-0">
        <div
          className="border border-1 rounded my-2 "
          // style={{ height: "45%", color: "white" }}
        >
          <div className="row m-1">
            <div className="col">
              <h5 className=" " style={{ color: "white" }}>
                Input
              </h5>
            </div>
            <div className="col ">
              <a
                onClick={handleCopy}
                style={{ cursor: "pointer" }}
                className="d-md-flex justify-content-md-end"
              >
                <i
                  className="fa fa-copy "
                  style={{ fontSize: "24px", color: "white" }}
                />
              </a>
            </div>
          </div>
          <Editor
            height="36vh"
            defaultLanguage="C++"
            defaultValue=""
            theme="vs-dark"
            onChange={handleInputChange}
          />
        </div>

        <div
          className="border border-1 rounded my-2"
          // style={{ height: "45%", color: "white" }}
        >
          <div className="row m-1">
            <div className="col">
              <h5 className=" " style={{ color: "white" }}>
                Output
              </h5>
            </div>
            <div className="col ">
              <a
                onClick={handleCopy}
                style={{ cursor: "pointer" }}
                className="d-md-flex justify-content-md-end"
              >
                <i
                  className="fa fa-copy "
                  style={{ fontSize: "24px", color: "white" }}
                />
              </a>
            </div>
          </div>
          <Editor
            height="36vh"
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
