const questions = [
  {
    question:
      "Who was the first Indian cricketer to score a double century in Test cricket?",
    answer: [
      { text: "Vinoo Mankad", correct: true },
      { text: "Sunil Gavaskar", correct: false },
      { text: "Sachin Tendulkar", correct: false },
      { text: "Kapil Dev", correct: false },
    ],
  },
  {
    question:
      "Who was the captain of the Indian cricket team during the 1983 World Cup victory?",
    answer: [
      { text: "Kapil Dev", correct: true },
      { text: "Sunil Gavaskar", correct: false },
      { text: "Mohinder Amarnath", correct: false },
      { text: "Ravi Shastri", correct: false },
    ],
  },
  {
    question:
      "Who is the only Indian bowler to take all 10 wickets in a Test innings?",
    answer: [
      { text: "Anil Kumble", correct: true },
      { text: "Kapil Dev", correct: false },
      { text: "Harbhajan Singh", correct: false },
      { text: "Zaheer Khan", correct: false },
    ],
  },
  {
    question: "Which Indian cricketer is known as the 'Little Master'?",
    answer: [
      { text: "Sunil Gavaskar", correct: true },
      { text: "Sachin Tendulkar", correct: false },
      { text: "Rahul Dravid", correct: false },
      { text: "Virat Kohli", correct: false },
    ],
  },
  {
    question:
      "Who was the first Indian batsman to score a triple century in Test cricket?",
    answer: [
      { text: "Virender Sehwag", correct: true },
      { text: "Sachin Tendulkar", correct: false },
      { text: "Rahul Dravid", correct: false },
      { text: "Sourav Ganguly", correct: false },
    ],
  },
  {
    question:
      "Which Indian cricketer holds the record for the highest individual score in ODI cricket?",
    answer: [
      { text: "Rohit Sharma", correct: true },
      { text: "Virender Sehwag", correct: false },
      { text: "Sachin Tendulkar", correct: false },
      { text: "MS Dhoni", correct: false },
    ],
  },
  {
    question:
      "Who is the first Indian cricketer to win the ICC ODI Cricketer of the Year award?",
    answer: [
      { text: "MS Dhoni", correct: true },
      { text: "Sachin Tendulkar", correct: false },
      { text: "Virat Kohli", correct: false },
      { text: "Rohit Sharma", correct: false },
    ],
  },
  {
    question: "Who was India's first Test captain?",
    answer: [
      { text: "C.K. Nayudu", correct: true },
      { text: "Vijay Hazare", correct: false },
      { text: "Lala Amarnath", correct: false },
      { text: "Kapil Dev", correct: false },
    ],
  },
  {
    question: "Which Indian cricketer is known as the 'Wall'?",
    answer: [
      { text: "Rahul Dravid", correct: true },
      { text: "VVS Laxman", correct: false },
      { text: "Cheteshwar Pujara", correct: false },
      { text: "Anil Kumble", correct: false },
    ],
  },
  {
    question:
      "Who was the first Indian cricketer to score 10,000 runs in Test cricket?",
    answer: [
      { text: "Sunil Gavaskar", correct: true },
      { text: "Sachin Tendulkar", correct: false },
      { text: "Rahul Dravid", correct: false },
      { text: "Virender Sehwag", correct: false },
    ],
  },
];

const questionElement = $("#question");
const answerButton = $("#answer-button");
const nextButton = $("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.show();
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.text(`${questionNo} . ${currentQuestion.question}`);

  currentQuestion.answer.forEach((answer) => {
    let button = $(`<button class="btn">${answer.text}</button>`);
    console.log(button);
    answerButton.append(button);

    if (answer.correct) {
      button.attr("data-correct", answer.correct);
    }

    button.on("click", selectAnswer);
  });
}

function resetState() {
  nextButton.hide();
  while (answerButton.children().length > 0) {
    answerButton.children().remove();
  }
}

function selectAnswer(e) {
  const selectedBtn = $(e.target);
  const isCorrect = selectedBtn.attr("data-correct");
  if (isCorrect) {
    score++;
    selectedBtn.addClass("correct");
  } else {
    selectedBtn.addClass("incorrect");
  }
  Array.from(answerButton.children()).forEach((btn) => {
    const $btn = $(btn); // Wrap `btn` in jQuery

    if ($btn.attr("data-correct") === "true") {
      $btn.addClass("correct");
    }
    $btn.prop("disabled", true);
  });
  nextButton.prop("style", "display: block");
}

nextButton.on("click", function () {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  let scoreText = `Score: ${score}/${questions.length}`;
  questionElement.text(scoreText);
  nextButton.text("Restart");
  nextButton.prop("style", "display: block");
}

startQuiz();
