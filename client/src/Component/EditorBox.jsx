import React, { useState } from 'react';
import { Editor, OriginalTools } from 'react-bootstrap-editor';

export default function Dummy(props) {


  return (
      <div className='container border border-5 m-3 p-3 rounded'>
      <Editor
                name = 'text'
                tools={OriginalTools}
                value="<p>test</p>"
                onChange={props.setText}
            />
      {/* <div dangerouslySetInnerHTML={{ __html: text}} /> */}
      </div>
  ) ; 
}
