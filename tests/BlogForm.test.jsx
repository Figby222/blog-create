import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../lib/testing-utils.jsx";
import BlogForm from "../src/components/BlogForm.jsx";
import userEvent from "@testing-library/user-event";

describe("BlogForm existence", () => {
    it("Exists", () => {
        expect(BlogForm).toBeDefined();
    })

    it("Is a function", () => {
        expect(BlogForm).toBeTypeOf("function");
    })
})

describe("Title", () => {
    it("Exists", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} />);

        expect(screen.queryByText("Title"))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} intialText={""} />);

        expect(screen.queryByLabelText("Title"))
            .toBeInTheDocument();
    })

    it("Has initial value", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={"Test Initial Title"} initialText={""} />);

        expect(screen.queryByLabelText(/Title/i).value)
            .toMatch(/Test Initial Title/i);
    })

    it("Has a different initial value", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={"Test Different Initial Title"} initialText={""} />);

        const titleInput = screen.queryByLabelText(/Title/i);

        expect(titleInput.value)
            .not.toMatch(/Test Initial Title/i);
        expect(titleInput.value)
            .toMatch(/Test Different Initial Title/i);
    })

    it("Has typed in value", async () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} />);

        const titleInput = screen.queryByLabelText(/Title/i);

        const user = userEvent.setup();

        await user.type(titleInput, "Test Typed In Title");

        expect(titleInput.value)
            .toMatch(/Test Typed In Title/i);
    })
    
    it("Has a different type in value", async () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} />);

        const titleInput = screen.queryByLabelText(/Title/i);

        const user = userEvent.setup();

        await user.type(titleInput, "Test Different Typed In Title");

        expect(titleInput.value)
            .not.toMatch(/Test Typed In Title/i);
        expect(titleInput.value)
            .toMatch(/Test Different Typed In Title/i);
    })
})

describe("Text", () => {
    it("Exists", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} />);

        expect(screen.queryByText("Text"))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} />);

        expect(screen.queryByLabelText("Text"))
            .toBeInTheDocument();;;;
    })





    it("Has initial value", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={"Test Initial Text"} />);

        expect(screen.queryByLabelText(/Text/i).value)
            .toMatch(/Test Initial Text/i);
    })

    it("Has a different initial value", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={"Test Different Initial Text"} />);

        const textInput = screen.queryByLabelText(/Text/i);

        expect(textInput.value)
            .not.toMatch(/Test Initial Text/i);
        expect(textInput.value)
            .toMatch(/Test Different Initial Text/i);
    })

    it("Has typed in value", async () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} />);

        const textInput = screen.queryByLabelText(/Text/i);

        const user = userEvent.setup();

        await user.type(textInput, "Test Typed In Text");

        expect(textInput.value)
            .toMatch(/Test Typed In Text/i);
    })

    it("Has a different typed in value", async () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} />);

        const textInput = screen.queryByLabelText(/Text/i);

        const user = userEvent.setup();

        await user.type(textInput, "Test Different Typed In Text");

        expect(textInput.value)
            .not.toMatch(/Test Typed In Text/i);
        expect(textInput.value)
            .toMatch(/Test Different Typed In Text/i);
            
    })
})