import "@testing-library/jest-dom";
import { Button } from "../components";
import { setupUserEvent, screen } from "../utils/tests";

const onClick = jest.fn();

describe("Button", () => {
	//to be disblaed
	// to have the required children
	// to not be disbaled
	it("Fires event when clicked", async () => {
		const { user } = setupUserEvent(<Button onClick={onClick}>Click</Button>);
		await user.click(screen.getByRole("button"));
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
