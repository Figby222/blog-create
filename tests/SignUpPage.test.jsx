import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../lib/testing-utils.jsx";
import SignUpPage from "../src/components/SignUpPage.jsx";
import userEvent from "@testing-library/user-event";

describe("Sign-Up page existence", () => {
    it("Exists", () => {
        expect(SignUpPage).toBeDefined();;;;
    })
    it("Is a function", () => {
        expect(SignUpPage).toBeTypeOf("function");
    })
})
describe("Username", () => {
    it("Exists", () => {
        render(<SignUpPage createAnAccount={() => ({})} />);
        expect(screen.queryByText(/Username/i)).toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<SignUpPage createAnAccount={() => ({})} />);

        expect(screen.queryByLabelText(/Username/i)).toBeInTheDocument();
    })
})

describe("Email", () => {
    it("Exists", () => {
        render(<SignUpPage createAnAccount={() => ({})} />);

        expect(screen.queryByText(/Email/i)).toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<SignUpPage createAnAccount={() => ({})} />);

        expect(screen.queryByLabelText(/Email/i)).toBeInTheDocument();
    })
})

describe("Password", () => {
    it("Exists", () => {
        render(<SignUpPage createAnAccount={() => ({})} />);
        expect(screen.queryByText("Password")).toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<SignUpPage createAnAccount={() => ({})} />);
        
        expect(screen.queryByLabelText("Password")).toBeInTheDocument();
    })
})

describe("Confirm Password", () => {
    it("Exists", () => {
        render(<SignUpPage createAnAccount={() => ({})} />);
        expect(screen.queryByText(/Confirm Password/i)).toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<SignUpPage createAnAccount={() => ({})} />);

        expect(screen.queryByLabelText(/Confirm Password/i)).toBeInTheDocument();
    })
})

describe("Submit Button", () => {
    it("Exists", () => {
        render(<SignUpPage createAnAccount={() => ({})} />);
        expect(screen.queryByRole("button"))
            .toBeInTheDocument();
    })

    it("Has Submit text", () => {
        render(<SignUpPage createAnAccount={() => ({})} />);
        expect(screen.queryByRole("button").textContent).toMatch(/Submit/i);
    })
})

