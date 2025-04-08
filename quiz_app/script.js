document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const nextBtn = document.getElementById("next-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");
    const feedbackDisplay = document.getElementById("feedback"); // Add this element in your HTML
  
    const questions = [
      {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
      },
      {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Mars",
      },
      {
        question: "Who wrote 'Hamlet'?",
        choices: [
          "Charles Dickens",
          "Jane Austen",
          "William Shakespeare",
          "Mark Twain",
        ],
        answer: "William Shakespeare",
      },
    ];
  
    let currentQuestionIndex = 0;
    let score = 0;
  
    startBtn.addEventListener("click", startQuiz);
    nextBtn.addEventListener("click", nextQuiz);
    restartBtn.addEventListener("click", restartQuiz);
  
    function restartQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      resultContainer.classList.add("hidden");
      startQuiz();
    }
  
    function startQuiz() {
      startBtn.classList.add("hidden");
      resultContainer.classList.add("hidden");
      questionContainer.classList.remove("hidden");
      showQuestion();
    }
  
    function nextQuiz() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }
  
    function showQuestion() {
      nextBtn.classList.add("hidden");
      feedbackDisplay.textContent = ""; // Clear feedback
      questionText.textContent = questions[currentQuestionIndex].question;
      choicesList.innerHTML = "";
  
      questions[currentQuestionIndex].choices.forEach(choice => {
        const li = document.createElement("li");
        li.textContent = choice;
        li.classList.add("choice");
        li.addEventListener("click", () => selectAnswer(choice, li));
        choicesList.appendChild(li);
      });
    }
  
    function selectAnswer(choice, selectedLi) {
      const currentAnswer = questions[currentQuestionIndex].answer;
      const allChoices = choicesList.querySelectorAll("li");
  
      // Disable all choices after selection
      allChoices.forEach(li => li.style.pointerEvents = "none");
  
      if (choice === currentAnswer) {
        score++;
        selectedLi.style.backgroundColor = "lightgreen";
        feedbackDisplay.textContent = "✅ Correct";
      } else {
        selectedLi.style.backgroundColor = "salmon";
        feedbackDisplay.textContent = `❌ Incorrect (Correct: ${currentAnswer})`;
      }
  
      nextBtn.classList.remove("hidden");
    }
  
    function showResult() {
      questionContainer.classList.add("hidden");
      resultContainer.classList.remove("hidden");
      scoreDisplay.textContent = `Your Score: ${score} out of ${questions.length}`;
    }
  
  });
  