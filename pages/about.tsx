import styles from "../styles/Home.module.scss";
import Link from "next/link";
export default function About() {
	return (
		<main className={styles.main}>
			<h1>About</h1>
			<p>This page is a static page whose content doesn't change often, which makes it perfect for snapshot test</p>
			<p>Always use snapshot tests for static pages, cause that way you can know when details in the page change</p>
			<Link href="/">Go Home</Link>
		</main>
	);
}
