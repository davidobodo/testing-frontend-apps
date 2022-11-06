import React, { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const Wrapper = ({ children }: { children: ReactNode }) => {
	return <div>{children}</div>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
	render(ui, { wrapper: Wrapper, ...options });

const setupUserEvent = (jsx: JSX.Element) => {
	return {
		user: userEvent.setup(),
		...customRender(jsx),
	};
};

// re-export everything
export * from "@testing-library/react";

export { setupUserEvent };
