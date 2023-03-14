import {
  Card,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ElementType } from "react";
import { CheckboxQuestionView } from "./CheckboxQuestion";
import { RadioQuestionView } from "./RadioboxQuestion";
import { TextQuestionView } from "./TextboxQuestion";

interface Props {
  question: Question;
  initialValue?: Answer;
  onAnswer: (answer: Answer) => void;
}

const dict = {
    text: TextQuestionView,
    radio: RadioQuestionView,
    checkbox: CheckboxQuestionView,
} satisfies Record<Question["type"], ElementType>;

export function QuestionView(props: Props) {
  const { question, onAnswer, initialValue } = props;

  const Component = dict[question.type];

  return (
    <Card sx={{ padding: "2rem" }}>
      <Component {...props as any}/>
    </Card>
  );
}
