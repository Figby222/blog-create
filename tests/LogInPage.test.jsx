import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../lib/testing-utils.jsx";
import LogInPage from "../src/components/LogInPage.jsx";
import userEvent from "@testing-library/user-event";

describe("LogInPage existence", () => {
    it("Exists", () => {
        expect(LogInPage).toBeDefined();
    })
    
    it("Is a function", () => {
        expect(LogInPage).toBeTypeOf("function");
    })
})

describe("Username field", () => {
    it("Exists", () => {
        render(<LogInPage logInUser={() => {}} storeBearerToken={() => {}} />);
        
        expect(screen.queryByText(/Username/i)).toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<LogInPage logInUser={() => {}} storeBearerToken={() => {}} />);

        expect(screen.queryByLabelText(/Username/i))
            .toBeInTheDocument();
    })
})

describe("Email field", () => {
    it("Exists", () => {
        render(<LogInPage logInUser={() => {}} storeBearerToken={() => {}} />);

        expect(screen.queryByText(/Email/i)).toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<LogInPage logInUser={() => {}} storeBearerToken={() => {}} />);

        expect(screen.queryByLabelText(/Email/i)).toBeInTheDocument();
    })
})

describe("Password field", () => {
    it("Exists", () => {
        render(<LogInPage logInUser={() => {}} storeBearerToken={() => {}} />);

        expect(screen.queryByText(/Password/i)).toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<LogInPage logInUser={() => {}} storeBearerToken={() => {}} />);

        expect(screen.queryByLabelText(/Password/i))
            .toBeInTheDocument();
    })
})

describe("Submit button", () => {
    it("Exists", () => {
        render(<LogInPage logInUser={() => {}} storeBearerToken={() => {}} />);

        expect(screen.queryByRole("button"))
            .toBeInTheDocument();
    })

    it("Has submit text", () => {
        render(<LogInPage logInUser={() => {}} storeBearerToken={() => {}} />);
        expect(screen.queryByRole("button").textContent)
            .toMatch(/Submit/i);
    })
})

