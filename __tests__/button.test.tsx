import "@testing-library/jest-dom";
import { Button } from "../components";
import { setupUserEvent, screen } from "../utils/tests";

const onClick = jest.fn();

describe("Button", () => {
	it("Fires event when clicked", async () => {
		const { user } = setupUserEvent(<Button onClick={onClick}>Click</Button>);
		await user.click(screen.getByRole("button"));
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
