import React, { useState } from 'react';
import Question from './Question/Question';
import QuestionList from './Question/QuestionList';
import QuestionWriter from './Question/QuestionWriter';
import QuestionEditor from './Question/QuestionEditor';
import { Editor, OriginalTools } from 'react-bootstrap-editor';
import EditorBox from './EditorBox' ; 

export default function Dummy(props) {
  const [text,setText] = useState('') ; 

  function handleChange (e) 
    {
      // const {name , value} = e.target
      // setText({
      //   [name] : value
      // })
      setText(e) ; 
      console.log(text);
      
  }

  
  return (
    <div className='container'>
      <QuestionEditor/>
    </div>
  ) ; 
}
