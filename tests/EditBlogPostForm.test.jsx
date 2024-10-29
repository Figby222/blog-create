import { describe, it, expect, vi } from "vitest";
import { render as _render, screen } from "@testing-library/react";
import { render, getUseAllDataMock } from "../lib/testing-utils.jsx";
import EditBlogPostForm from "../src/components/EditBlogPostForm.jsx";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

describe("EditBlogPostForm existence", () => {
    it("Exists", () => {
        expect(EditBlogPostForm).toBeDefined();
    })

    it("Is a function", () => {
        expect(EditBlogPostForm).toBeTypeOf("function");
    })
})

describe("useAllData", () => {
    it("Calls useAllData", () => {
        const mockUseAllData = getUseAllDataMock(false, true, null);

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        expect(mockUseAllData).toHaveBeenCalled();
    })
})

describe("Loading", () => {
    it("Renders loading when loading", () => {
        const mockUseAllData = getUseAllDataMock(false, true, null);

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        const loadingElements = screen.queryAllByText(/Loading/i);

        expect(loadingElements.length)
            .toBeGreaterThanOrEqual(1);
    })

    it("Doesn't render loading when not loading", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            comments: [],
        })

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        const loadingElements = screen.queryAllByText(/Loading/i);

        expect(loadingElements.length)
            .not.toBeGreaterThanOrEqual(1);
    })
})

describe("Error", () => {
    it("Throws error on error", () => {
        const error = new Error("Test error");
        error.status = 404;

        console.error = vi.fn(() => ({}));

        const mockUseAllData = getUseAllDataMock({ error: error }, false, null);

        expect(() => render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />))
            .toThrow();
    })

    it("Only renders error on error", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            published: true,
            comments: [],
        });

        expect(() => render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />))
            .not.toThrow();
    })
})

describe("Title", () => {
    it("Exists", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            published: true,
            comments: [],
        })

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        expect(screen.queryByText("Title"))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);


        expect(screen.queryByLabelText(/Title/i))
            .toBeInTheDocument();
    })

    it("Has provided initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        const titleInput = screen.queryByLabelText(/Title/i);

        expect(titleInput.value)
            .toMatch(/Test Title/i);
    })

    it("Has different provided initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Different Title",
            text: "Test Different Text",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        const titleInput = screen.queryByLabelText(/Title/i);

        expect(titleInput.value)
            .not.toMatch(/Test Title/i)
        expect(titleInput.value)
            .toMatch(/Test Different Title/i);
    })

    it("Has typed in value", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        
        const user = userEvent.setup();

        await user.type(titleInput, "Test Typed In Text");

        expect(titleInput.value)
            .toMatch(/Test Typed In Text/i);
    })

    it("Has different typed in value", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        const titleInput = screen.queryByLabelText(/Title/i);

        const user = userEvent.setup();

        await user.type(titleInput, "Test Different Typed In Text");

        expect(titleInput.value)
            .not.toMatch(/Test Typed In Text/i)
        expect(titleInput.value)
            .toMatch(/Test Different Typed In Text/i);
    })
})

describe("Text", () => {
    it("Exists", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        expect(screen.queryByText("Text"))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        expect(screen.queryByLabelText(/Text/i))
            .toBeInTheDocument();
    })

    it("Has provided initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        const textInput = screen.queryByLabelText(/Text/i);

        expect(textInput.value)
            .toMatch(/Test Text/i);
    })

    it("Has different provided initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Different Title",
            text: "Test Different Text",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        const textInput = screen.queryByLabelText(/Text/i);

        expect(textInput.value)
            .not.toMatch(/Test Text/i)
        expect(textInput.value)
            .toMatch(/Test Different Text/i);
    })

    it("Has typed in value", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        const textInput = screen.queryByLabelText(/Text/i);

        const user = userEvent.setup();

        await user.type(textInput, "Test Typed In Text");

        expect(textInput.value)
            .toMatch(/Test Typed In Text/i);
    })

    it("Has different typed in value", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);


        const textInput = screen.queryByLabelText(/Text/i);

        const user = userEvent.setup();

        await user.type(textInput, "Test Different Typed In Value");

        expect(textInput.value)
            .not.toMatch(/Test Typed In Value/i)
        expect(textInput.value)
            .toMatch(/Test Different Typed In Value/i);
    })
})

