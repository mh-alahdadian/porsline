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

interface Props {
  question: RadioQuestion;
  initialValue?: Answer;
  onAnswer: (answer: Answer) => void;
}

export function RadioQuestionView(props: Props) {
  const { question, onAnswer, initialValue } = props;

  return (
    <FormControl sx={{ width: "100%" }}>
      <FormLabel>{question.title}</FormLabel>
      <RadioGroup
        value={initialValue || ""}
        onChange={(e, value) => {
          onAnswer(+value);
        }}
      >
        {question.options.map((opt) => (
          <FormControlLabel
            key={opt.id}
            value={opt.id}
            control={<Radio />}
            label={opt.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
