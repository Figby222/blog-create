import { describe, it, expect, vi } from "vitest";
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
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} errors={[]} />);

        expect(screen.queryByText("Title"))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} intialText={""} errors={[]} />);

        expect(screen.queryByLabelText("Title"))
            .toBeInTheDocument();
    })

    it("Has initial value", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={"Test Initial Title"} initialText={""} errors={[]} />);

        expect(screen.queryByLabelText(/Title/i).value)
            .toMatch(/Test Initial Title/i);
    })

    it("Has a different initial value", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={"Test Different Initial Title"} initialText={""} errors={[]} />);

        const titleInput = screen.queryByLabelText(/Title/i);

        expect(titleInput.value)
            .not.toMatch(/Test Initial Title/i);
        expect(titleInput.value)
            .toMatch(/Test Different Initial Title/i);
    })

    it("Has typed in value", async () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} errors={[]} />);

        const titleInput = screen.queryByLabelText(/Title/i);

        const user = userEvent.setup();

        await user.type(titleInput, "Test Typed In Title");

        expect(titleInput.value)
            .toMatch(/Test Typed In Title/i);
    })
    
    it("Has a different type in value", async () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} errors={[]} />);

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
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} errors={[]} />);

        expect(screen.queryByText("Text"))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} errors={[]} />);

        expect(screen.queryByLabelText("Text"))
            .toBeInTheDocument();;;;
    })




    


    it("Has initial value", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={"Test Initial Text"} errors={[]} />);

        expect(screen.queryByLabelText(/Text/i).value)
            .toMatch(/Test Initial Text/i);
    })

    it("Has a different initial value", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={"Test Different Initial Text"} errors={[]} />);

        const textInput = screen.queryByLabelText(/Text/i);

        expect(textInput.value)
            .not.toMatch(/Test Initial Text/i);
        expect(textInput.value)
            .toMatch(/Test Different Initial Text/i);
    })

    it("Has typed in value", async () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} errors={[]} />);

        const textInput = screen.queryByLabelText(/Text/i);

        const user = userEvent.setup();

        await user.type(textInput, "Test Typed In Text");

        expect(textInput.value)
            .toMatch(/Test Typed In Text/i);
    })

    it("Has a different typed in value", async () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} errors={[]} />);

        const textInput = screen.queryByLabelText(/Text/i);

        const user = userEvent.setup();

        await user.type(textInput, "Test Different Typed In Text");

        expect(textInput.value)
            .not.toMatch(/Test Typed In Text/i);
        expect(textInput.value)
            .toMatch(/Test Different Typed In Text/i);
            
    })
})

describe("Submit button", () => {
    it("Exists", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} errors={[]} />);
    
        expect(screen.queryByRole("button"))
            .toBeInTheDocument();
    })

    it("Has submit text", () => {
        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} errors={[]} />);

        expect(screen.queryByRole("button").textContent)
            .toMatch(/Submit/i);
    })
})

describe("Submitting the form", () => {
    it("Calls onSubmit on submit", async () => {
        const onSubmit = vi.fn(() => {});
        render(<BlogForm onSubmit={onSubmit} initialTitle={"Test Initial Title"} initialText={"Test Initial Text"} errors={[]} />);
    
        const submitButton = screen.queryByRole("button", { name: /Submit/i });
    
        const user = userEvent.setup();
        
        await user.click(submitButton);
    
        expect(onSubmit).toHaveBeenCalled();
    })

    it("Doesn't call onSubmit when form hasn't been submitted", async () => {
        const onSubmit = vi.fn(() => {});
        render(<BlogForm onSubmit={onSubmit} initialTitle={"Test Initial Title"} initialText = {"Test Initial Text"} errors={[]} />);

        expect(onSubmit)
            .not.toHaveBeenCalled();
            
    })

    it("Calls onSubmit with provided field values", async () => {
        const onSubmit = vi.fn(() => {});
        render(<BlogForm onSubmit={onSubmit} initialTitle={"Test Initial Title"} initialText={"Test Initial Text"} errors={[]} />);

        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.click(submitButton);

        expect(onSubmit)
            .toHaveBeenCalledWith("Test Initial Title", "Test Initial Text");
    })

    it("Calls onSubmit with different provided field values", async () => {
        const onSubmit = vi.fn(() => {});
        render(<BlogForm onSubmit={onSubmit} initialTitle={"Test Different Initial Title"} initialText={"Test Different Initial Text"} errors={[]} />);

        const submitButton = screen.queryByRole("button", { name: /Submit/i });
        
        const user = userEvent.setup();

        await user.click(submitButton);
        
        expect(onSubmit)
            .toHaveBeenCalledWith("Test Different Initial Title", "Test Different Initial Text");
    })

    it("Calls onSubmit with typed in field values", async () => {
        const onSubmit = vi.fn(() => {});
        render(<BlogForm onSubmit={onSubmit} initialTitle={""} initialText={""} errors={[]} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Typed In Title");
        await user.type(textInput, "Test Typed In Text");

        await user.click(submitButton);

        expect(onSubmit).toHaveBeenCalledWith("Test Typed In Title", "Test Typed In Text");
    })

    it("Calls onSubmit with different typed in values", async () => {
        const onSubmit = vi.fn(() => {});

        render(<BlogForm onSubmit={onSubmit} initialTitle={""} initialText={""} errors={[]} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();
        
        await user.type(titleInput, "Test Different Typed In Title");
        await user.type(textInput, "Test Different Typed In Text");

        await user.click(submitButton);

        expect(onSubmit).toHaveBeenCalledWith("Test Different Typed In Title", "Test Different Typed In Text");
    })
})

describe("Errors", () => {
    it("Sets provided error", () => {
        const errors = [
            { field: "title", message: "Test Title Error" }
        ]

        render(<BlogForm onSubmit={() => {}} initialTitle={""} initialText={""} errors={errors} />);

        expect(screen.queryByText(/Test Title Error/i))
            .toBeInTheDocument();
    })
})