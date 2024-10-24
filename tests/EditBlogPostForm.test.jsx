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

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        expect(mockUseAllData).toHaveBeenCalled();
    })
})

describe("Loading", () => {
    it("Renders loading when loading", () => {
        const mockUseAllData = getUseAllDataMock(false, true, null);

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        const loadingElements = screen.queryAllByText(/Loading/i);

        expect(loadingElements.length)
            .toBeGreaterThanOrEqual(1);
    })

    it("Doesn't render loading when not loading", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
        })

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        const loadingElements = screen.queryAllByText(/Loading/i);

        expect(loadingElements.length)
            .not.toBeGreaterThanOrEqual(1);
    })
})

describe("Error", () => {
    it("Renders error on error", () => {
        const mockUseAllData = getUseAllDataMock(true, false, null);
        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText(/Error/i))
            .toBeInTheDocument();
    })

    it("Only renders error on error", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText(/Error/i))
            .not.toBeInTheDocument();
    })
})

describe("Title", () => {
    it("Exists", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        })

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText("Title"))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);


        expect(screen.queryByLabelText(/Title/i))
            .toBeInTheDocument();
    })

    it("Has provided initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        const titleInput = screen.queryByLabelText(/Title/i);

        expect(titleInput.value)
            .toMatch(/Test Title/i);
    })

    it("Has different provided initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Different Title",
            text: "Test Different Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        const titleInput = screen.queryByLabelText(/Title/i);

        expect(titleInput.value)
            .not.toMatch(/Test Title/i)
        expect(titleInput.value)
            .toMatch(/Test Different Title/i);
    })

    it("Has typed in value", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: ""
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        
        const user = userEvent.setup();

        await user.type(titleInput, "Test Typed In Text");

        expect(titleInput.value)
            .toMatch(/Test Typed In Text/i);
    })

    it("Has different typed in value", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: ""
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

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
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText("Text"))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByLabelText(/Text/i))
            .toBeInTheDocument();
    })

    it("Has provided initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        const textInput = screen.queryByLabelText(/Text/i);

        expect(textInput.value)
            .toMatch(/Test Text/i);
    })

    it("Has different provided initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Different Title",
            text: "Test Different Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        const textInput = screen.queryByLabelText(/Text/i);

        expect(textInput.value)
            .not.toMatch(/Test Text/i)
        expect(textInput.value)
            .toMatch(/Test Different Text/i);
    })

    it("Has typed in value", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: ""
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        const textInput = screen.queryByLabelText(/Text/i);

        const user = userEvent.setup();

        await user.type(textInput, "Test Typed In Text");

        expect(textInput.value)
            .toMatch(/Test Typed In Text/i);
    })

    it("Has different typed in value", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: ""
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);


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
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByRole("button"))
            .toBeInTheDocument();
    })

    it("Has submit text", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByRole("button").textContent)
            .toMatch(/Submit/i);
    })
})

describe("Submission", () => {
    it("Calls updateBlogPut", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} />);


        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, " Test More Information");
        await user.type(textInput, " Test More Information");

        await user.click(submitButton);

        expect(mockUpdateBlogPut).toHaveBeenCalled();
    })

    it("Only calls updateBlogPut on submit", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} />);

        expect(mockUpdateBlogPut)
            .not.toHaveBeenCalled();
    })

    it("Calls updateBlogPut with initial values", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} />);

        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.click(submitButton);

        expect(mockUpdateBlogPut)
            .toHaveBeenCalledWith("Test Title", "Test Text");
    })

    it("Calls updateBlogPost with different initial values", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Different Title",
            text: "Test Different Text"
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} />);

        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.click(submitButton);

        expect(mockUpdateBlogPut)
            .toHaveBeenCalledWith("Test Different Title", "Test Different Text");
    })

    it("Calls updateBlogPost with typed in values", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: ""
        });

        const mockUpdateBlogPut = vi.fn(() => ({}));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });
        
        const user = userEvent.setup();
        
        await user.type(titleInput, "Test Typed In Title");
        await user.type(textInput, "Test Typed In Text");

        await user.click(submitButton);

        expect(mockUpdateBlogPut).toHaveBeenCalledWith("Test Typed In Title", "Test Typed In Text");
    })
})

describe("Submission Errors", () => {
    it("Renders submission error", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: ""
        });

        const mockUpdateBlogPut = vi.fn(() => ({
            errors: [
                { field: "title", message: "Test Title Error"}
            ]
        }));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} />);

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
            text: ""
        });

        const mockUpdateBlogPut = vi.fn(() => ({
            errors: [
                { field: "Title", message: "Test Different Title Error" }
            ]
        }));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} />);

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
            text: ""
        });

        const mockUpdateBlogPut = vi.fn(() => ({
            errors: [
                { field: "title", message: "Test Title Error" },
                { field: "title", message: "Test Different Title Error" }
            ]
        }));

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={() => "Bearer testToken"} />);

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
            text: ""
        })

        const mockUpdateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={mockUpdateBlogPut} getBearerToken={mockGetBearerToken} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Invalid Title");
        await user.type(textInput, "Test Invalid Text");

        await user.click(submitButton);

        expect(mockGetBearerToken).toHaveBeenCalled();
    })

    it("Calls updateBlogPut with bearer token", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "",
            text: ""
        });

        const updateBlogPut = vi.fn(() => ({}));

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        const routes = [
            {
                path: "/posts/:postId/edit",
                element: <EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={updateBlogPut} getBearerToken={mockGetBearerToken} />
            }
        ]

        const router = createMemoryRouter(routes, {
            initialEntries: [ "/", "/posts/4/edit" ],
            initialIndex: 1
        });

        _render(<RouterProvider router={router} />);

        const titleInput = screen.queryByLabelText(/Title/i);
        const textInput = screen.queryByLabelText(/Text/i);
        const submitButton = screen.queryByRole("button", { name: /Submit/i });

        const user = userEvent.setup();

        await user.type(titleInput, "Test Title");
        await user.type(textInput, "Test Text");

        await user.click(submitButton);

        expect(updateBlogPut)
            .toHaveBeenCalledWith("Test Title", "Test Text", "Bearer testToken")
    })
})