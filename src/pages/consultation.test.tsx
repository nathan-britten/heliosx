import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { Consultation } from "./consultation";
import { QUESTIONS } from "../constants";
import { useNavigate, useParams } from "react-router-dom";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

describe("Consultation", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({
      questionId: QUESTIONS[0].id,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Consultation component correctly", async () => {
    render(<Consultation />);

    expect(
      screen.getByRole("heading", { name: /Genovian Pears Consultation/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId("progress-tracker")).toBeInTheDocument();
    expect(screen.getByTestId("question")).toBeInTheDocument();
    expect(screen.getByTestId("action-buttons")).toBeInTheDocument();
  });

  it("disables the Back button on the first question", () => {
    render(<Consultation />);

    const backButton = screen.getByText("Back");
    expect(backButton).toBeDisabled();
  });

  it("disables the Next button on the last question", () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({
      questionId: QUESTIONS[QUESTIONS.length - 1].id,
    });

    render(<Consultation />);

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });
});
