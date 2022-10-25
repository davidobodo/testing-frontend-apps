import styles from "./styles.module.scss";
import { useState, useRef, useEffect } from "react";
import { Button, ExpandableTextarea } from "../index";

type Props = {
	id: number;
	body: string;
	handleDeletePost: (id: number) => void;
	handleEditPost: ({ body, id }: { body: string; id: number }) => Promise<void>;
	isDeleting: boolean;
};

export default function Post({ id, body, handleDeletePost, handleEditPost, isDeleting }: Props) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	//------------------------------------------
	//Post mode
	//------------------------------------------
	const [inEditMode, setIsEditMode] = useState(false);
	const onToggleEditMode = () => {
		setIsEditMode(!inEditMode);
	};

	//------------------------------------------
	//Update textarea value when user is editing field
	//------------------------------------------
	const [value, setValue] = useState(body);
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
	};

	const [isEditing, setIsEditing] = useState(false);
	const onEditPost = async () => {
		setIsEditing(true);

		try {
			await handleEditPost({
				body: value,
				id,
			});
		} catch (e) {
			console.log(e);
		} finally {
			setIsEditing(false);
			setIsEditMode(false);
		}
	};

	//------------------------------------------
	//Logic to make textarea update height as user types
	//------------------------------------------
	useEffect(() => {
		const textarea = textareaRef.current;

		if (textarea) {
			textarea.style.height = textarea.scrollHeight + "px";
		}
	}, [value]);

	//------------------------------------------
	//Immediately focus on the text when trying to edit it
	//------------------------------------------
	useEffect(() => {
		if (inEditMode && textareaRef.current) {
			textareaRef.current.focus();
			textareaRef.current.setSelectionRange(body.length, body.length);
		}
	}, [inEditMode, body.length]);

	return (
		<article className={styles.card}>
			<ExpandableTextarea
				isDisabled={inEditMode ? false : true}
				value={value}
				onChange={onChange}
				textareaRef={textareaRef}
			/>
			<div className={styles.footer}>
				<p>ID: {id}</p>
				{inEditMode ? (
					<div className={styles.btnWrapperOne}>
						<Button onClick={onToggleEditMode} isDisabled={isEditing}>
							Cancel
						</Button>
						<Button onClick={onEditPost} isDisabled={isEditing}>
							{isEditing ? "Submitting..." : "Submit"}
						</Button>
					</div>
				) : (
					<div className={styles.btnWrapperTwo}>
						<Button onClick={onToggleEditMode} isDisabled={isDeleting}>
							Edit
						</Button>

						<Button onClick={() => handleDeletePost(id)} isDisabled={isDeleting}>
							{isDeleting ? "Deleting..." : "Delete"}
						</Button>
					</div>
				)}
			</div>
		</article>
	);
}
