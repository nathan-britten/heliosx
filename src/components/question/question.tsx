import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from "@mui/material";
import { useMemo } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import { QUESTIONS } from "../../constants";

export function Question() {
  const { control } = useFormContext();

  const questionId = useParams()?.questionId;

  const question = useMemo(
    () => QUESTIONS.find((q) => q.id === questionId),
    [questionId]
  );

  const currentAnswer = useWatch()[questionId ?? ""];

  if (!question) return null;
  const hasError = question?.error === currentAnswer;

  const hasWarning = question?.warning === currentAnswer;

  return (
    <div key={question.id} data-testid="question">
      <Typography variant="h5" sx={{ mb: 2 }}>
        {question.question}
      </Typography>
      <Controller
        name={question.id}
        control={control}
        render={({ field }) => (
          <RadioGroup
            {...field}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            defaultChecked={false}
          >
            {question.answers.map((answer) => (
              <FormControlLabel
                key={`${question.id}-${answer}`}
                value={answer}
                control={<Radio />}
                label={answer}
              />
            ))}
          </RadioGroup>
        )}
      />
      {hasWarning && (
        <Alert severity="warning">{question.warningMessage}</Alert>
      )}
      {hasError && <Alert severity="error">{question.errorMessage}</Alert>}
    </div>
  );
}
