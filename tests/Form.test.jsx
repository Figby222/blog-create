import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../lib/testing-utils.jsx";
import Form from "../src/components/Form.jsx";
import userEvent from "@testing-library/user-event";

describe("Form existence", () => {
    it("Exists", () =>  {
        expect(Form).toBeDefined();
    })
    
    it("Is a function", () => {
        expect(Form).toBeTypeOf("function");
    })
})

describe("Submit button", () => {
    it("Exists", () => {
        render(<Form submitListener={() => {}} submitButtonText={""}></Form>)

        const submitButton = screen.queryAllByRole("button");


        expect(submitButton.length).toBeGreaterThanOrEqual(1);
    })

    it("Renders given text", () => {
        render(<Form submitListener={() => {}} submitButtonText={"Submit"}></Form>)
        
        const submitButton = screen.queryByRole(
            "button",
            { name: /submit/i }
        );

        expect(submitButton).toBeInTheDocument();
    })

    it("Renders different text", () => {
        render(<Form submitListener={() => {}} submitButtonText={"Send"}></Form>)
        const submitButton = screen.queryByRole(
            "button",
            { name: /send/i }
        );

        expect(submitButton).toBeInTheDocument();
    })
})

describe("Submitting the form", () => {
    it("Calls submitListener when submitted", async () => {
        const onSubmit = vi.fn(() => {})
        render(<Form submitListener={onSubmit} submitButtonText={"Submit"}></Form>)

        const user = userEvent.setup();

        const submitButton = screen.getByRole(
            "button",
            { name: /submit/i }
        );

        await user.click(submitButton);

        expect(onSubmit).toHaveBeenCalled();

    })

    it ("Only calls submitListener when submitted", async () => {
        const onSubmit = vi.fn(() => {});
        render(<Form submitListener={onSubmit} submitButtonText={"Submit"}></Form>);

        expect(onSubmit).not.toHaveBeenCalled();
    })
})

describe("Children", () => {
    it("Renders child paragraph", () => {
        render(
            <Form
                submitListener={() => {}}
                submitButtonText={"Submit"}
            >
                <p>Form paragraph</p>
            </Form>
        );

        const paragraph = screen.queryByText(
            /Form paragraph/i
        );

        expect(paragraph).toBeInTheDocument();
    })

    it("Renders different children", () => {
        render(
            <Form
                submitListener={() => {}}
                submitButtonText={"Submit"}
            >
                <h1>Form heading</h1>
            </Form>
        )

        const heading = screen.queryByRole(
            "heading",
            { name: /Form heading/i }
        );

        expect(heading).toBeInTheDocument();
    })

    it("Only renders provided children", () => {
        render(
            <Form
                submitListener={() => {}}
                submitButtonText={"Submit"}>
                <p>Different paragraph</p>
            </Form>
        )
        const formParagraph = screen.queryByText(/Form paragraph/i);
        const differentParagraph = screen.queryByText(/Different Paragraph/i);
        expect(formParagraph).not.toBeInTheDocument();
        expect(differentParagraph).toBeInTheDocument();
    })
})