interface Option {
  id: number;
  title: string;
}

interface BaseQuestion {
  id: number;
  title: string;
  requirements?: {
    questionId: number;
    answer: Answer;
  }[];
}

interface TextQuestion extends BaseQuestion {
  type: "text";
}

interface CheckboxQuestion extends BaseQuestion {
  type: "checkbox";
  options: Option[];
}
interface RadioQuestion extends BaseQuestion {
  type: "radio";
  options: Option[];
}

type Question = TextQuestion | CheckboxQuestion | RadioQuestion;
type Answer = number | string | number[];
