import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to CodeFlow</h1>
        <p>Your one-stop platform to master Data Structures and Algorithms through interactive quizzes.</p>
        <Link to="/topics" className="btn btn-primary">Start Learning</Link>
      </header>
    </div>
  );
}

export default Home;