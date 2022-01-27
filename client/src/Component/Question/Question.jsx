import React, { useState, useEffect } from "react";
import axios  from "axios";
//challengeDifficulty, title , description , inputFormat , outputFormat , tags 
//  chenge -> render 
// reander -> useeffect
// reader -> useeffect -> usestate -> reader
export default function Question(props) {
  const [question,setQuestion]= useState([]);
  useEffect(()=> {
    axios.get("/question/"+props.id
    )
    .then(res => {
        console.log(res)
        setQuestion(res.data)
        console.log("hello dsf askld");
    })
    .catch(err => {
        console.log("error while retraving question \n" + err)
    })
},[])
  return (
    <>
      <div className="mt-4">
      <h1>{question.title}</h1>
      <hr />
      <div className="m-4">
        <div>
        {question.description}
        </div>
        <div className="mt-4">
          <h4>Input</h4>
          <div>{question.inputFormat}</div>
        </div>
        <div className="mt-4">
          <h4>Output</h4>
          <div>{question.outputFormat}</div>
        </div>
      </div>
      </div>
    </>
  );
}

/* 

*/

/* import React, { useState, useEffect } from "react";
import SchemeCard from "./SchemeCard";

export default function GovermentScheme() {
	const [posts,setPosts] = useState([])
    useEffect(()=> {
        axios.get("/schemes/fetchschemes")
        .then(res => {
            console.log(res)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
	return (
		<> 
		<div className="row text-center "  >
        
        <div className="my-5" style={{color:"white"}}>
        <h1> Goverment Schemes</h1>
        </div>
        {
        	posts.map(post => (
        		<SchemeCard href={post.pdfurl} title={post.title}/>
        		))
        }
			</div>
		</>
	)
}

SchemeCard.propType = {
  src: PropTypes.string,
  width: PropTypes.Number,
  alt: PropTypes.string,
  border: PropTypes.Number,
};
SchemeCard.defaultProps = {
  src: "https://agricoop.nic.in/sites/all/modules/customs/cmf_utility/icons/application-pdf.png",
  width: 16,
  alt: "pdf",
  border: 0,
};
 */
