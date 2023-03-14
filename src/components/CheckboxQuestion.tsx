import {
  Card,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface Props {
  question: CheckboxQuestion;
  initialValue?: number[];
  onAnswer: (answer: number[]) => void;
}

export function CheckboxQuestionView(props: Props) {
  const { question, onAnswer, initialValue } = props;
  const checked = initialValue
    ? Object.fromEntries(initialValue.map((id) => [id, true]))
    : {};

  console.log(checked);

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    newValue: boolean
  ) {
    const id = +event.target.dataset.id!;
    const newChecked = { ...checked, [id]: newValue };
    const upperValue = Object.entries(newChecked)
      .map(([k, v]) => (v ? +k : null))
      .filter((k): k is number => !!k);
    console.log(upperValue);
    onAnswer(upperValue);
  }

  return (
    <FormControl sx={{ width: "100%" }}>
      <FormLabel>{question.title}</FormLabel>
      <FormGroup>
        {question.options.map((opt) => (
          <FormControlLabel
            key={opt.id}
            value={opt.id}
            control={
              <Checkbox
                checked={checked[opt.id]}
                onChange={handleChange}
                inputProps={
                  {
                    "data-id": opt.id,
                  } as any
                }
              />
            }
            label={opt.title}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
