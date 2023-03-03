import { optionItemProps } from "../../App";

export default interface DropdownProps {
	focusIndex: number;
	activeIndex: number;
	list: optionItemProps[];
	optionsRef: React.RefObject<HTMLUListElement>;
	optionItemsRef: React.MutableRefObject<React.RefObject<HTMLLIElement>[]>;
	onClickItemHandler: (item: optionItemProps, i: number) => void;
}