describe("Submit button", () => {
    it("Exists", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        expect(screen.queryByRole("button", { name: /Submit/i }))
            .toBeInTheDocument();
    })

    it("Has submit text", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            published: true,
            comments: [],
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => ({})} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        expect(screen.queryByRole("button", { name: /Submit/i }).textContent)
            .toMatch(/Submit/i);
    })
})

describe("Submission", () => {
    it("Calls updateBlogPut", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            published: false,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);


        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const publishButton = screen.queryByLabelText(/Publish/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, " Test More Information");
        await user.type(textInput, " Test More Information");
        await user.click(publishButton);

        await user.click(submitButton);

        expect(mockUpdateBlogPut).toHaveBeenCalled();
    })

    it("Only calls updateBlogPut on submit", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        expect(mockUpdateBlogPut)
            .not.toHaveBeenCalled();
    })

    it("Calls updateBlogPut with initial values", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
            published: false,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/4/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.click(submitButton);

        expect(mockUpdateBlogPut)
            .toHaveBeenCalledWith("4", "Test Title", "Test Text", false, "Bearer testToken");
    })

    it("Calls updateBlogPost with different initial values", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Different Title",
            text: "Test Different Text",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/4/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.click(submitButton);

        expect(mockUpdateBlogPut)
            .toHaveBeenCalledWith("4", "Test Different Title", "Test Different Text", true, "Bearer testToken");
    })

    it("Calls updateBlogPost with typed in values", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: false,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/4/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const publishButton = screen.queryByLabelText(/Publish/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });
        
        const user = userEvent.setup();
        
        await user.type(titleInput, "Test Typed In Title");
        await user.type(textInput, "Test Typed In Text");
        await user.click(publishButton);

        await user.click(submitButton);

        expect(mockUpdateBlogPut).toHaveBeenCalledWith("4", "Test Typed In Title", "Test Typed In Text", true, "Bearer testToken");
    })
})

describe("Submission Errors", () => {
    it("Renders submission error", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({
            errors: [
                { path: "title", msg: "Test Title Error"}
            ]
        }));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

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

    it("Renders different submission error", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({
            errors: [
                { path: "Title", msg: "Test Different Title Error" }
            ]
        }));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Invalid Title");
        await user.type(textInput, "Text Invalid Text");

        await user.click(submitButton);

        expect(screen.queryByText(/Test Title Error/i))
            .not.toBeInTheDocument()
        expect(screen.queryByText(/Test Different Title Error/i))
            .toBeInTheDocument();
    })

    it("Renders multiple errors", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({
            errors: [
                { path: "title", msg: "Test Title Error" },
                { path: "title", msg: "Test Different Title Error" }
            ]
        }));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} deletePost={() => ({})} deleteComment={() => ({})} />);

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
    it("Calls getBearerToken on submit", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        })

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={() => ({})} deleteComment={() => ({})} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const publishButton = screen.queryByLabelText(/Publish/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Invalid Title");
        await user.type(textInput, "Test Invalid Text");
        await user.click(publishButton);

        await user.click(submitButton);

        expect(mockGetBearerToken).toHaveBeenCalled();
    })

    it("Calls updateBlogPut with bearer token", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: false,
            comments: [],
        });

        const updateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={updateBlogPut} getBearerToken={mockGetBearerToken} deletePost={() => ({})} deleteComment={() => ({})} />
            }
        ]

        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/4/edit" ],
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

        expect(updateBlogPut)
            .toHaveBeenCalledWith("4", "Test Title", "Test Text", true, "Bearer testToken")
    })

    it("Calls updateBlogPut with different token", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: false,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testDifferentToken");
        
        
        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={() => ({})} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/4/edit" ],
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

        expect(mockUpdateBlogPut)
            .not.toHaveBeenCalledWith("Test Title", "Test Text", true, "Bearer testToken")
        expect(mockUpdateBlogPut)
            .toHaveBeenCalledWith("4", "Test Title", "Test Text", true, "Bearer testDifferentToken");
    })
})

