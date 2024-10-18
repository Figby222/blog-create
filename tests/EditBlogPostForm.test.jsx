import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../lib/testing-utils.jsx";
import EditBlogPostForm from "../src/components/EditBlogPostForm.jsx";

describe("EditBlogPostForm existence", () => {
    it("Exists", () => {
        expect(EditBlogPostForm).toBeDefined();
    })
})