import styles from "./styles.module.scss";

export default function Post({
	id,
	body,
	handleDeletePost,
}: {
	id: number;
	body: string;
	handleDeletePost: (id: number) => void;
}) {
	return (
		<article className={styles.card}>
			<p className={styles.text}>{body}</p>

			<div className={styles.footer}>
				<p>ID: {id}</p>
				<div className={styles.btnWrapper}>
					<button>Edit</button>
					<button onClick={() => handleDeletePost(id)}>Delete</button>
				</div>
			</div>
		</article>
	);
}
