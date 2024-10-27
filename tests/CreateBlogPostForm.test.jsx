import { describe, it, expect, vi } from "vitest";
import { render as _render, screen } from "@testing-library/react";
import { render } from "../lib/testing-utils.jsx";
import CreateBlogPostForm from "../src/components/CreateBlogPostForm.jsx";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

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
        render(<CreateBlogPostForm createBlogPost={() => ({})} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText("Title"))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<CreateBlogPostForm createBlogPost={() => ({})} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByLabelText(/Title/i))
            .toBeInTheDocument();
    })
})

describe("Text", () => {
    it("Exists", () => {
        render(<CreateBlogPostForm createBlogPost={() => ({})} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText("Text"))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        render(<CreateBlogPostForm createBlogPost={() => ({})} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByLabelText(/Text/i))
            .toBeInTheDocument();
    })
})

describe("Submit button", () => {
    it("Exists", () => {
        render(<CreateBlogPostForm createBlogPost={() => ({})} getBearerToken={() => "Bearer testToken"} />);

        const submitButton = screen.queryByRole("button");
        
        expect(submitButton)
            .toBeInTheDocument();
    })

    it("Has submit text", () => {
        render(<CreateBlogPostForm createBlogPost={() => ({})} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByRole("button").textContent)
            .toMatch(/Submit/i);
    })
})

describe("Submitting the form", () => {
    it("Calls createBlogPost on submit", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={() => "Bearer testToken"} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const publishButton = screen.queryByLabelText(/Publish/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Title");
        await user.type(textInput, "Test Text");
        await user.click(publishButton);

        await user.click(submitButton);

        expect(mockCreateBlogPost).toHaveBeenCalled();
    })

    it("Only calls createBlogPost on submit", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={() => "Bearer testToken"} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const publishButton = screen.queryByLabelText(/Publish/i);

        const user = userEvent.setup();

        await user.type(titleInput, "Text Title");
        await user.type(textInput, "Test Text");
        await user.click(publishButton);

        expect(mockCreateBlogPost)
            .not.toHaveBeenCalled();
    })

    it("Calls createBlogPost with field values", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));
        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={() => "Bearer testToken"} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const publishButton = screen.queryByLabelText(/Publish/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Title");
        await user.type(textInput, "Test Text");
        await user.click(publishButton);
        await user.click(publishButton);
        
        await user.click(submitButton);

        expect(mockCreateBlogPost)
            .toHaveBeenCalledWith("Test Title", "Test Text", false, "Bearer testToken");
    })

    it("Calls createBlogPost with different values", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));
        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={() => "Bearer testToken"} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const publishButton = screen.queryByLabelText(/Publish/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Different Title");
        await user.type(textInput, "Test Different Text");
        await user.click(publishButton);

        await user.click(submitButton);

        expect(mockCreateBlogPost)
            .toHaveBeenCalledWith("Test Different Title", "Test Different Text", true, "Bearer testToken");
    })
})

describe("Errors", () => {
    it("Renders error on error", async () => {
        const mockCreateBlogPost = vi.fn(() => ({
            errors: [
                { path: "title", msg: "Test Title Error" }
            ]
        }));

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={() => "Bearer testToken"} />);

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

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={() => "Bearer testToken"} />);

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
                { path: "title", msg: "Test Different Title Error" }
            ]
        }));

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={() => "Bearer testToken"} />);

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

    it("Can render multiple errors", async () => {
        const mockCreateBlogPost = vi.fn(() => ({
            errors: [
                { path: "title", msg: "Test Title Error" },
                { path: "title", msg: "Test Different Title Error" }
            ]
        }));

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={() => "Bearer testToken"} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Invalid Title");
        await user.type(textInput, "Test Invalid Text");

        await user.click(submitButton);

        expect(screen.queryByText(/Test Title Error/i))
            .toBeInTheDocument()
        expect(screen.queryByText(/Test Different Title Error/i))
            .toBeInTheDocument();
    })
})

describe("Using bearer token", () => {
    it("Calls createBlogPost on submit", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));
        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={mockGetBearerToken} />);
        
        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const publishButton = screen.queryByLabelText(/Publish/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Invalid Title");
        await user.type(textInput, "Test Invalid Text");
        await user.click(publishButton);

        await user.click(submitButton);

        expect(mockGetBearerToken)
            .toHaveBeenCalled();
    })

    it("Calls createBlogPost with bearer token", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));
        const mockGetBearerToken = vi.fn(() => "Bearer testToken");
        const routes = [
            {
                path: "/posts/create",
                element: <CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={mockGetBearerToken} />
            }
        ]

        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/create" ]
        });

        _render(<RouterProvider router={router} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const publishButton = screen.queryByLabelText(/Publish/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Title");
        await user.type(textInput, "Test Text");
        await user.click(publishButton);

        await user.click(submitButton);

        expect(mockCreateBlogPost)
            .toHaveBeenCalledWith("Test Title", "Test Text", true, "Bearer testToken")
    })

    it("Calls createBlogPost with different token", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));
        const mockGetBearerToken = vi.fn(() => "Bearer testDifferentToken");
        
        const routes = [
            {
                path: "/posts/create",
                element: <CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={mockGetBearerToken} />
            }
        ]

        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/create" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const publishButton = screen.queryByLabelText(/Publish/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Title");
        await user.type(textInput, "Test Text");
        await user.click(publishButton);

        await user.click(submitButton);

        expect(mockCreateBlogPost)
            .not.toHaveBeenCalledWith("Test Title", "Test Text", true, "Bearer testToken")
        expect(mockCreateBlogPost)
            .toHaveBeenCalledWith("Test Title", "Test Text", true, "Bearer testDifferentToken");
    })
})

describe("Publish button", () => {
    it("Exists", () => {
        const mockCreateBlogPost = vi.fn(() => ({}));
        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={mockGetBearerToken} />);

        expect(screen.queryByText(/Publish/i))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        const mockCreateBlogPost = vi.fn(() => ({}));
        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={mockGetBearerToken} />);

        expect(screen.queryByLabelText(/Publish/i))
            .toBeInTheDocument();
    })

    it("Has user selected value", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));
        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={mockGetBearerToken} />);

        const publishButton = screen.queryByLabelText(/Publish/i);

        const user = userEvent.setup();

        await user.click(publishButton);

        expect(publishButton.checked)
            .toBe(true);
    })

    it("Has different user selected value", async () => {
        const mockCreateBlogPost = vi.fn(() => ({}));
        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={mockGetBearerToken} />);

        const publishButton = screen.queryByLabelText(/Publish/i);

        const user = userEvent.setup();


        await user.click(publishButton);

        
        await user.click(publishButton);

        expect(publishButton.checked)
            .toBe(false);
    })
})

describe("Links", () => {
    it("Renders a link", () => {
        const mockCreateBlogPost = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => null);

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={mockGetBearerToken} />);

        const links = screen.queryAllByRole("link");

        expect(links.length).toBeGreaterThanOrEqual(1);
    })

    it("Renders a Create link", () => {
        const mockCreateBlogPost = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => null);

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={mockGetBearerToken} />);

        expect(screen.queryByRole("link", { name: /Create/i }))
            .toBeInTheDocument();
    })

    it("Renders a Sign Up link", () => {
        const mockCreateBlogPost = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => null);

        render(<CreateBlogPostForm createBlogPost={mockCreateBlogPost} getBearerToken={mockGetBearerToken} />);

        expect(screen.queryByRole("link", { name: /Sign Up/i }))
            .toBeInTheDocument();
    })
})