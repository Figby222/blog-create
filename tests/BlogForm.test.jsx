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
})