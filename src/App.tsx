import { FormEvent, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { QuestionView } from "./components/QuestionView";
import { Actions } from "./components/Actions";

function createQuestoins(): Question[] {
  return [
    {
      id: 1,
      title: "question 1",
      type: "radio",
      options: [
        { id: 1, title: "option 1" },
        { id: 2, title: "option 2" },
        { id: 3, title: "option 3" },
        { id: 4, title: "option 4" },
      ],
    },
    {
      id: 2,
      title: "question 2",
      type: "radio",
      requirements: [
        {
          questionId: 1,
          answer: 3,
        },
      ],
      options: [
        { id: 1, title: "option 1" },
        { id: 2, title: "option 2" },
        { id: 3, title: "option 3" },
        { id: 4, title: "option 4" },
      ],
    },
    {
      id: 3,
      title: "question 3",
      type: "checkbox",
      options: [
        { id: 1, title: "option 1" },
        { id: 2, title: "option 2" },
        { id: 3, title: "option 3" },
        { id: 4, title: "option 4" },
      ],
    },
    {
      id: 4,
      title: "question 4",
      type: "text",
    },
  ];
}

function submitToBackend(
  answers: Record<number /* questionId */, Answer /* answerId */>
) {
  console.log(answers);
  // TODO
}

function App() {
  const questions = useMemo(() => createQuestoins(), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];
  const [answers, setAnswers] = useState<
    Record<number /* questionId */, Answer>
  >({});

  function getNextQuestionIndex(
    answers: Record<number, Answer>,
  ): number | null {
    let nextIndex = currentIndex + 1
    while (true) {
      const nextQuestion = questions[nextIndex];
      if (!nextQuestion) return null;

      if (!nextQuestion.requirements) return nextIndex;
  
      const requirementsMeet = nextQuestion.requirements.every(
        (req) => answers[req.questionId] === req.answer
      );
  
      console.log(nextQuestion.requirements, requirementsMeet, nextIndex);
  
      if (requirementsMeet) return nextIndex;
      nextIndex++;        
    }
  }

  function onAnswer(answer: Answer) {
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: answer,
    };
    setAnswers(nextAnswers);
    if (
      questions.length !== currentIndex + 1 &&
      currentQuestion.type === "radio"
    ) {
      const nextIndex = getNextQuestionIndex(nextAnswers);
      if (nextIndex) setCurrentIndex(nextIndex);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submitToBackend(answers);
  }

  return (
    <form className="App" onSubmit={handleSubmit}>
      <QuestionView
        key={currentQuestion.id}
        question={currentQuestion}
        initialValue={answers[currentQuestion.id]}
        onAnswer={onAnswer}
      />
      <Actions
        currentIndex={currentIndex}
        hasAnswer={answers[currentQuestion.id] != null}
        questionCount={questions.length}
        setCurrentIndex={setCurrentIndex}
      />
    </form>
  );
}

export default App;
