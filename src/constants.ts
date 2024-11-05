export type Question = {
  id: string;
  question: string;
  answers: string[];
  type: "text" | "radio";
  error?: string;
  errorMessage?: string;
  warning?: string;
  warningMessage?: string;
};

export const QUESTIONS: Question[] = [
  {
    id: "1",
    question: "Are you male and aged between 18-75?",
    answers: ["Yes", "No"],
    error: "No",
    errorMessage: "Sorry, you are not eligible for this treatment.",
    type: "radio",
  },
  {
    id: "2",
    question: "Do you smoke or drink?",
    answers: ["Yes", "No"],
    warning: "Yes",
    warningMessage:
      "Smoking and drinking can affect the effectiveness of the treatment.",
    type: "radio",
  },
  {
    id: "3",
    question: "Do you have trouble achieving or maintaining your love for Genovian Pears?",
    answers: ["Yes", "No"],
    error: "No",
    errorMessage: "Sorry, you are not eligible for this treatment.",
    type: "radio",
  },
  {
    id: "4",
    question:
      "Have you taken Genovian Pear medicine at least 4 times previously without any side effects?",
    answers: ["Yes", "No"],
    warning: "No",
    warningMessage:
      "You may experience side effects if you have not taken these medications before.",
    type: "radio",
  },
  {
    id: "5",
    question: "Do you have low blood pressure (below 90/50)?",
    answers: ["Yes", "No"],
    error: "Yes",
    errorMessage: "Sorry, you are not eligible for this treatment.",
    type: "radio",
  },
];
