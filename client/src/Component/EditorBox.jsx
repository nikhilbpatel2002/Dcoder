import React from 'react';
import { Editor, OriginalTools } from 'react-bootstrap-editor';

export default function Dummy(props) {

  function handleChangeBox(e) {

    props.setQuestion({
      ...props.question,
      [props.name]: e,
    });

    console.log(props.question);
  }

  return (
      <div className='container border border-5 m-3 p-3 rounded'>
      <Editor
                // name ={props.name}
                tools={OriginalTools}
                // value="<p>test</p>"
                onChange={handleChangeBox }
            />
      {/* <div dangerouslySetInnerHTML={{ __html: text}} /> */}
      </div>
  ) ; 
}