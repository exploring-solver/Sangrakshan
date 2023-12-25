import React, { useState } from 'react';

const Evaluation = ({ questions, options, correctAnswers }) => {
  const [userResponses, setUserResponses] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelection = (index, selectedOption) => {
    const updatedResponses = [...userResponses];
    updatedResponses[index] = selectedOption;
    setUserResponses(updatedResponses);
  };

  const calculateScore = () => {
    return userResponses.reduce((score, response, index) => {
      return response === correctAnswers[index] ? score + 1 : score;
    }, 0);
  };

  const showResults = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setUserResponses(Array(questions.length).fill(null));
    setShowResult(false);
  };

  return (
    <div>
      <h1 className='text-blue-600 text-semibold my-10 text-3xl text-center'>CBRN Training Evaluation</h1>
      <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md mt-2">

        {questions.map((question, index) => (
          <div key={index} className="mb-6">
            <p className="font-semibold mb-2">{question}</p>
            <div className="space-y-2">
              {options[index].map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center">
                  <input
                    type="radio"
                    value={`option${String.fromCharCode(65 + optionIndex)}`}
                    checked={userResponses[index] === `option${String.fromCharCode(65 + optionIndex)}`}
                    onChange={() => handleAnswerSelection(index, `option${String.fromCharCode(65 + optionIndex)}`)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}

        {showResult ? (
          <div>
            <p className="font-semibold mb-4">Your Score: {calculateScore()} out of {questions.length}</p>
            <ul className="list-disc ml-6">
              {userResponses.map((response, index) => (
                <li key={index} className="mb-2">
                  <strong>Question {index + 1}:</strong> Your Answer: {response}, Correct Answer: {correctAnswers[index]}
                </li>
              ))}
            </ul>
            <button
              onClick={resetQuiz}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Try Again
            </button>
          </div>
        ) : (
          <button
            onClick={showResults}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Submit
          </button>
        )}
      </div>
    </div>

  );
};

export default Evaluation;
