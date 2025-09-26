import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Topics from './pages/Topics';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/quiz/:topicId" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;