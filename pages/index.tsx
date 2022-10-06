import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useEffect, useState } from "react";
import { createPost, deletePost, getPosts, updatePost } from "../api";
import { Post, Button } from "../components";
export type TPost = {
	title: string;
	body: string;
	userId: number;
	id: number;
};
const Home: NextPage = () => {
	//----------------------------------------------------------
	// GET POSTS
	//----------------------------------------------------------
	const [isLoadingPosts, setIsLoadingPosts] = useState(false);
	const [posts, setPosts] = useState<TPost[]>([]);

	const fetchPosts = async () => {
		setIsLoadingPosts(true);
		try {
			const res = await getPosts();

			const sorted = res.sort((a, b) => {
				return b.id - a.id;
			});
			setPosts(sorted);
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoadingPosts(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	//----------------------------------------------------------
	// CREATE POST
	//----------------------------------------------------------
	const [isCreatingPost, setIsCreatingPost] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const handleCreatePost = async () => {
		if (inputValue.trim().length === 0) {
			alert("Please enter some text");
			return;
		}
		try {
			setIsCreatingPost(true);
			await createPost({
				title: new Date().toString(),
				body: inputValue,
				userId: 1,
				id: posts.length + 1,
			});

			const newData = {
				title: new Date().toString(),
				body: inputValue,
				userId: 1,
				id: posts.length + 1,
			};

			const clonedPosts: TPost[] = JSON.parse(JSON.stringify(posts));
			const updatedPosts = [newData, ...clonedPosts];
			setPosts(updatedPosts);
			setInputValue("");
		} catch (e) {
			console.log(e);
		} finally {
			setIsCreatingPost(false);
		}
	};

	//----------------------------------------------------------
	// DELETE POST
	//----------------------------------------------------------
	const [idToDelete, setIdToDelete] = useState<number | undefined>();
	const handleDeletePost = async (id: number) => {
		setIdToDelete(id);
		try {
			await deletePost(id);
			const clonedPosts: TPost[] = JSON.parse(JSON.stringify(posts));
			const updatePosts = clonedPosts.filter((item) => item.id !== id);
			setPosts(updatePosts);
		} catch (e) {
			console.log(e);
		} finally {
			setIdToDelete(undefined);
		}
	};

	//----------------------------------------------------------
	// EDIT POST
	//----------------------------------------------------------
	const handleEditPost = async (payload: { body: string; id: number }) => {
		const { id, body } = payload;
		try {
			await updatePost(payload);

			const clonedPosts: TPost[] = JSON.parse(JSON.stringify(posts));

			//get edited post
			let editedPostIndex;
			const editedPost = clonedPosts.find((item, i) => {
				if (item.id === id) {
					editedPostIndex = i;
				}
				return item.id === id;
			});

			if (editedPost && typeof editedPostIndex !== "undefined") {
				editedPost.body = body;
				clonedPosts.splice(editedPostIndex, 1, editedPost);
				setPosts(clonedPosts);
			}
		} catch (e) {
			console.log(e);
		} finally {
		}
	};

	return (
		<div>
			<Head>
				<title>Post Feed</title>
				<meta name="description" content="Using mock service worker by David Obodo" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Post Feed</h1>

				<div className={styles.feed}>
					<div className={styles.status}>
						<input
							type="text"
							placeholder="Whats on your mind?"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<Button onClick={handleCreatePost} isDisabled={inputValue.trim().length === 0 || isCreatingPost}>
							{isCreatingPost ? "Posting..." : "Post"}
						</Button>
					</div>

					<div>
						{isLoadingPosts ? (
							<p className={styles.loading}>Loading...</p>
						) : (
							posts.map((item) => {
								const { id, body } = item;
								return (
									<Post
										id={id}
										body={body}
										key={id}
										handleDeletePost={handleDeletePost}
										handleEditPost={handleEditPost}
										isDeleting={id === idToDelete}
									/>
								);
							})
						)}
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
