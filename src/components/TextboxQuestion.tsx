import {
  Card,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";

interface Props {
  question: RadioQuestion;
  initialValue?: Answer;
  onAnswer: (answer: Answer) => void;
}

export function TextQuestionView(props: Props) {
  const { question, onAnswer, initialValue = "" } = props;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    onAnswer(value);
  }

  return (
    <TextField
      multiline
      label={question.title}
      value={initialValue}
      onChange={handleChange}
    />
  );
}
