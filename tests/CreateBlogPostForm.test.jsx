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

        expect(screen.queryByText("Title"))
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

        expect(screen.queryByText("Text"))
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

    it("Calls createBlogPost with field values", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));
        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Title");
        await user.type(textInput, "Test Text");
        
        await user.click(submitButton);

        expect(mockCreateBlogPost)
            .toHaveBeenCalledWith("Test Title", "Test Text");
    })

    it("Calls createBlogPost with different values", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));
        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Different Title");
        await user.type(textInput, "Test Different Text");

        await user.click(submitButton);

        expect(mockCreateBlogPost)
            .toHaveBeenCalledWith("Test Different Title", "Test Different Text");
    })
})

describe("Errors", () => {
    it("Renders error on error", async () => {
        const mockCreateBlogPost = vi.fn(() => ({
            errors: [
                { field: "title", message: "Test Title Error" }
            ]
        }));

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();
        await user.type(titleInput, "Test Invalid Title");
        await user.type(textInput, "Test Invalid Text");
        await user.click(submitButton);
        expect(screen.queryByText(/Test Title Error/i))
            .toBeInTheDocument();
    })

    it("Only renders error on error", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Title");
        await user.type(textInput, "Test Text");

        await user.click(submitButton);

        expect(screen.queryByText(/Test Title Error/i))
            .not.toBeInTheDocument();
    })

    it("Renders a different error", async () => {
        const mockCreateBlogPost = vi.fn(() => ({
            errors: [
                { field: "title", message: "Test Different Title Error" }
            ]
        }));

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Invalid Title");
        await user.type(textInput, "Test Invalid Text");
        
        await user.click(submitButton);

        expect(screen.queryByText(/Test Title Error/i))
            .not.toBeInTheDocument()
        expect(screen.queryByText(/Test Different Title Error/i))
            .toBeInTheDocument();
    })
})