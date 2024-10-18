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