describe("Submitting the form with valid credentials", () => {
    const setup = async (userDetails, component) => {
        render(<>{ component }</>);
        
        const usernameInput = screen.queryByLabelText(/Username/i);
        const passwordInput = screen.queryByLabelText("Password");
        const confirmPasswordInput = screen.queryByLabelText(/Confirm Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, userDetails.username);
        await user.type(passwordInput, userDetails.password);
        await user.type(confirmPasswordInput, userDetails.password);
        await user.click(submitButton);
    }
    it("Calls createAnAccount", async () => {
        const onSubmit = vi.fn(() => ({}))
        render(<SignUpPage createAnAccount={onSubmit} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText("Password");
        const confirmPasswordInput = screen.queryByLabelText(/Confirm Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testUsername");
        await user.type(emailInput, "testEmail@quom.io");
        await user.type(passwordInput, "testPassword4444");
        await user.type(confirmPasswordInput, "testPassword4444");

        await user.click(submitButton);

        expect(onSubmit)
            .toHaveBeenCalled();
    })

    it("Doesn't call createAnAccount when not submitted", async () => {
        const onSubmit = vi.fn(() => ({}));
        render(<SignUpPage createAnAccount={onSubmit} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText("Password");
        const confirmPasswordInput = screen.queryByLabelText(/Confirm Password/i);

        const user = userEvent.setup();

        await user.type(usernameInput, "testUsername");
        await user.type(emailInput, "testEmail@quom.io");
        await user.type(passwordInput, "testPassword4444");
        await user.type(confirmPasswordInput, "testPassword4444");

        expect(onSubmit).not.toHaveBeenCalled();
    })

    it("Calls createAnAccount with form details", async () => {
        const onSubmit = vi.fn(() => ({}));

        render(<SignUpPage createAnAccount={onSubmit} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText("Password");
        const confirmPasswordInput = screen.queryByLabelText(/Confirm Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testUsername");
        await user.type(emailInput, "testEmail@quom.io")
        await user.type(passwordInput, "testPassword4444");
        await user.type(confirmPasswordInput, "testPassword4444");

        await user.click(submitButton);

        expect(onSubmit).toHaveBeenCalledWith("testUsername", "testEmail@quom.io", "testPassword4444", "testPassword4444");
    })

    it("Calls createAnAccount with different provided values", async () => {
        const onSubmit = vi.fn(() => ({}));
        render(<SignUpPage createAnAccount={onSubmit} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText("Password");
        const confirmPasswordInput = screen.queryByLabelText(/Confirm Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testDifferentUsername");
        await user.type(emailInput, "testDifferentEmail@quom.io")
        await user.type(passwordInput, "testDifferentPassword4444");
        await user.type(confirmPasswordInput, "testDifferentPassword4444");

        await user.click(submitButton);

        expect(onSubmit)
            .not.toHaveBeenCalledWith("testUsername", "testEmail@quom.io", "testPassword4444", "testPassword4444");
        expect(onSubmit)
            .toHaveBeenCalledWith("testDifferentUsername", "testDifferentEmail@quom.io", "testDifferentPassword4444", "testDifferentPassword4444");
    })
})

describe("Errors", () => {
    it("Shows error for username", async () => {
        const onSubmit = vi.fn(() => {
            return {
                errors: [
                    {
                        path: "username",
                        msg: "Test Username Error",
                    }
                ]
            }
        });

        render(<SignUpPage createAnAccount={onSubmit} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const passwordInput = screen.queryByLabelText("Password");
        const confirmPasswordInput = screen.queryByLabelText(/Confirm Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testTakenUsername");
        await user.type(passwordInput, "testDifferentPassword4444");
        await user.type(confirmPasswordInput, "testDifferentPassword4444");

        await user.click(submitButton);
        
        expect(screen.queryByText(/Test Username Error/i))
            .toBeInTheDocument();
    })
    it("Shows a different username error", async () => {
        const onSubmit = vi.fn(() => {
            return {
                errors: [
                    {
                        path: "username",
                        msg: "Test Different Username Error"
                    }
                ]
            }
        })

        render(<SignUpPage createAnAccount={onSubmit} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const passwordInput = screen.queryByLabelText("Password");
        const confirmPasswordInput = screen.queryByLabelText(/Confirm Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testErrorUsername");
        await user.type(passwordInput, "testPassword4444");
        await user.type(confirmPasswordInput, "testPassword4444");

        await user.click(submitButton);

        expect(screen.queryByText(/Test Username Error/i))
            .not.toBeInTheDocument();
        expect(screen.queryByText(/Test Different Username Error/i))
            .toBeInTheDocument();
    })
    it("Only shows error on error", async () => {
        const onSubmit = vi.fn(() => ({}));
        render(<SignUpPage createAnAccount={onSubmit} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const passwordInput = screen.queryByLabelText("Password");
        const confirmPasswordInput = screen.queryByLabelText(/Confirm Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testNotTakenUsername");
        await user.type(passwordInput, "testDifferentPassword4444");
        await user.type(confirmPasswordInput, "testDifferentPassword4444");

        await user.click(submitButton);

        expect(screen.queryByText(/That username is unavailable/i))
            .not.toBeInTheDocument();
    })
    it("Can render multiple errors", async () => {
        const onSubmit = vi.fn(() => {
            return {
                errors: [
                    {
                        path: "Username",
                        msg: "Test Username Error"
                    },
                    {
                        path: "Username",
                        msg: "Test Different Username Error"
                    }
                ]
            }
        })

        render(<SignUpPage createAnAccount={onSubmit} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const passwordInput = screen.queryByLabelText("Password");
        const confirmPasswordInput = screen.queryByLabelText(/Confirm Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "TestErrorUsername");
        await user.type(passwordInput, "TestPassword4444");
        await user.type(confirmPasswordInput, "TestPassword4444");

        await user.click(submitButton);

        expect(screen.queryByText(/Test Username Error/i))
            .toBeInTheDocument();
        expect(screen.queryByText(/Test Different Username Error/i))
            .toBeInTheDocument();
    })
})

describe("Links", () => {
    it("Renders a link", () => {
        const onSubmit = vi.fn(() => ({}));

        render(<SignUpPage createAnAccount={onSubmit} />);

        const links = screen.queryAllByRole("link");

        expect(links.length).toBeGreaterThanOrEqual(1);
    })
})