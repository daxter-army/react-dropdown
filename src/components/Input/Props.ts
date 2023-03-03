import { KeyboardEvent } from "react";
import { optionItemProps } from "../../App";

export default interface InputProps {
	placeholder: string;
	error: {
		isError: boolean;
		errorText: string;
	};
	value: string;
	isActive: number;
	prevValue: string;
	focusIndex: number;
	activeIndex: number;
	options: optionItemProps[];
	isMouseHoverAllowed: boolean;
	valueHandler: (val: string) => void;
	inputRef: React.RefObject<HTMLInputElement>;
	optionsRef: React.MutableRefObject<HTMLUListElement>;
	isActiveHandler: React.Dispatch<React.SetStateAction<boolean>>;
	onKeyDownHandler: (event: KeyboardEvent<HTMLInputElement>) => void;
	onClickItemHandler: (item: optionItemProps, index: number) => void;
	isMouseHoverAllowedHandler: React.Dispatch<React.SetStateAction<boolean>>;
	optionItemsRef: React.MutableRefObject<React.MutableRefObject<HTMLLIElement>[]>;
}