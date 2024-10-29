import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorPage from "../src/components/ErrorPage.jsx";
import { MemoryRouter, createMemoryRouter, RouterProvider } from "react-router-dom";

describe("Error Page", () => {
    it("Exists", () => {
        expect(ErrorPage).toBeDefined();
    });
    
    it("Is a function", () => {
        expect(ErrorPage).toBeTypeOf("function");
    });

    it("Renders a heading", () => {
        
        const ThrowError = () => {
            const error = new Error("AAAA")
            error.status = 404;
            throw error;
        }

        const routes = [
            {
                path: "/",
                element: <ThrowError />,
                errorElement: <ErrorPage />
            }
        ]
    
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/" ]
        });

        render(<RouterProvider router={router} />);

        const headings = screen.queryAllByRole("heading");

        expect(headings.length).toBeGreaterThanOrEqual(1);
    })

    it("Renders a heading with error status code", () => {
        const ThrowError = () => {
            const error = new Error();
            error.status = 404;
            throw error;
        }

        const status = 404;

        const routes = [
            {
                path: "/",
                element: <ThrowError />,
                errorElement: <ErrorPage />
            }
        ]
    
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/" ]
        });

        render(<RouterProvider router={router} />);

        



        
        const heading = screen.queryByRole(
            "heading", 
            { name: /404/i }
        );

        expect(heading).toBeInTheDocument();
    })

    it("Renders error with different status", () => {

        const ThrowError = () => {
            const error = new Error("AAAA");
            error.status = 403;
            throw error;
        }
        const status = 403;

        const routes = [
            {
                path: "/",
                element: <ThrowError />,
                errorElement: <ErrorPage />
            }
        ]
    
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/" ]
        });

        render(<RouterProvider router={router} />);

        const heading = screen.queryByRole(
            "heading",
            { name: /403/i },
        );
        
        expect(heading).toBeInTheDocument();
    })

    it("Renders a heading with the error message", () => {
        const ThrowError = () => {
            const error = new Error("Error Message");
            error.status = 404;
            throw error;
        }
        const errorMessage = "Error Message";

        const routes = [
            {
                path: "/",
                element: <ThrowError />,
                errorElement: <ErrorPage />
            }
        ]
    
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/" ]
        });

        render(<RouterProvider router={router} />);

        const messageHeading = screen.queryByRole(
            "heading",
            { name: /Error Message/i },
        )

        expect(messageHeading).toBeInTheDocument();
    })

    it("Renders heading with a different error message", () => {
        const ThrowError = () => {
            const error = new Error("Not Found");
            error.status = 404;
            throw error;
        }

        const errorMessage = "Not Found";

        const routes = [
            {
                path: "/",
                element: <ThrowError />,
                errorElement: <ErrorPage />
            }
        ]
    
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/" ]
        });

        render(<RouterProvider router={router} />);

        const messageHeading = screen.queryByRole(
            "heading",
            { name: /Not Found/i },
        );

        expect(messageHeading).toBeInTheDocument();
    })

    it("Renders a link", () => {
        const ThrowError = () => {
            const error = new Error("AAAA");
            error.status = 404;
            throw error;
        }
        const routes = [
            {
                path: "/",
                element: <ThrowError />,
                errorElement: <ErrorPage />
            }
        ]
    
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/" ]
        });

        render(<RouterProvider router={router} />);

        const links = screen.queryAllByRole("link");

        expect(links.length).toBeGreaterThanOrEqual(1);
    })

    it(`Renders a link with "home" text`, () => {
        const ThrowError = () => {
            const error = new Error("AAAA");
            error.status = 404;
            throw error;
        }
        const routes = [
            {
                path: "/",
                element: <ThrowError />,
                errorElement: <ErrorPage />
            }
        ]
    
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/" ]
        });

        render(<RouterProvider router={router} />);

        const link = screen.queryByRole(
            "link",
            { name: /home/i},
        );

        expect(link).toBeInTheDocument();
    })
})

describe("Throwing an error from component", () => {
    it("Renders the correct details", () => {
        const ThrowError = () => {
            const error = new Error("You are not authorized to view this resource");
            error.status = 403;
            throw error;
        }
        const routes = [
            {
                path: "/",
                element: <ThrowError />,
                errorElement: <ErrorPage />
            }
        ]
    
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/" ]
        });
    
        render(<RouterProvider router={router} />);

        expect(screen.queryByText(/403/i))
            .toBeInTheDocument();
        expect(screen.queryByText(/You are not authorized to view this resource/i))
            .toBeInTheDocument();
    })

    it("Renders resource not found error on 404 status", () => {
        const ThrowError = () => {
            const error = new Error("Target resource not found");
            error.status = 404;
            throw error;
        }

        const routes = [
            {
                path: "/",
                element: <ThrowError />,
                errorElement: <ErrorPage />
            }
        ]
    
        const router = createMemoryRouter(routes, {
            initialEntries: [ "/" ]
        });

        render(<RouterProvider router={router} />);

        expect(screen.queryByText(/403/i))
            .not.toBeInTheDocument();
        expect(screen.queryByText(/You are unauthorized to view this resource/i))
            .not.toBeInTheDocument();

        expect(screen.queryByText(/404/i))
            .toBeInTheDocument();
        expect(screen.queryByText(/Target resource not found/i))
            .toBeInTheDocument();
    })


})