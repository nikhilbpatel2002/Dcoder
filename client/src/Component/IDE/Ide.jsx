import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function Ide() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  function handleRun(e) {
    e.preventDefault();
    // const url = "http://localhost:5000/ide/" ;
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({code}),
    // })
    //   .then((res) =>(console.log(res.data.message)))
    //   .catch((err) => console.log("error : hell"));

    axios.post("http://localhost:5000/ide/", { code: code ,input:input}).then((res) => {
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
  // function handleOutputChange(value, event) {
  //   // here is the current value
  //   // setOutput(value);
  //   // event(output) ; 
    
  // }

  function handleEditorDidMount(editor, monaco) {
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco);
  }

  function handleEditorWillMount(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  return (
    <div className="row bg-dark px-4" style={{ height: "95vh" }}>
      <div className="col-8">
        <div className="  border border-2 m-2 p-2 rounded  border  bg-dark">
          <Editor
            height="75vh"
            defaultLanguage="C++"
            defaultValue="// write code here"
            theme="vs-dark"
            onChange={handleEditorChange}
          />
          <div className="mx-3 d-md-flex justify-content-md-end">
            <button
              type="submit"
              className="btn btn-primary my-3 "
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