describe("Submitting the form", () => {
    it("Calls logInUser on submit", async () => {
        const onSubmit = vi.fn(() => ({}));
        render(<LogInPage logInUser={onSubmit} storeBearerToken={() => {}} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText(/Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testValidUsername");
        await user.type(emailInput, "testValidEmail@figby.net");
        await user.type(passwordInput, "testValidPassword4444");

        await user.click(submitButton);

        expect(onSubmit).toHaveBeenCalled();

        

    })

    it("Doesn't call logInUser not on submit", async () => {
        const onSubmit = vi.fn(() => ({}));

        render(<LogInPage logInUser={onSubmit} storeBearerToken={() => {}} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText(/Password/i);

        const user = userEvent.setup();

        await user.type(usernameInput, "testValidUsername");
        await user.type(emailInput, "testValidEmail@figby.net");
        await user.type(passwordInput, "testValidPassword4444");

        expect(onSubmit)
            .not.toHaveBeenCalled();
    })

    it("Calls logInUser with credentials", async () => {
        const onSubmit = vi.fn(() => ({}));

        render(<LogInPage logInUser={onSubmit} storeBearerToken={() => {}} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText(/Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testValidUsername");
        await user.type(emailInput, "testValidEmail@figby.net")
        await user.type(passwordInput, "testValidPassword4444");

        await user.click(submitButton);

        expect(onSubmit).toHaveBeenCalledWith("testValidUsername", "testValidEmail@figby.net", "testValidPassword4444");
    })

    it("Calls logInUser with different credentials", async () => {
        const onSubmit = vi.fn(() => ({}));
        render(<LogInPage logInUser={onSubmit} storeBearerToken={() => {}} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText(/Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testDifferentValidUsername");
        await user.type(emailInput, "testDifferentValidEmail@figby.net");
        await user.type(passwordInput, "testDifferentValidPassword4444");

        await user.click(submitButton);

        expect(onSubmit)
            .toHaveBeenCalledWith(
                "testDifferentValidUsername", 
                "testDifferentValidEmail@figby.net",
                "testDifferentValidPassword4444");
    })

    it("Calls storeBearerToken with valid credentials", async () => {
        const storeBearerToken = vi.fn(() => {});

        const onSubmit = vi.fn(() => ({ token: "Bearer testToken"}));

        render(<LogInPage logInUser={onSubmit} storeBearerToken={storeBearerToken} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText(/Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testValidUsername");
        await user.type(emailInput, "testValidEmail@figby.net")
        await user.type(passwordInput, "testValidPassword4444");

        await user.click(submitButton);

        expect(storeBearerToken)
            .toHaveBeenCalled();
    })

    it("Only calls storeBearerToken on submit", async () => {
        const storeBearerToken = vi.fn(() => {});

        const logInUser = vi.fn(() => ({}));

        render(<LogInPage logInUser={logInUser} storeBearerToken={storeBearerToken} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText(/Password/i);

        const user = userEvent.setup();

        await user.type(usernameInput, "testValidUsername");
        await user.type(emailInput, "testValidEmail@figby.net")
        await user.type(passwordInput, "testValidPassword4444");

        expect(storeBearerToken)
            .not.toHaveBeenCalled();
    })

    it("Calls storeBearerToken with token", async () => {
        const storeBearerToken = vi.fn(() => {});

        const logInUser = vi.fn(() => ({ token: "Bearer testToken"}));

        render(<LogInPage logInUser={logInUser} storeBearerToken={storeBearerToken} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText(/Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testValidUsername");
        await user.type(emailInput, "testValidEmail@figby.net")
        await user.type(passwordInput, "testValidPassword4444");

        await user.click(submitButton);

        expect(storeBearerToken)
            .toHaveBeenCalledWith("Bearer testToken");
    })

    it("Doesn't call storeBearerToken if there is no token", async () => {
        const storeBearerToken = vi.fn(() => {});

        const logInUser = vi.fn(() => ({ errors: [
            { path: "all", msg: "Test Error" }
        ]}));

        render(<LogInPage logInUser={logInUser} storeBearerToken={storeBearerToken} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText(/Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testValidUsername");
        await user.type(emailInput, "testValidEmail@figby.net")
        await user.type(passwordInput, "testValidPassword4444");

        await user.click(submitButton);

        expect(storeBearerToken)
            .not.toHaveBeenCalled();
    })

    it("Calls storeBearerToken() with different token", async () => {
        const storeBearerToken = vi.fn(() => {});
        
        const logInUser = vi.fn(() => ({ token: "Bearer testDifferentToken" }));

        render(<LogInPage logInUser={logInUser} storeBearerToken={storeBearerToken} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const emailInput = screen.queryByLabelText(/Email/i);
        const passwordInput = screen.queryByLabelText(/Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testValidUsername");
        await user.type(emailInput, "testValidEmail@figby.net")
        await user.type(passwordInput, "testValidPassword4444");

        await user.click(submitButton);

        expect(storeBearerToken)
            .not.toHaveBeenCalledWith("Bearer testToken");
        expect(storeBearerToken)
            .toHaveBeenCalledWith("Bearer testDifferentToken");
    })
})

describe("Errors", () => {
    it("Sets Error On Error", async () => {
        const onSubmit = vi.fn(() => ({
            errors: [
                { path: "all", msg: "Test Error Message" }
            ]
        }))
        render(<LogInPage logInUser={onSubmit} storeBearerToken={() => {}} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const passwordInput = screen.queryByLabelText(/Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testInvalidUsername");
        await user.type(passwordInput, "testInvalidPassword4444");

        await user.click(submitButton);
        expect(screen.queryByText(/Test Error Message/i))
            .toBeInTheDocument();
    })

    it("Does not set error if there is no error", async () => {
        const onSubmit = vi.fn(() => ({}));

        render(<LogInPage logInUser={onSubmit} storeBearerToken={() => {}} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const passwordInput = screen.queryByLabelText(/Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testInvalidUsername");
        await user.type(passwordInput, "testInvalidPassword4444");

        await user.click(submitButton);

        expect(screen.queryByText(/Test Error Message/i))
            .not.toBeInTheDocument();
    })

    it("Can show a different error message", async () => {
        const onSubmit = vi.fn(() => ({
            errors: [
                { path: "all", msg: "Test Different Error Message" }
            ]
        }))

        render(<LogInPage logInUser={onSubmit} storeBearerToken={() => {}} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const passwordInput = screen.queryByLabelText(/Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testInvalidUsername");
        await user.type(passwordInput, "testInvalidPassword4444");

        await user.click(submitButton);

        expect(screen.queryByText(/Test Error Message/i))
            .not.toBeInTheDocument();
        
        expect(screen.queryByText(/Test Different Error Message/i))
            .toBeInTheDocument();
    })

    it("Can render multiple errors", async () => {
        const onSubmit = vi.fn(() => ({
            errors: [
                { path: "all", msg: "Test Error Message" },
                { path: "all", msg: "Test Different Error Message" }
            ]
        }))

        render(<LogInPage logInUser={onSubmit} storeBearerToken={() => {}} />);

        const usernameInput = screen.queryByLabelText(/Username/i);
        const passwordInput = screen.queryByLabelText(/Password/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(usernameInput, "testInvalidUsername");
        await user.type(passwordInput, "testInvalidPassword4444");

        await user.click(submitButton);

        expect(screen.queryByText(/Test Error Message/i))
            .toBeInTheDocument();
        expect(screen.queryByText(/Test Different Error Message/i))
            .toBeInTheDocument();
    })
})

describe("Links", () => {
    it("Renders a link", () => {
        const onSubmit = vi.fn(() => ({}));

        const mockStoreBearerToken = vi.fn(() => ({}));

        render(<LogInPage logInUser={onSubmit} storeBearerToken={mockStoreBearerToken} />);

        const links = screen.queryAllByRole("link");

        expect(links.length).toBeGreaterThanOrEqual(1);
    })
})