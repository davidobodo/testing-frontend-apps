import About from "../pages/about";
import { render } from "../utils/tests";
describe("About page", () => {
	it("Should render with correct details.", () => {
		const { asFragment } = render(<About />);
		expect(asFragment()).toMatchSnapshot();
	});
});
