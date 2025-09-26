import React from 'react';
import { useParams } from 'react-router-dom';

function Quiz() {
  const { topicId } = useParams();

  return (
    <div>
      <h1>Quiz for: {topicId}</h1>
      <p>Quiz questions will be displayed here.</p>
    </div>
  );
}

export default Quiz;