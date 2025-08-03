// quiz.js

// Load questions from the JSON file
fetch('assets/questions.json')
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        let currentQuestionIndex = 0;
        let score = 0;

        // Function to display a question
        function displayQuestion() {
            const questionContainer = document.getElementById('question-container');
            const question = questions[currentQuestionIndex];
            questionContainer.innerHTML = `
                <h2>${question.question}</h2>
                ${question.options.map((option, index) => `
                    <div>
                        <input type="radio" name="answer" id="option${index}" value="${option}">
                        <label for="option${index}">${option}</label>
                    </div>
                `).join('')}
                <button id="next-button">Next</button>
            `;

            // Add event listener for the next button
            document.getElementById('next-button').addEventListener('click', handleNext);
        }

        // Function to handle the next button click
        function handleNext() {
            const selectedOption = document.querySelector('input[name="answer"]:checked');
            if (selectedOption) {
                if (selectedOption.value === questions[currentQuestionIndex].correctAnswer) {
                    score++;
                }
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    displayQuestion();
                } else {
                    showScore();
                }
            } else {
                alert('Please select an answer before proceeding.');
            }
        }

        // Function to display the final score
        function showScore() {
            const questionContainer = document.getElementById('question-container');
            questionContainer.innerHTML = `<h2>Your score: ${score} out of ${questions.length}</h2>`;
        }

        // Start the quiz by displaying the first question
        displayQuestion();
    })
    .catch(error => console.error('Error loading questions:', error));