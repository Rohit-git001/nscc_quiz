// Five general knowledge questions + special last question
const questions = [
  {
    q: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    q: "Who painted the Mona Lisa?",
    options: ["Vincent Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    answer: "Leonardo da Vinci"
  },
  {
    q: "What is the capital of Japan?",
    options: ["Seoul", "Kyoto", "Tokyo", "Beijing"],
    answer: "Tokyo"
  },
  {
    q: "Which gas do humans primarily exhale?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    answer: "Carbon Dioxide"
  },
  {
    q: "Am I recruited in NSCC >;)",
    options: ["Yes", "Yes", "Yes", "No"],
    answer: "Yes" // any "Yes" is correct
  }
];

const quizContainer = document.getElementById("quizQuestions");
const form = document.getElementById("quizForm");
const resultBox = document.getElementById("resultBox");
const submitBtn = document.getElementById("submitBtn");

// Render questions
questions.forEach((item, index) => {
  const qWrap = document.createElement("div");
  qWrap.className = "question";

  const title = document.createElement("h3");
  title.textContent = `${index + 1}. ${item.q}`;
  qWrap.appendChild(title);

  const optionsWrap = document.createElement("div");
  optionsWrap.className = "options";

  item.options.forEach(opt => {
    const label = document.createElement("label");
    label.className = "option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${index}`;
    input.value = opt;

    // Disable "No" option in the last question
    if (index === questions.length - 1 && opt === "No") {
      input.disabled = true;
      label.classList.add("disabled-option");
    }

    const text = document.createElement("span");
    text.textContent = opt;

    label.appendChild(input);
    label.appendChild(text);
    optionsWrap.appendChild(label);
  });

  qWrap.appendChild(optionsWrap);
  quizContainer.appendChild(qWrap);
});

// Submit & evaluate
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Require all questions answered
  for (let i = 0; i < questions.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      resultBox.style.display = "block";
      resultBox.innerHTML = `
        <div class="notice">Please answer all questions before submitting.</div>
      `;
      resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
  }

  let score = 0;
  let details = "";

  questions.forEach((item, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);

    if (i === questions.length - 1) {
      // Special last question logic
      if (selected.value === "No") {
        details += `<p>${i + 1}. ${item.q} — <span class="incorrect">Wrong answer 😅</span></p>`;
      } else {
        score++;
        details += `<p>${i + 1}. ${item.q} — <span class="correct">Correct 😅</span></p>`;
      }
    } else {
      // Normal questions
      if (selected.value === item.answer) {
        score++;
        details += `<p>${i + 1}. ${item.q} — <span class="correct">Correct</span></p>`;
      } else {
        details += `<p>${i + 1}. ${item.q} — <span class="incorrect">Incorrect</span> (Correct: ${item.answer})</p>`;
      }
    }
  });

  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <h2>You scored ${score} out of ${questions.length}</h2>
    ${details}
    <button class="btn-secondary" onclick="window.location.reload()">Retake Quiz</button>
  `;

  // Lock after submit
  document.querySelectorAll('input[type="radio"]').forEach(i => i.disabled = true);
  submitBtn.disabled = true;
});
