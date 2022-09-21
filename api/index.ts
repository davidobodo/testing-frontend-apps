import axios from "axios";

const BASE_URL = `https://jsonplaceholder.typicode.com`;
const getPosts = async () => {
	try {
		const res = await axios.get(`${BASE_URL}/posts`);
		return res.data.slice(0, 10);
	} catch (e) {
		throw e;
	}
};

const createPost = async () => {};

const updatePost = async () => {};

const deletePost = async () => {};

export { getPosts, createPost, updatePost, deletePost };
