import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render, getUseAllDataMock } from "../lib/testing-utils.jsx";
import EditBlogPostForm from "../src/components/EditBlogPostForm.jsx";

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

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} />);

        expect(mockUseAllData).toHaveBeenCalled();
    })
})

describe("Loading", () => {
    it("Renders loading when loading", () => {
        const mockUseAllData = getUseAllDataMock(false, true, null);

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} />);

        const loadingElements = screen.queryAllByText(/Loading/i);

        expect(loadingElements.length)
            .toBeGreaterThanOrEqual(1);
    })

    it("Doesn't render loading when not loading", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text",
        })

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} />);

        const loadingElements = screen.queryAllByText(/Loading/i);

        expect(loadingElements.length)
            .not.toBeGreaterThanOrEqual(1);
    })
})

describe("Error", () => {
    it("Renders error on error", () => {
        const mockUseAllData = getUseAllDataMock(true, false, null);
        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} />);

        expect(screen.queryByText(/Error/i))
            .toBeInTheDocument();
    })

    it("Only renders error on error", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} />);

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

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} />);

        expect(screen.queryByText("Title"))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} />);


        expect(screen.queryByLabelText(/Title/i))
            .toBeInTheDocument();
    })

    it("Has provided initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} />);

        const titleInput = screen.queryByLabelText(/Title/i);

        expect(titleInput.value)
            .toMatch(/Test Title/i);
    })

    it("Has different provided initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Different Title",
            text: "Test Different Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} />);

        const titleInput = screen.queryByLabelText(/Title/i);

        expect(titleInput.value)
            .not.toMatch(/Test Title/i)
        expect(titleInput.value)
            .toMatch(/Test Different Title/i);
    })
})

describe("Text", () => {
    it("Exists", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} />);

        expect(screen.queryByText("Text"))
            .toBeInTheDocument();
    })

    it("Is has an input", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} />);

        expect(screen.queryByLabelText(/Text/i))
            .toBeInTheDocument();
    })

    it("Has provided initial value", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            title: "Test Title",
            text: "Test Text"
        });

        render(<EditBlogPostForm useAllData={mockUseAllData} updateBlogPut={() => {}} />);

        const textInput = screen.queryByLabelText(/Text/i);

        expect(textInput.value)
            .toMatch(/Test Text/i);
    })
})