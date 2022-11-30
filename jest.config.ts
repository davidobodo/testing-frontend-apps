import nextJest from "next/jest";

const createJestConfig = nextJest({
	dir: "./",
});

const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testEnvironment: "jest-environment-jsdom",
	verbose: true,
	collectCoverage: true,
	coverageThreshold: {
		global: {
			lines: 80,
			functions: 80,
			branches: 80,
			statements: 80,
		},
	},
};

export default createJestConfig(customJestConfig);
