import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
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
						{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
							return (
								<a href="https://nextjs.org/docs" className={styles.card} key={item}>
									<p>Find in-depth information about Next.js features and API.</p>

									<div className={styles.btnWrapper}>
										<button>Edit</button>
										<button>Delete</button>
									</div>
								</a>
							);
						})}
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
