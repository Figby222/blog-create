import { describe, it, expect, vi } from "vitest";
import { screen, render as _render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const render = (component) => {
    return _render(<MemoryRouter>
        { component }
    </MemoryRouter>)
}

const getUseAllDataMock = (error, loading, data) => {
    return vi.fn(() => {
        return { error, loading, data }
    })
}

export { render, getUseAllDataMock }