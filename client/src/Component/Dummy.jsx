// import React from "react";
// import ReactDOM from "react-dom";

// import Editor from "@monaco-editor/react";
// import { useState } from "react";

// export default function Dummy() {
//   const [code,setCode] = useState('');
//   function handleRun() {

//   }
//   function handleEditorChange(value, event) {
//     // here is the current value
//     setCode(value);
//   }

//   function handleEditorDidMount(editor, monaco) {
//     console.log("onMount: the editor instance:", editor);
//     console.log("onMount: the monaco instance:", monaco);
//   }

//   function handleEditorWillMount(monaco) {
//     console.log("beforeMount: the monaco instance:", monaco);
//   }

//   function handleEditorValidation(markers) {
//     // model markers
//     // markers.forEach(marker => console.log('onValidate:', marker.message));
//   }

//   return (
//     <div className="row bg-dark" style={{height:"95vh"}}>
//       <div className="col-8  border border-2  p-2 rounded  border  bg-dark">
//         <Editor
//           height="50%"
//           defaultLanguage="C++"
//           defaultValue="// some comment"
//           theme="vs-dark"
//           onChange={handleEditorChange}
//           onMount={handleEditorDidMount}
//           beforeMount={handleEditorWillMount}
//           onValidate={handleEditorValidation}
//         />
//       </div>

//       {/* <div className="col">
//         <div
//           className="border border-2 rounded m-2"
//           // style={{ height: "45%", color: "white" }}
//         >
//           <Editor
//             height="43vh"
//             defaultLanguage="C++"
//             defaultValue="// some comment"
//             theme="vs-dark"
//             onChange={handleEditorChange}
//             onMount={handleEditorDidMount}
//             beforeMount={handleEditorWillMount}
//             onValidate={handleEditorValidation}
//           />
//         </div>

//         <div
//           className="border border-2 rounded m-2"
//           // style={{ height: "45%", color: "white" }}
//         >
//           <Editor
//             height="43vh"
//             defaultLanguage="C++"
//             defaultValue="// some comment"
//             theme="vs-dark"
//             onChange={handleEditorChange}
//             onMount={handleEditorDidMount}
//             beforeMount={handleEditorWillMount}
//             onValidate={handleEditorValidation}
//           />
//         </div>
//       </div> */}
//     </div>
//   );
// }

import React from "react";
import blist from "./boostrapicon";
export default function Dummy() {
  return (
    <>
      {blist.map((item, index) => (
        <span className="m-3">
          <a /* style={{ cursor: "pointer" }} */>
            <i className={item} style={{ fontSize: "24px" }} />
          </a>
        </span>
      ))}
    </>
  );
}
