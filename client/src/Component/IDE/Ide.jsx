import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import languages from "./Language";

export default function Ide(props) {
  let [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  let [language, setLanguage] = useState("c");
  let [saveFileName, setSaveFileName] = useState("");
  const [codeId, setCodeId] = useState("");

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
  useEffect(() => {
    console.log(props.codeId);
    if (props.codeId != "") {
      let url = "http://localhost:5000/code/getCode/" + props.codeId;
      axios
        .get(url)
        .then((res) => {
          console.log(res);
          setCode(res.data.code);
          setLanguage(res.data.language);
          setCodeId(props.codeId);
          setSaveFileName(res.data.fileName);
          console.log("hello dsf askld");
        })
        .catch((err) => {
          console.log("error while retraving code \n" + err);
        });
    }
  }, []);
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
  const handleSave = async () => {
    navigator.clipboard.writeText(code);
    let text = "";
    if (saveFileName == null || saveFileName == "") {
      let fileName = prompt(" Enter file name:", "fileName");
      if (fileName == null || fileName == "") {
        text = "File name can't be blank!";
        alert(text, "success");
      } else {
        setSaveFileName(fileName);
        // e.preventDefault();
        console.log("language", language);
        await axios
          .post("http://localhost:5000/code/savecode", {
            code: code,
            fileName: fileName,
            language: language,
          })
          .then((res) => {
            // console.log(res.data);
            let tempid = res.data.id;
            setCodeId(tempid);
            console.log("codeid " + tempid);
            alert(res.data.message, "success");
          });
      }
    } else {
      // alert(codeId+" " + saveFileName) ;
      console.log(codeId + " " + saveFileName);
      let url = "http://localhost:5000/code/updatecode/" + codeId;
      await axios
        .put(url, {
          code: code,
          fileName: saveFileName,
          language: language,
        })
        .then((res) => {
          console.log(res.data);
          text = "File updated successfully!";
          // alert(text + " " +res.data.id, "success");
          alert(res.data.message, "success");
        });
    }
    // alert(text, "success");
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
  let showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setCode(text);
      console.log(code);
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
            <div className="col-3"></div>
            <div className="col-3">
              <div className="row">
                <div className="col-2 "></div>
                <div className="col-2  pt-3">
                  <i
                    onClick={downloadTxtFile}
                    className="fa    fa-download"
                    style={{ fontSize: "24px", color: "white" }}
                  ></i>
                </div>
                <div className="col-2">
                  <label for="files" className="btn">
                    <i
                      className="fa   pt-2  fa-upload"
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

                <div className="col-3">
                  <a onClick={handleCopy} style={{ cursor: "pointer" }}>
                    <i
                      className="fa fa-copy mx-4   pt-3 "
                      style={{ fontSize: "24px", color: "white" }}
                    />
                  </a>
                </div>
                <div className="col-3">
                  <a onClick={handleSave} style={{ cursor: "pointer" }}>
                    <i
                      className="fa fa-save mx-4   pt-3 "
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
            height="77vh"
            defaultLanguage={language[0]}
            defaultValue=""
            theme="Pastels-on-Dark"
            onChange={handleEditorChange}
            value={code}
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
            {/* <div className="col "> */}
            <div className="col">
              <div className="row">
                <div className="col-4 "></div>
                <div className="col-2 pt-2">
                  <i
                    onClick={downloadTxtFile}
                    className="fa    fa-download"
                    style={{ fontSize: "24px", color: "white" }}
                  ></i>
                </div>
                <div className="col-3">
                  <label for="files" className="btn">
                    <i
                      className="fa  fa-upload"
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

                <div className="col-3  pt-2">
                  <a onClick={handleCopy} style={{ cursor: "pointer" }}>
                    <i
                      className="fa fa-copy "
                      style={{ fontSize: "24px", color: "white" }}
                    />
                  </a>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
          <Editor
            height="34vh"
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
              <div className="row">
                <div className="col-7 "></div>
                <div className="col-2 pt-2">
                  <i
                    onClick={downloadTxtFile}
                    className="fa    fa-download"
                    style={{ fontSize: "24px", color: "white" }}
                  ></i>
                </div>

                <div className="col-3  pt-2">
                  <a onClick={handleCopy} style={{ cursor: "pointer" }}>
                    <i
                      className="fa fa-copy "
                      style={{ fontSize: "24px", color: "white" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Editor
            height="35vh"
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
