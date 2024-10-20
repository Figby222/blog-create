import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../lib/testing-utils.jsx";
import CreateBlogPostForm from "../src/components/CreateBlogPostForm.jsx";
import userEvent from "@testing-library/user-event";

describe("CreateBlogPostForm existence", () => {
    it("Exists", () => {
        expect(CreateBlogPostForm).toBeDefined();
    })

    it("Is a function", () => {
        expect(CreateBlogPostForm).toBeTypeOf("function");
    })
})

describe("Title", () => {
    it("Exists", () => {
        render(<CreateBlogPostForm createBlogPost={() => ({})} />);

        expect(screen.queryByText(/Title/i))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<CreateBlogPostForm createBlogPost={() => ({})} />);

        expect(screen.queryByLabelText(/Title/i))
            .toBeInTheDocument();
    })
})

describe("Text", () => {
    it("Exists", () => {
        render(<CreateBlogPostForm createBlogPost={() => ({})} />);

        expect(screen.queryByText(/Text/i))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<CreateBlogPostForm createBlogPost={() => ({})} />);

        expect(screen.queryByLabelText(/Text/i))
            .toBeInTheDocument();
    })
})

describe("Submit button", () => {
    it("Exists", () => {
        render(<CreateBlogPostForm createBlogPost={() => ({})} />);

        const submitButton = screen.queryByRole("button");
        
        expect(submitButton)
            .toBeInTheDocument();
    })

    it("Has submit text", () => {
        render(<CreateBlogPostForm createBlogPost={() => ({})} />);

        expect(screen.queryByRole("button").textContent)
            .toMatch(/Submit/i);
    })
})

describe("Submitting the form", () => {
    it("Calls createBlogPost on submit", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Title");
        await user.type(textInput, "Test Text");

        await user.click(submitButton);

        expect(mockCreateBlogPost).toHaveBeenCalled();
    })

    it("Only calls createBlogPost on submit", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);

        const user = userEvent.setup();

        await user.type(titleInput, "Text Title");
        await user.type(textInput, "Test Text");

        expect(mockCreateBlogPost)
            .not.toHaveBeenCalled();
    })
})