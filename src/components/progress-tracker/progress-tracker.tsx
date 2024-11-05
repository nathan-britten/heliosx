import { Box } from "@mui/material";
import { useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import { QUESTIONS } from "../../constants";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export function ProgressTracker() {
  const current = useParams()?.questionId || "1";
  const form = useWatch();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 1,
        mb: 2,
      }}
      data-testid="progress-tracker"
    >
      {QUESTIONS.map((question) => {
        const hasAnswer = form[question.id] !== "";

        if (hasAnswer) {
          return (
            <TaskAltIcon
              key={question.id}
              color={question.id === current ? "primary" : "success"}
              fontSize="large"
            />
          );
        }
        return (
          <RadioButtonUncheckedIcon
            key={question.id}
            color={question.id === current ? "primary" : "secondary"}
            fontSize="large"
          />
        );
      })}
    </Box>
  );
}
