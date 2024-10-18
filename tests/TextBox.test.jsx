import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../lib/testing-utils.jsx";
import userEvent from "@testing-library/user-event";
import TextBox from "../src/components/TextBox.jsx";

describe("TextBox existence", () => {
    it("Exists", () => {
        expect(TextBox).toBeDefined();
    })

    it("Is a function", () => {
        expect(TextBox).toBeTypeOf("function");
    })
})

describe("TextBox label", () => {
    it("Exists", () => {
        render(<TextBox label={"Test Label"} placeholder={""} value={""} onChange={() => {}} />)

        expect(screen.queryByText(/Test Label/i)).toBeInTheDocument();
    })

    it("Renders a different value", () => {
        render(<TextBox label={"A Different Label"} placeholder={""} value={""} onChange={() => {}} />)

        expect(screen.queryByText(/Test Label/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/A Different Label/i)).toBeInTheDocument();
    })
})

describe("TextBox textarea", () => {
    it("Exists", () => {
        render(<TextBox label={"Test Label"} placeholder={""} value={""} onChange={() => {}} />);

        expect(screen.queryByRole("textbox")).toBeInTheDocument();
    })

    it("Has placeholder value", () => {
        render(<TextBox label={""} placeholder={"Test Placeholder"} value={""} onChange={() => {}} />)

        expect(screen.queryByRole("textbox").placeholder)
            .toMatch(/Test Placeholder/i);
    })

    it("Has a different placeholder value", () => {
        render(<TextBox label={""} placeholder={"A different placeholder"} value={""} onChange={() => {}} /> );

        const textbox = screen.queryByRole("textbox");

        expect(textbox.placeholder)
            .not.toMatch(/Test Placeholder/i);

        expect(textbox.placeholder)
            .toMatch(/A different placeholder/i);
    })

    it("Has the provided value", () => {
        render(<TextBox label={""} placeholder={""} value={"Test Value"} onChange={() => {}} />);

        expect(screen.queryByRole("textbox").value)
            .toMatch(/Test Value/i);
    })

    it("Has a different value", () => {
        render(<TextBox label={""} placeholder={""} value={"A different value"} onChange={() => {}} />);

        const textbox = screen.queryByRole("textbox");

        expect(textbox.value).not.toMatch(/Test Value/i);
        expect(textbox.value).toMatch(/A different value/i);
    })

    it("Calls onChange on change", async () => {
        const onChange = vi.fn(() => {});
        render(<TextBox label={""} placeholder={""} value={""} onChange={onChange} />);

        const user = userEvent.setup();

        const textbox = screen.queryByRole("textbox");

        await user.type(textbox, "Test Text");

        expect(onChange).toHaveBeenCalled();
    })

    it.skip("Calls onChange with value", async () => {
        const onChange = vi.fn(() => {});
        render(<TextBox label={""} placeholder={""} value={""} onChange={onChange} />);

        const user = userEvent.setup();

        const textbox = screen.queryByRole("textbox");

        await user.type(textbox, "Test Text");

        expect(onChange).toHaveBeenCalledWith("Test Text");
    })

    it.skip("Calls onChange with a different value", async () => {
        const onChange = vi.fn(() => {});
        render(<TextBox label={""} placeholder={""} value={""} onChange={onChange} />);

        const user = userEvent.setup();

        const textbox = screen.queryByRole("textbox");

        await user.type(textbox, "Different Text");

        expect(onChange).not.toHaveBeenCalledWith("Test Text");
        expect(onChange).toHaveBeenCalledWith("Different Text");
    })
})