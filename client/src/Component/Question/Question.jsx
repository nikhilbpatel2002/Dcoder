import React, { useState, useEffect } from "react";
import axios from "axios";
//challengeDifficulty, title , description , inputFormat , outputFormat , tags
//  chenge -> render
// reander -> useeffect
// reader -> useeffect -> usestate -> reader
export default function Question(props) {
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    axios
      .get("/question/" + props.id)
      .then((res) => {
        console.log(res);
        setQuestion(res.data);
        console.log("hello dsf askld");
      })
      .catch((err) => {
        console.log("error while retraving question \n" + err);
      });
  }, []);
  function printTag(tags) {
    // const str = "";
    // for (let index = 0; index < tags.length; index++) {
    //   const element = tags[index];
    //   str += element ;
    //   str += ", " ;
    // }
    console.log("tags prined" + tags);
    return tags[0];
  }
  return (
    <>
      <div className="mt-4">
        
        <h1 className="mx-4">{question.title}</h1>
        <hr />
        <div className="m-4">
          <div>
            {/* {question.description} */}
            <div dangerouslySetInnerHTML={{ __html: question.description }} />
          </div>
          <div className="mt-4">
            <h4>Input Format</h4>
            <div dangerouslySetInnerHTML={{ __html: question.inputFormat }} />
          </div>
          <div className="mt-4">
            <h4>Output Format</h4>
            <div dangerouslySetInnerHTML={{ __html: question.outputFormat }} />
          </div>
          <div className="mt-4">
            <h4>Sample Input</h4>
            <div dangerouslySetInnerHTML={{ __html: question.sampleInput }} />
          </div>
          <div className="mt-4">
            <h4>Sample Output</h4>
            <div dangerouslySetInnerHTML={{ __html: question.sampleOutput }} />
          </div>
          <div className="my-3">
            <h4> Tags </h4>
            <div>{question.tags}</div>
            {/* <div>{printTag(question.tags)}</div> */}
            <div>
              <table>
                <tr>
                  {/* {question.tags.map((tag,index) => (
                  <td key={tag} >
                    {tag},
                  </td>
                ))} */}
                  {/* {question.tags.map((tag,index) => return <span key={}>HashMap </span>)} */}
                  {/* {question.tags.map((tag) => {
                    return  <span key={tag} className="badge bg-light text-dark">{tag}</span>
                  })} */}
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* 
{questions.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.challengeDifficulty}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    history.push("/question/" + item._id);
                  }}
                  id={item._id}
                >
                  Read
                </button>
              </td>
            </tr>
          ))}
 */
