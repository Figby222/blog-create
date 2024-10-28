import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render, getUseAllDataMock } from "../lib/testing-utils.jsx";
import Blogs from "../src/components/Blogs.jsx";

describe("Blogs existence", () => {
    it("Exists", () => {
        expect(Blogs).toBeDefined();
    })

    it("Is a function", () => {
        expect(Blogs).toBeTypeOf("function");
    })
})

describe("useAllData", () => {
    it("Calls useAllData", () => {
        const mockUseAllData = getUseAllDataMock(false, true, null);

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(mockUseAllData).toHaveBeenCalled();
    })

    it("Shows loading if loading", () => {
        const mockUseAllData = getUseAllDataMock(false, true, null);

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText(/Loading/i))
            .toBeInTheDocument();
    })

    it("Doesn't show loading if not loading", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: [
                {
                    id: 4,
                    title: "Test Blog Title",
                    username: "Test Blog Username",
                    published: true,
                }
            ]
        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText(/Loading/i))
            .not.toBeInTheDocument();
    })
})

describe("Blog list", () => {
    it("Renders a Blog Title", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: [
                {
                    id: 4,
                    title: "Test Blog Title",
                    username: "Test Blog Username",
                    published: true,     
                }
            ]
        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText(/Test Blog Title/i)).toBeInTheDocument();
    })

    it("Renders a different Blog Title", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: [
                {
                    id: 4,
                    title: "Test Different Blog Title",
                    username: "Test Blog Username",
                    published: true,
                }
            ]
        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText("Test Blog Title"))
            .not.toBeInTheDocument();

        expect(screen.queryByText(/Test Different Blog Title/i))
            .toBeInTheDocument();
    })

    it("Renders a username text", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: [
                {
                    id: 4,
                    title: "Test Blog Title",
                    username: "Test Blog Username",
                    published: true,
                }
            ]
        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText(/Test Blog Username/i))
            .toBeInTheDocument();
    })

    it("Renders different username text", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: [
                {
                    id: 4,
                    title: "Test Blog Title",
                    username: "Test Different Blog Username",
                    published: true,
                }
            ]
        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText(/Test Blog Username/i))
            .not.toBeInTheDocument();

        expect(screen.queryByText(/Test Different Blog Username/i))
            .toBeInTheDocument();
    })

    it("Renders multiple Blog Items", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: [
                {
                    id: 4,
                    title: "Test Blog Title",
                    username: "Test Blog Username",
                    published: true,
                },
                {
                    id: 4,
                    title: "Test Different Blog Title",
                    username: "Test Different Blog Username",
                    published: true,
                }
            ]
        })

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByText(/Test Blog Title/i))
            .toBeInTheDocument();
        
            expect(screen.queryByText(/Test Blog Username/i))
                .toBeInTheDocument();

                expect(screen.queryByText(/Test Different Blog Title/i))
                    .toBeInTheDocument();

                    expect(screen.queryByText(/Test Different Blog Username/i))
                        .toBeInTheDocument();
    })
})

describe("links", () => {
    it("Renders a link", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: []
        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        const links = screen.queryAllByRole("link");

        expect(links.length).toBeGreaterThanOrEqual(1);
    })

    it("Renders a link for Blogs", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: []
        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByRole("link", { name: /Blogs/i }))
            .toBeInTheDocument();
    })

    it("Renders a link to Sign Up page", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: []
        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByRole("link", { name: /Sign Up/i }))
            .toBeInTheDocument();
    })

    it("Renders a link to Log In page", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: []
        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByRole("link", { name: /Log In/i }))
            .toBeInTheDocument();
    })

    it("Renders a Create link", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: []
        });

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<Blogs useAllData={mockUseAllData} getBearerToken={mockGetBearerToken} />);

        expect(screen.queryByRole("link", { name: /Create/i }))
            .toBeInTheDocument();
    })
})

