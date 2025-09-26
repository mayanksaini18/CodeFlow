import React from 'react';
import { Link } from 'react-router-dom';
import { topics } from '../data/questions';
import './Topics.css';

function Topics() {
  return (
    <div className="topics-container">
      <div className="page-header">
        <h1>Choose Your Topic</h1>
        <p>Select a DSA topic to start practicing</p>
      </div>
      <div className="topics-grid">
        {topics.map((topic) => (
          <Link to={`/quiz/${topic.id}`} key={topic.id} className="topic-card">
            <div className="topic-header">
              <div className="topic-info">
                <div className="topic-icon">{topic.icon}</div>
                <div>
                  <div className="topic-title">{topic.name}</div>
                  <div className="topic-subtitle">{topic.questions} questions</div>
                </div>
              </div>
              <div className={`difficulty-badge difficulty-${topic.difficulty.toLowerCase()}`}>
                {topic.difficulty}
              </div>
            </div>
            {/* Progress bar can be added here later */}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topics;