describe("Delete button", () => {
    it("Exists", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        })

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/4/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        expect(screen.queryByRole("button", { name: "Delete"} )).toBeInTheDocument();

        
    })

    it("Calls deletePost on delete", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/4/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const deleteButton = screen.queryByRole("button", { name: "Delete" });

        const user = userEvent.setup();

        await user.click(deleteButton);

        expect(mockDeletePost)
            .toHaveBeenCalled();
    })

    it("Only calls deletePost on delete", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/4/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        expect(mockDeletePost)
            .not.toHaveBeenCalled();


    })

    it("Calls deletePost with postId & token", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/4/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const deleteButton = screen.queryByRole("button", { name: "Delete" });

        const user = userEvent.setup();

        await user.click(deleteButton);

        expect(mockDeletePost)
            .toHaveBeenCalledWith("4", "Bearer testToken");
    })

    it("Calls deletePost with different postId", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const deleteButton = screen.queryByRole("button", { name: "Delete" });

        const user = userEvent.setup();

        await user.click(deleteButton);

        expect(mockDeletePost)
            .not.toHaveBeenCalledWith("4", "Bearer testToken");
        expect(mockDeletePost)
            .toHaveBeenCalledWith("5", "Bearer testToken");
    })

    it("Calls deletePost with different token", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testDifferentToken");

        const mockDeletePost = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const deleteButton = screen.queryByRole("button", { name: "Delete" });

        const user = userEvent.setup();

        await user.click(deleteButton);

        expect(mockDeletePost)
            .not.toHaveBeenCalledWith("5", "Bearer testToken");
        expect(mockDeletePost)
            .toHaveBeenCalledWith("5", "Bearer testDifferentToken");


    })
})

describe("Publish button", () => {
    it("Exists", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: false,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />);

        expect(screen.queryByText(/Publish/i))
            .toBeInTheDocument();

    })

    it("Is has an input", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: false,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />);

        expect(screen.queryByLabelText(/Publish/i))
            .toBeInTheDocument();
    })

    it("Has initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />);

        expect(screen.queryByLabelText(/Publish/i).checked)
            .toBe(true);
    })

    it("Has different initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: false,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />);

        expect(screen.queryByLabelText(/Publish/i).checked)
            .toBe(false);
    })

    it("Has user selected value", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: false,
            comments: [],
        })

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateblogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />);

        const publishButton = screen.queryByLabelText(/Publish/i);

        const user = userEvent.setup();

        await user.click(publishButton);

        expect(publishButton.checked)
            .toBe(true);
    })

    it("Has different user selected value", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: false,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));
        
        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />);

        const publishButton = screen.queryByLabelText(/Publish/i);

        const user = userEvent.setup();


        await user.click(publishButton)

        await user.click(publishButton);

        expect(publishButton.checked)
            .toBe(false);
    })
})

describe("Links", () => {
    it("Renders a link", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => null);

        const mockDeletePost = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const links = screen.queryAllByRole("link");

        expect(links.length).toBeGreaterThanOrEqual(1);
    })

    it("Renders a Create link", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => null);

        const mockDeletePost = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        expect(screen.queryByRole("link", { name: /Create/i }))
            .toBeInTheDocument();
    })

    it("Renders a Sign Up link", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => null);
        
        const mockDeletePost = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        expect(screen.queryByRole("link", { name: /Sign Up/i }))
            .toBeInTheDocument();
    })

    it("Renders a Log In link", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => null);

        const mockDeletePost = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });
        
        _render(<RouterProvider router={router} />);

        expect(screen.queryByRole("link", { name: /Log In/i }))
            .toBeInTheDocument();
    })

    it("Renders a blogs link", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        const mockDeleteComment = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={mockDeleteComment} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        expect(screen.queryByRole("link", { name: /Blogs/i }))
            .toBeInTheDocument();
    })
})

describe("title", () => {
    it("Renders a heading", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => null);

        const mockDeletePost = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const headings = screen.queryAllByRole("heading");

        expect(headings.length).toBeGreaterThanOrEqual(1);
    })

    it("Has the correct text", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => null);

        const mockDeletePost = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={() => ({})} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        expect(screen.queryByRole("heading", { name: /Figby/i }))
            .toBeInTheDocument();


    })
})

