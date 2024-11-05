import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ActionButtons } from "./action-buttons";
import { QUESTIONS } from "../../constants";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createConsultation } from "../../api/create-consultation";
import { vi } from "vitest";

vi.mock("react-hook-form", () => ({
  useFormContext: vi.fn(),
}));
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("../../api/create-consultation.ts", () => ({
  createConsultation: vi.fn(),
}));

describe("ActionButtons", () => {
  const mockNavigate = vi.fn();
  const mockHandleNext = vi.fn();
  const mockHandlePrevious = vi.fn();

  beforeEach(() => {
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);
    (useFormContext as ReturnType<typeof vi.fn>).mockReturnValue({
      watch: vi.fn().mockReturnValue({}),
      getValues: vi.fn().mockReturnValue({}),
    });
    (createConsultation as ReturnType<typeof vi.fn>).mockReturnValue({});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders Back and Next buttons", () => {
    render(
      <ActionButtons
        currentIndex={1}
        handleNext={mockHandleNext}
        handlePrevious={mockHandlePrevious}
      />
    );

    expect(screen.getByText("Back")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("calls handlePrevious when Back button is clicked", () => {
    render(
      <ActionButtons
        currentIndex={1}
        handleNext={mockHandleNext}
        handlePrevious={mockHandlePrevious}
      />
    );

    fireEvent.click(screen.getByText("Back"));
    expect(mockHandlePrevious).toHaveBeenCalled();
  });

  it("disables the Submit button if any question is unanswered", () => {
    (useFormContext as ReturnType<typeof vi.fn>).mockReturnValue({
      watch: vi.fn().mockReturnValue({ q1: "", q2: "answer" }),
      getValues: vi.fn().mockReturnValue({ q1: "", q2: "answer" }),
    });

    render(
      <ActionButtons
        currentIndex={QUESTIONS.length - 1}
        handleNext={mockHandleNext}
        handlePrevious={mockHandlePrevious}
      />
    );

    expect(screen.getByText("Submit")).toBeDisabled();
  });

  it("calls handleNext when Next button is clicked", async () => {
    (useFormContext as ReturnType<typeof vi.fn>).mockReturnValue({
      watch: vi.fn().mockReturnValue({ 1: "Yes", 2: "Yes", 3: "Yes" }),
      getValues: vi.fn().mockReturnValue({ 1: "Yes", 2: "Yes", 3: "Yes" }),
    });
    render(
      <ActionButtons
        currentIndex={1}
        handleNext={mockHandleNext}
        handlePrevious={mockHandlePrevious}
      />
    );
    fireEvent.click(screen.getByText("Next"));
    expect(mockHandleNext).toHaveBeenCalled();
  });

  it("enables Submit button if all questions are answered", () => {
    (useFormContext as ReturnType<typeof vi.fn>).mockReturnValue({
      watch: vi.fn().mockReturnValue({ q1: "answer1", q2: "answer2" }),
      getValues: vi.fn().mockReturnValue({ q1: "answer1", q2: "answer2" }),
    });

    render(
      <ActionButtons
        currentIndex={QUESTIONS.length - 1}
        handleNext={mockHandleNext}
        handlePrevious={mockHandlePrevious}
      />
    );

    expect(screen.getByText("Submit")).not.toBeDisabled();
  });

  it("displays loading spinner and navigates on submit", async () => {
    (useFormContext as ReturnType<typeof vi.fn>).mockReturnValue({
      watch: vi.fn().mockReturnValue({ q1: "answer1", q2: "answer2" }),
      getValues: vi.fn().mockReturnValue({ q1: "answer1", q2: "answer2" }),
    });

    render(
      <ActionButtons
        currentIndex={QUESTIONS.length - 1}
        handleNext={mockHandleNext}
        handlePrevious={mockHandlePrevious}
      />
    );

    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    expect(
      await screen.findByTestId("loading-spinner")
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/thank-you");
    });
  });

  it("displays tooltip when any question is empty", async () => {
    (useFormContext as ReturnType<typeof vi.fn>).mockReturnValue({
      watch: vi.fn().mockReturnValue({ q1: "", q2: "answer" }),
      getValues: vi.fn().mockReturnValue({ q1: "", q2: "answer" }),
    });

    render(
      <ActionButtons
        currentIndex={QUESTIONS.length - 1}
        handleNext={mockHandleNext}
        handlePrevious={mockHandlePrevious}
      />
    );

    const submitButton = screen.getByText("Submit");
    fireEvent.mouseOver(submitButton);

    expect(
      await screen.findByText("Please fill in all the questions")
    ).toBeInTheDocument();
  });
});
