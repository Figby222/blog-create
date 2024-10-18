import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../lib/testing-utils.jsx";
import BlogForm from "../src/components/BlogForm.jsx";

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

        expect(screen.queryByText(/Title/i))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} intialText={""} />);

        expect(screen.queryByLabelText(/Title/i))
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
})

describe("Text", () => {
    it("Exists", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} />);

        expect(screen.queryByText(/Text/i))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} />);

        expect(screen.queryByLabelText(/Text/i))
            .toBeInTheDocument();;;;
    })
})