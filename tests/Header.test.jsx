import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../lib/testing-utils";
import Header from "../src/components/Header.jsx";

describe("Header existence", () => {
    it("Exists", () => {
        expect(Header).toBeDefined();
    })

    it("Is a function", () => {
        expect(Header).toBeTypeOf("function");
    })
})

describe("Links", () => {
    it("Renders a link", () => {
        const links = [
            {
                name: "Blogs",
                path: "/blogs",
                isCurrentPage: false,
            }
        ]

        render(<Header links={links} loggedInUser={null} />);

        const renderedLinks = screen.queryAllByRole("link");

        expect(renderedLinks.length).toBeGreaterThanOrEqual(1);
    })

    it("Doesn't render a link without links set", () => {
        const links = [];
        
        render(<Header links={links} loggedInUser={null} />);

        const renderedLinks = screen.queryAllByRole("link");
        
        expect(renderedLinks.length).not.toBeGreaterThanOrEqual(1);
    })

    it("Renders link with correct content", () => {
        const links = [
            {
                name: "Blogs",
                path: "/blogs",
                isCurrentPage: false,
            }
        ]

        render(<Header links={links} loggedInUser={null} />);

        expect(screen.queryByRole("link", { name: /Blogs/i }))
            .toBeInTheDocument();
    })

    it("Renders link with different content", () => {
        const links = [
            {
                name: "Sign Up",
                path: "/sign-up",
                isCurrentPage: false,
            }
        ]

        render(<Header links={links} loggedInUser={null} />);

        expect(screen.queryByRole("link", { name: /Blogs/i }))
            .not.toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /Sign Up/i }))
            .toBeInTheDocument();
    })

    it("Can render multiple links", () => {
        const links = [
            {
                name: "Blogs",
                path: "/blogs",
                isCurrentPage: false,
            },
            {
                name: "Sign Up",
                path: "/sign-up",
                isCurrentPage: false,
            }
        ]

        render(<Header links={links} loggedInUser={null} />);

        expect(screen.queryByRole("link", { name: /Blogs/i }))
            .toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /Sign Up/i }))
            .toBeInTheDocument();
    })



})

describe("Title", () => {
    it("Renders a heading", () => {
        const links = [];

        render(<Header links={links} loggedInUser={null} />);

        const headings = screen.queryAllByRole("heading");

        expect(headings.length).toBeGreaterThanOrEqual(1);
    })

    it("Renders a heading for title", () => {
        const links = [];

        render(<Header links={links} loggedInUser={null} />);

        expect(screen.queryByRole("heading", { name: /Figby/i }))
            .toBeInTheDocument();
    })
})