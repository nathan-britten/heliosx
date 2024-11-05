import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import { QUESTIONS } from "../../constants";
import { useFormContext } from "react-hook-form";
import { createConsultation } from "../../api/create-consultation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  currentIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
};

export function ActionButtons(props: Props) {
  const { currentIndex, handleNext, handlePrevious } = props;

  const [loading, setLoading] = useState(false);
  const form = useFormContext();

  const values = form.watch();
  const anyEmpty = Object.values(values).some((value) => {
    return value === "";
  });

  const naviate = useNavigate();
  const currentAnswer = values[QUESTIONS[currentIndex].id];

  const handleSubmit = async () => {
    const values = form.getValues();

    setLoading(true);

    try {
      await createConsultation(values);
      setLoading(false);
      naviate("/thank-you");
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };

  const currentQuestion = QUESTIONS[currentIndex];

  const hasError = currentQuestion?.error === currentAnswer;

  return (
    <Box data-testid="action-buttons">
      <Box sx={{ gap: "20px", display: "flex", marginTop: 5 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={currentIndex === 0}
          onClick={handlePrevious}
          sx={{ width: "100%" }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={
            currentIndex === QUESTIONS.length - 1 || !currentAnswer || hasError
          }
          onClick={handleNext}
          sx={{ width: "100%" }}
        >
          Next
        </Button>
      </Box>

      {currentIndex === QUESTIONS.length - 1 && (
        <Box sx={{ display: "flex", marginTop: 3, alignItems: "center" }}>
          <Tooltip
            title={anyEmpty ? "Please fill in all the questions" : undefined}
            placement="bottom"
          >
            <Box component="span" sx={{ width: "100%" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={anyEmpty || hasError}
                onClick={handleSubmit}
                sx={{ width: "100%" }}
              >
                Submit
              </Button>
            </Box>
          </Tooltip>
          {loading && (
            <CircularProgress
              size={16}
              sx={{ marginLeft: 2 }}
              data-testid="loading-spinner"
            />
          )}
        </Box>
      )}
    </Box>
  );
}
