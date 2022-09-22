import axios from "axios";
import { TPost } from "../pages";

const BASE_URL = `https://jsonplaceholder.typicode.com`;
const getPosts = async (): Promise<TPost[]> => {
	try {
		const res = await axios.get(`${BASE_URL}/posts`);
		return res.data.slice(90);
	} catch (e) {
		throw e;
	}
};

const createPost = async (payload: TPost): Promise<TPost> => {
	try {
		const res = await axios.post(`${BASE_URL}/posts`, payload, {
			headers: { "Content-type": "application/json; charset=UTF-8" },
		});
		return res.data;
	} catch (e) {
		throw e;
	}
};

const updatePost = async () => {};

const deletePost = async (id: number) => {
	try {
		const res = await axios.delete(`${BASE_URL}/posts/${id}`);
		return res.data;
	} catch (e) {
		throw e;
	}
};

export { getPosts, createPost, updatePost, deletePost };
