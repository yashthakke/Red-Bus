import React, { lazy, useState } from 'react'
import { useForm } from 'react-hook-form';

export const Game = () => {

 const quizapp = [
  {
    question: "What is React primarily used for?",
    option1: "Building user interfaces",
    option2: "Creating databases",
    option3: "Server-side scripting",
    option4: "Machine learning",
    answer: "Building user interfaces"
  },
  {
    question: "Who developed React?",
    option1: "Google",
    option2: "Facebook",
    option3: "Microsoft",
    option4: "Apple",
    answer: "Facebook"
  },
  {
    question: "What is JSX in React?",
    option1: "A CSS framework",
    option2: "A syntax extension for JavaScript",
    option3: "A database query language",
    option4: "A testing tool",
    answer: "A syntax extension for JavaScript"
  },
  {
    question: "Which method is used to update state in a React class component?",
    option1: "setState()",
    option2: "updateState()",
    option3: "changeState()",
    option4: "modifyState()",
    answer: "setState()"
  },
  {
    question: "What does the useState hook do in React?",
    option1: "Manages local component state",
    option2: "Handles routing",
    option3: "Connects to databases",
    option4: "Optimizes performance",
    answer: "Manages local component state"
  },
  {
    question: "Which lifecycle method runs when a component is first rendered?",
    option1: "componentDidMount",
    option2: "componentDidUpdate",
    option3: "componentWillUnmount",
    option4: "render",
    answer: "componentDidMount"
  },
  {
    question: "What is the main purpose of props in React?",
    option1: "Passing data to child components",
    option2: "Defining styles",
    option3: "Handling user authentication",
    option4: "Managing API requests",
    answer: "Passing data to child components"
  },
  {
    question: "Which React hook is used for side effects?",
    option1: "useEffect",
    option2: "useState",
    option3: "useContext",
    option4: "useReducer",
    answer: "useEffect"
  },
  // {
  //   question: "What is the virtual DOM in React?",
  //   option1: "A lightweight copy of the real DOM",
  //   option2: "A database storage system",
  //   option3: "A CSS rendering engine",
  //   option4: "A JavaScript compiler",
  //   answer: "A lightweight copy of the real DOM"
  // },
  // {
  //   question: "Which command is used to create a new React app using Create React App?",
  //   option1: "npm create react-app",
  //   option2: "npx create-react-app",
  //   option3: "yarn new react-app",
  //   option4: "node react-init",
  //   answer: "npx create-react-app"
  // },
  // {
  //   question: "What does useContext help with in React?",
  //   option1: "State management",
  //   option2: "Handling authentication",
  //   option3: "Managing effects",
  //   option4: "DOM manipulation",
  //   answer: "State management"
  // },
  // {
  //   question: "Which React component type does not maintain internal state?",
  //   option1: "Class components",
  //   option2: "Functional components",
  //   option3: "Stateful components",
  //   option4: "Smart components",
  //   answer: "Functional components"
  // },
  // {
  //   question: "What file is typically edited to customize a React app's main entry point?",
  //   option1: "index.js",
  //   option2: "App.js",
  //   option3: "main.js",
  //   option4: "server.js",
  //   answer: "index.js"
  // },
  // {
  //   question: "Which React feature is used to handle conditional rendering?",
  //   option1: "if-else statements",
  //   option2: "ternary operators",
  //   option3: "switch-case",
  //   option4: "All of the above",
  //   answer: "All of the above"
  // },
  // {
  //   question: "How can you prevent unnecessary re-renders in a functional React component?",
  //   option1: "useMemo",
  //   option2: "useEffect",
  //   option3: "useState",
  //   option4: "useReducer",
  //   answer: "useMemo"
  // },
  // {
  //   question: "Which hook allows managing complex state logic in React?",
  //   option1: "useState",
  //   option2: "useReducer",
  //   option3: "useEffect",
  //   option4: "useRef",
  //   answer: "useReducer"
  // },
  // {
  //   question: "What is React Router used for?",
  //   option1: "Handling navigation and routing",
  //   option2: "Managing component styling",
  //   option3: "Optimizing performance",
  //   option4: "Connecting to databases",
  //   answer: "Handling navigation and routing"
  // },
  // {
  //   question: "What does React.Fragment do?",
  //   option1: "Groups elements without adding an extra DOM node",
  //   option2: "Handles animations",
  //   option3: "Manages API calls",
  //   option4: "Creates new components",
  //   answer: "Groups elements without adding an extra DOM node"
  // },
  // {
  //   question: "What does the useRef hook help with?",
  //   option1: "Accessing DOM elements",
  //   option2: "Managing global state",
  //   option3: "Handling API requests",
  //   option4: "Creating new components",
  //   answer: "Accessing DOM elements"
  // },
  // {
  //   question: "Which React function helps optimize performance by memoizing results?",
  //   option1: "React.memo",
  //   option2: "useMemo",
  //   option3: "useEffect",
  //   option4: "useCallback",
  //   answer: "React.memo"
  // }
];



  
  const [currentIndex, setCurrentIndex] = useState(0);//use state to store  current data api or json 
  const currentQuestion = quizapp[currentIndex]; 
  const [submit, setsubmit] = useState(false)
  const [score, setScore] = useState(0);//to count current score or toal
  const [previewMode, setPreviewMode] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionClick = (option) => {
    setSelectedOptions({...selectedOptions,
      [currentIndex]: option,
    });
  };


  
   
  const nexthandle = () => {
    if (currentIndex < quizapp.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previuoshandle = ()=>{
    if(currentIndex > 0) {
       setCurrentIndex(currentIndex - 1);
    }

    }

   const submithandle = () => {
  if (currentIndex === quizapp.length - 1) {
    let count = 0;

    quizapp.forEach((question, index) => {
      if (selectedOptions[index] === question.answer) {
        count++;
      }
    });

    setScore(count);
    setsubmit(true);
  }
};

  


  return (

    
    <div style={{textAlign:'center'}}>

      <h1 >Quiz App</h1>

      <h2>Question    {currentIndex+1}    {currentQuestion.question}   </h2>
     <ul>
  {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((option, index) => 
  (
    <li     onClick={() => handleOptionClick(option)}
      style={{ 
        border: '1px solid #ccc', 
        margin: '8px auto', 
        padding: '10px', 
        width: '300px',
        cursor: 'pointer',
        borderRadius: '5px',
        listStyle:'none',
          backgroundColor: selectedOptions[currentIndex] === option ? 'green' : 'white',

        
      }}
      

    
    >
      {option}
    </li>
  ))}
</ul>

    <div>
      <button onClick={()=>previuoshandle()} disabled={currentIndex==0}>Previuos</button>

       {currentIndex < quizapp.length - 1 ? (
              <button onClick={nexthandle} style={{ marginLeft: 10 }}>
                Next
              </button>
            ) : (
              <button onClick={handlePreview} style={{ marginLeft: 10 }}>
                                👀 Preview Answers

              </button>
            )}

            {previewMode && !submitted && (
  <div className="card p-4">
    <h4 className="text-center">Preview Your Answers</h4>
    <ul className="list-group mb-4">
      {quizapp.map((q, index) => (
        <li key={index} className="list-group-item">
          <strong>Q{index + 1}: {q.question}</strong>
          <br />
          <span>
            Your Answer: {selectedOptions[index] || <em>Not answered</em>}
          </span>
        </li>
      ))}
    </ul>
    <div className="text-center">
      <button className="btn btn-success me-2" onClick={handleSubmit}>
        ✅ Submit Quiz
      </button>
      <button className="btn btn-outline-secondary" onClick={() => setPreviewMode(false)}>
        🔙 Back to Quiz
      </button>
    </div>
  </div>
)}





      
    </div>

    </div>
  )
}
