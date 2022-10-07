import "@testing-library/jest-dom";
import axios from "axios";
import React from "react";
import Home from "../pages/index";
import { postsData } from "../data";
import { setupUserEvent, render, screen, waitForElementToBeRemoved, within } from "../utils/tests";

describe("User", () => {
	it("can see posts when they open the application", async () => {
		// USER SEES TEXT AREA AND POST HEADER
		//Set a custom reponse for our request
		axios.get.mockResolvedValue({ data: postsData });

		//Render a component (Since user would not be executing any actio, we don't need to setup events)
		render(<Home />);

		//Assert that loading text is on the screen
		expect(screen.getByText("Loading...")).toBeInTheDocument();

		//Wait for loading text to be removed off the screen (i.e when our async called completes)
		await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

		//Assert that a network request was made which was called once and with a certain url
		expect(axios.get).toBeCalledTimes(1);
		// expect(axios.get).toBeCalledWith(`https://jsonplaceholder.typicode.com/posts`);

		//Assert that user can see 10 posts by default on the users screen
		const posts = screen.getAllByRole("article");
		expect(posts).toHaveLength(10);
	});

	it("can create post successfully", async () => {
		axios.post.mockResolvedValueOnce({ data: [] });

		const { user } = setupUserEvent(<Home />);

		//Get input field
		const inputField = screen.getByRole("textbox");

		//Type inside input
		await user.type(inputField, "I am updating the field");

		//Get submit button
		const btnSubmit = screen.getByRole("button", { name: "Post" });

		//click submit button
		await user.click(btnSubmit);

		expect(axios.post).toBeCalledTimes(1);

		//Assert that user can now see 11 posts by default on the users screen
		const posts = screen.getAllByRole("article");
		expect(posts).toHaveLength(11);
	});

	it("can edit post", async () => {
		const { user } = setupUserEvent(<Home />);

		//Wait for loading text to be removed off the screen (i.e when our async called completes)
		await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

		//Get first post
		const posts = screen.getAllByRole("article");
		const firstPost = posts[0];

		//Click on edit button
		const focusedElement = within(firstPost);
		const btnEdit = focusedElement.getByRole("button", { name: "Edit" });

		await user.click(btnEdit);

		//Assert that buttons have changed
		expect(focusedElement.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
		expect(focusedElement.getByRole("button", { name: "Submit" })).toBeInTheDocument();
		expect(focusedElement.queryByRole("button", { name: "Edit" })).not.toBeInTheDocument();
		expect(focusedElement.queryByRole("button", { name: "Delete" })).not.toBeInTheDocument();

		const textareField = focusedElement.getByRole("textbox");
		await user.type(textareField, "I am going");

		//Assert that what user typed is added to the end of the existing text
		expect(textareField).toHaveValue(postsData[99].body + "I am going");

		const btnSubmit = focusedElement.getByRole("button", { name: "Submit" });

		await user.click(btnSubmit);

		//Assert that buttons have changed to default state
		expect(focusedElement.queryByRole("button", { name: "Cancel" })).not.toBeInTheDocument();
		expect(focusedElement.queryByRole("button", { name: "Submit" })).not.toBeInTheDocument();
		expect(focusedElement.getByRole("button", { name: "Edit" })).toBeInTheDocument();
		expect(focusedElement.getByRole("button", { name: "Delete" })).toBeInTheDocument();
	});

	it("can delete post", async () => {
		const { user } = setupUserEvent(<Home />);

		//Wait for loading text to be removed off the screen (i.e when our async called completes)
		await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

		const posts = screen.getAllByRole("article");
		const firstPost = posts[0];

		const btnDelete = within(firstPost).getByRole("button", { name: "Delete" });

		await user.click(btnDelete);

		const remainingPosts = screen.getAllByRole("article");
		expect(remainingPosts).toHaveLength(9);
	});
});