describe("Comments", () => {
    it("Renders a comment", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [
                {
                    id: 1,
                    creatorId: 1,
                    creator: {
                        username: "TestCreator",
                    },
                    text: "Test Text"
                }
            ]
        });
    
        const mockUpdateBlogPut = vi.fn(() => ({}));
    
        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        const mockDeleteComment = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={mockDeleteComment} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        expect(screen.queryByText(/TestCreator/i))
            .toBeInTheDocument();

        expect(screen.queryByText(/Test Text/i))
            .toBeInTheDocument();
        
        expect(screen.queryByRole("button", { name: /Delete Comment/i }))
            .toBeInTheDocument();

        

    })

    it("Renders a different comment", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [
                {
                    id: 1,
                    creatorId: 1,
                    creator: {
                        username: "TestDifferentCreator",
                    },
                    text: "TestDifferentText",
                }
            ]
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        const mockDeleteComment = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={mockDeleteComment} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        expect(screen.queryByText(/TestCreator/i))
            .not.toBeInTheDocument();
        expect(screen.queryByText(/TestText/i))
            .not.toBeInTheDocument();

        expect(screen.queryByText(/TestDifferentCreator/i))
            .toBeInTheDocument();
        expect(screen.queryByText(/TestDifferentText/i))
            .toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /Delete Comment/i }))
            .toBeInTheDocument();


    })

    it("Can render multiple comments", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [
                {
                    id: 1,
                    creatorId: 1,
                    creator: {
                        username: "TestCreator",
                    },
                    text: "Test Text",
                },
                {
                    id: 2,
                    creatorId: 2,
                    creator: {
                        username: "TestDifferentCreator",
                    },
                    text: "TestDifferentText"
                }
            ]
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        const mockDeleteComment = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={mockDeleteComment} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const deleteButtons = screen.queryAllByRole("button", {name: /Delete Comment/i });

        expect(screen.queryByText(/TestCreator/i))
            .toBeInTheDocument();
        expect(screen.queryByText(/Test Text/i))
            .toBeInTheDocument();

        expect(screen.queryByText(/TestDifferentCreator/i))
            .toBeInTheDocument();
        expect(screen.queryByText(/TestDifferentText/i))
            .toBeInTheDocument();

        expect(deleteButtons.length).toBeGreaterThanOrEqual(2);


    })
    
    it("Calls deleteComment on delete", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [
                {
                    id: 1,
                    creatorId: 1,
                    creator: {
                        creator: "TestCreator",
                    },
                    text: "TestText",
                }
            ]
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        const mockDeleteComment = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={mockDeleteComment} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const deleteCommentButton = screen.queryByRole("button", { name: /Delete Comment/i });

        const user = userEvent.setup();

        await user.click(deleteCommentButton);

        expect(mockDeleteComment)
            .toHaveBeenCalled();

        


    })

    it("Only calls deleteComment on delete", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [
                {
                    id: 1,
                    creatorId: 1,
                    creator: {
                        creator: "TestCreator",
                    },
                    text: "Test Text",
                }
            ]
        })
        
        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        const mockDeleteComment = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={mockDeleteComment} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        expect(mockDeleteComment)
            .not.toHaveBeenCalled();
    })

    it("Calls deleteComment with correct args", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [
                {
                    id: 1,
                    creatorId: 1,
                    creator: {
                        creator: "TestCreator",
                    },
                    text: "Test Text",
                }
            ],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));
        
        const mockDeleteComment = vi.fn(() => ({}));


        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={mockDeleteComment} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/4/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const deleteCommentButton = screen.queryByRole("button", { name: /Delete Comment/i });

        const user = userEvent.setup();

        await user.click(deleteCommentButton);

        expect(mockDeleteComment)
            .toHaveBeenCalledWith("4", 1, "Bearer testToken");

    })

    it("Calls deleteComment with different args", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [
                {
                    id: 2,
                    creatorId: 2,
                    creator: {
                        username: "TestDifferentCreator",
                    },
                    text: "TestDifferentText"
                }
            ],
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testDifferentToken");

        const mockDeletePost = vi.fn(() => ({}));

        const mockDeleteComment = vi.fn(() => ({}));



        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={mockDeleteComment} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });



        _render(<RouterProvider router={router} />);



        const deleteCommentButton = screen.queryByRole("button", { name: /Delete Comment/i });

        const user = userEvent.setup();

        await user.click(deleteCommentButton);


        expect(mockDeleteComment)
            .not.toHaveBeenCalledWith("4", 1, "Bearer testToken");
        expect(mockDeleteComment)
            .toHaveBeenCalledWith("5", 2, "Bearer testDifferentToken");
    })

    it("Renders a comments heading", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: "",
            published: true,
            comments: [
                {
                    id: 2,
                    creatorId: 2,
                    creator: {
                        username: "Test Comment Creator Username"
                    },
                    text: "Test Comment Text",
                }
            ]
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));
        
        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const mockDeletePost = vi.fn(() => ({}));

        const mockDeleteComment = vi.fn(() => ({}));

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} deletePost={mockDeletePost} deleteComment={mockDeleteComment} />
            }
        ]
        
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/5/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        expect(screen.queryByRole("heading", { name: /Comments/i }))
            .toBeInTheDocument();
    })
})