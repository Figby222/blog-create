import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../lib/testing-utils.jsx";
import CreateBlogPostForm from "../src/components/CreateBlogPostForm.jsx";

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
        render(<CreateBlogPostForm createBlogPost={() => ({})} />);

        expect(screen.queryByText(/Title/i))
            .toBeInTheDocument();
    })
})