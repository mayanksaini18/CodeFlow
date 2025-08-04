let selectedTopic = null;
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let currentQuestions = [];

// Load saved data and start quiz
function loadSavedData() {
    const savedData = localStorage.getItem('dsaQuestData');
    if (savedData) {
        const data = JSON.parse(savedData);
        // The 'topics' variable is defined in questions.js
        topics.forEach(topic => {
            const savedTopic = data.topics?.find(t => t.id === topic.id);
            if (savedTopic) {
                topic.completed = savedTopic.completed;
            }
        });
    }
}

// Save progress
function saveData() {
    const dataToSave = {
        topics: topics.map(topic => ({
            id: topic.id,
            completed: topic.completed
        })),
        lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('dsaQuestData', JSON.stringify(dataToSave));
}

// Start quiz
function startQuiz() {
    selectedTopic = localStorage.getItem('selectedTopic');
    if (!selectedTopic) {
        window.location.href = 'topics.html';
        return;
    }

    // The 'questionsData' variable is defined in questions.js
    currentQuestions = questionsData[selectedTopic] || [];
    if (!currentQuestions.length) {
        alert('No questions available for this topic!');
        window.location.href = 'topics.html';
        return;
    }

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    renderQuestion();
}

// Render current question
function renderQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + '% Complete';
    document.getElementById('questionCounter').textContent =
        `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;

    document.getElementById('questionText').textContent = question.question;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    // Hide explanation from previous question
    const explanationDiv = document.querySelector('.explanation');
    if (explanationDiv) {
        explanationDiv.style.display = 'none';
        explanationDiv.innerHTML = '';
    }

    const previouslySelectedAnswer = userAnswers[currentQuestionIndex];

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> ${option}`;
        button.onclick = () => selectAnswer(index);


        if (previouslySelectedAnswer !== undefined) {
            button.disabled = true;
            if (index === previouslySelectedAnswer) {
                button.classList.add(previouslySelectedAnswer === question.correct ? 'correct' : 'incorrect');
            }

            if (index === question.correct) {
                button.classList.add('correct');
            }
        }

        optionsContainer.appendChild(button);
    });

    // Update nav buttons state
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').disabled = userAnswers[currentQuestionIndex] === undefined;

    // Change 'Next' to 'Finish' on the last question
    if (currentQuestionIndex === currentQuestions.length - 1) {
        document.getElementById('next-btn').innerHTML = 'Finish Quiz →';
    } else {
        document.getElementById('next-btn').innerHTML = 'Next →';
    }

}

// Handle answer selection
function selectAnswer(answerIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-btn');

    // Store user's answer
    userAnswers[currentQuestionIndex] = answerIndex;

    // Disable all option buttons to prevent changing the answer
    buttons.forEach(btn => btn.disabled = true);

    // Show feedback
    buttons[answerIndex].classList.add(answerIndex === question.correct ? 'correct' : 'incorrect');
    if (answerIndex !== question.correct) {
        buttons[question.correct].classList.add('correct');
    }

    // Show explanation
    const explanationDiv = document.querySelector('.explanation');
    if (question.explanation && explanationDiv) {
        explanationDiv.innerHTML = `<strong>Explanation:</strong> ${question.explanation}`;
        explanationDiv.style.display = 'block';
    }

    // Enable the next button
    document.getElementById('next-btn').disabled = false;
}

function goToNext() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        // If on the last question, finish the quiz
        calculateAndShowResults();
    }
}

function goToPrevious() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function calculateAndShowResults() {
    // Calculate score at the end
    score = 0;
    for (let i = 0; i < currentQuestions.length; i++) {
        if (userAnswers[i] === currentQuestions[i].correct) {
            score++;
        }
    }

    // Update completion status and save data
    const topic = topics.find(t => t.id === selectedTopic);
    if (topic) {
        topic.completed = Math.max(topic.completed, currentQuestions.length);
        saveData();
    }

    // Store results for the results page
    localStorage.setItem('quizResults', JSON.stringify({
        score: score,
        total: currentQuestions.length,
        percentage: Math.round((score / currentQuestions.length) * 100)
    }));

    // Redirect to results page
    window.location.href = 'results.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    startQuiz();

    // Add event listeners for the navigation buttons
    document.getElementById('prev-btn').addEventListener('click', goToPrevious);
    document.getElementById('next-btn').addEventListener('click', goToNext);
});