import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { createPost, getPosts } from "../api";
import styles from "../styles/Home.module.scss";

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
	const [inputValue, setInputValue] = useState("");
	const handleSubmit = async () => {
		try {
			const res = await createPost({
				title: new Date().toString(),
				body: inputValue,
				userId: 1,
				id: posts.length + 1,
			});

			const clonedPosts: TPost[] = JSON.parse(JSON.stringify(posts));
			const updatedPosts = [res, ...clonedPosts];
			setPosts(updatedPosts);
		} catch (e) {
			console.log(e);
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
						<button onClick={handleSubmit}>Submit</button>
					</div>

					<div>
						{isLoadingPosts ? (
							<p>Loading...</p>
						) : (
							posts.map((item) => {
								const { id, body } = item;
								return (
									<a href="https://nextjs.org/docs" className={styles.card} key={item}>
										<p className={styles.text}>{body}</p>

										<div className={styles.footer}>
											<p>ID: {id}</p>
											<div className={styles.btnWrapper}>
												<button>Edit</button>
												<button>Delete</button>
											</div>
										</div>
									</a>
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
