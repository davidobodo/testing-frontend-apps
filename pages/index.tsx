import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getPosts } from "../api";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
	const [isLoadingPosts, setIsLoadingPosts] = useState(false);
	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		setIsLoadingPosts(true);
		try {
			const res = await getPosts();
			setPosts(res);
			console.log(res);
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoadingPosts(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);
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
						<input type="text" placeholder="Whats on your mind?" />
						<button>Submit</button>
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