describe("Title", () => {
    it("Has a heading", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: []
        })
    
        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);
    
        const headings = screen.queryAllByRole("heading");
    
        expect(headings.length).toBeGreaterThanOrEqual(1);
    })

    it("Has the correct text", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: []
        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByRole("heading", { name: /Figby/i }))
            .toBeInTheDocument();
    })
})

describe("Blog Links", () => {
    it("Renders a blog link", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: [
                {
                    id: 4,
                    title: "Test Title",
                    username: "Creator",
                    published: true,
                }
            ]
        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByRole("link", { name: /Test Title/i }))
            .toBeInTheDocument();
    })

    it("Renders a different blog link", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: [
                {
                    id: 5,
                    title: "Test Different Title",
                    username: "Creator",
                    published: true,
                }
            ]

        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);
    
        expect(screen.queryByRole("link", { name: /Test Title/i }))
            .not.toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /Test Different Title/i }))
            .toBeInTheDocument();
    })

    it("Renders multiple blog links", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: [
                {
                    id: 4,
                    title: "Test Title",
                    username: "Creator",
                    published: true,
                },
                {
                    id: 5,
                    title: "Test Different Title",
                    username: "Creator",
                    published: true,
                }
            ]
        });

        render(<Blogs useAllData={mockUseAllData} getBearerToken={() => "Bearer testToken"} />);

        expect(screen.queryByRole("link", { name: /Test Title/i }))
            .toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /Test Different Title/i }))
            .toBeInTheDocument();
    })
})

describe("Using bearer token", () => {
    it("Calls getBearerToken", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: []
        });

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<Blogs useAllData={mockUseAllData} getBearerToken={mockGetBearerToken} />);

        expect(mockGetBearerToken)
            .toHaveBeenCalled();
    })

    it("Calls useAllData with bearer token", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: []
        });

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<Blogs useAllData={mockUseAllData} getBearerToken={mockGetBearerToken} />);

        expect(mockUseAllData)
            .toHaveBeenCalledWith("Bearer testToken");
    })

    it("Calls useAllData with different token", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: []
        });

        const mockGetBearerToken = vi.fn(() => "Bearer testDifferentToken");

        render(<Blogs useAllData={mockUseAllData} getBearerToken={mockGetBearerToken} />);

        expect(mockUseAllData)
            .not.toHaveBeenCalledWith("Bearer testToken");
        expect(mockUseAllData)
            .toHaveBeenCalledWith("Bearer testDifferentToken")
    })
});

describe("Published status", () => {
    it("Renders unpublished if unpublished", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: [
                {
                    title: "Test Title",
                    text: "Test Text",
                    username: "Creator",
                    published: false,
                }
            ]
        });

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<Blogs useAllData={mockUseAllData} getBearerToken={mockGetBearerToken} />);

        expect(screen.queryByText("Unpublished"))
            .toBeInTheDocument();
    })

    it("Renders published if published", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: [
                {
                    title: "Test Different Title",
                    text: "Test Different Text",
                    username: "Creator",
                    published: true,
                },
            ],
        });

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<Blogs useAllData={mockUseAllData} getBearerToken={mockGetBearerToken} />);

        expect(screen.queryByText("Unpublished"))
            .not.toBeInTheDocument();
        expect(screen.queryByText("Published"))
            .toBeInTheDocument();
    })

    it("Renders multiple published paragraphs", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            blogs: [
                {
                    title: "Test Title",
                    text: "Test Text",
                    username: "Creator",
                    published: false,
                },
                {
                    title: "Test Different Title",
                    text: "Test Different Text",
                    username: "Creator",
                    published: true,
                },
            ]
        });

        const mockGetBearerToken = vi.fn(() => "Bearer testToken");

        render(<Blogs useAllData={mockUseAllData} getBearerToken={mockGetBearerToken} />);

        expect(screen.queryByText("Unpublished"))
            .toBeInTheDocument();
        expect(screen.queryByText("Published"))
            .toBeInTheDocument();
    })
})