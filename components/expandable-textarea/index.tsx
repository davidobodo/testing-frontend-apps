import React, { RefObject, useEffect, useState } from "react";
import styles from "./styles.module.scss";
export default function ExpandableTextarea({
	isDisabled,
	value,
	textareaRef,
	onChange,
}: {
	isDisabled: boolean;
	value: string;
	textareaRef: RefObject<HTMLTextAreaElement>;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
	return (
		<textarea
			className={styles.textarea}
			disabled={isDisabled}
			value={value}
			ref={textareaRef}
			onChange={onChange}
		></textarea>
	);
}
