import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProgressTracker } from "./progress-tracker";
import { QUESTIONS } from "../../constants";
import { useParams } from "react-router-dom";
import { useWatch } from "react-hook-form";
import { vi } from "vitest";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: vi.fn(),
}));

vi.mock("react-hook-form", () => ({
  useWatch: vi.fn(),
}));

describe("ProgressTracker", () => {
  it("renders the correct icons based on the form answers", () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({
      questionId: "2",
    });

    (useWatch as ReturnType<typeof vi.fn>).mockReturnValue({
      [QUESTIONS[0].id]: "Yes",
      [QUESTIONS[1].id]: "",
      [QUESTIONS[2].id]: "",
      [QUESTIONS[3].id]: "",
      [QUESTIONS[4].id]: "",
    });

    render(<ProgressTracker />);

    expect(screen.getAllByTestId("RadioButtonUncheckedIcon")).toHaveLength(4);
    expect(screen.getAllByTestId("TaskAltIcon")).toHaveLength(1);
  });
});
