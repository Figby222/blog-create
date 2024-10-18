import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../lib/testing-utils.jsx";
import BlogForm from "../src/components/BlogForm.jsx";

describe("BlogForm existence", () => {
    it("Exists", () => {
        expect(BlogForm).toBeDefined();
    })
})