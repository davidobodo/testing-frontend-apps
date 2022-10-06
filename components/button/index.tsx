import styles from "./styles.module.scss";

export default function Button({
	onClick,
	children,
	isDisabled = false,
}: {
	children: JSX.Element | string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	isDisabled?: boolean;
}) {
	return (
		<button onClick={onClick} className={styles.button} disabled={isDisabled}>
			{children}
		</button>
	);
}
