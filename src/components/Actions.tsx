import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  currentIndex: number;
  hasAnswer: boolean;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  questionCount: number;
}

export function Actions(props: Props) {
  const { currentIndex, setCurrentIndex, questionCount, hasAnswer } = props;
  function onPrev() {
    setCurrentIndex((i) => i - 1);
  }
  function onNext() {
    setCurrentIndex((i) => i + 1);
  }

  return (
    <div>
      <Button disabled={currentIndex < 1} onClick={onPrev}>
        Previous
      </Button>
      {currentIndex + 1 !== questionCount ? (
        <Button key="next" disabled={!hasAnswer} onClick={onNext}>
          Next
        </Button>
      ) : (
        <Button key="submit" disabled={!hasAnswer} type="submit">
          Submit
        </Button>
      )}
    </div>
  );
}
