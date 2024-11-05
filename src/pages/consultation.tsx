import { Box, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { QUESTIONS } from "../constants";
import { ActionButtons } from "../components/action-buttons/action-buttons";
import { ProgressTracker } from "../components/progress-tracker/progress-tracker";
import { Question } from "../components/question/question";

export function Consultation() {
  const defaultValues = QUESTIONS.reduce(
    (acc: { [key: string]: string }, question) => {
      acc[question.id] = "";
      return acc;
    },
    {}
  );

  const methods = useForm({
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const questionId = useParams()?.questionId || "1";
  const navigate = useNavigate();
  const currentIndex = QUESTIONS.findIndex((q) => q.id === questionId);

  const handleNext = () => {
    const nextId = QUESTIONS[currentIndex + 1].id;
    navigate(`/consultation/${nextId}`);
  };

  const handlePrevious = () => {
    const previousId = QUESTIONS[currentIndex - 1].id;
    navigate(`/consultation/${previousId}`);
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Genovian Pears Consultation
        </Typography>
        <ProgressTracker />

        <Box sx={{ mt: 5 }}>
          <Question />
          <ActionButtons
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            currentIndex={currentIndex}
          />
        </Box>
      </Box>
    </FormProvider>
  );
}
