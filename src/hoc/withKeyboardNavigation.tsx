import React, { useState, useRef, useEffect } from 'react'
import { optionItemProps } from '../App';

import { valueMatcher } from "../utils"

// Props being supplied to the component from HOC
export interface InjectedInputProps {
	isActive: boolean;
	prevValue: string;
	activeIndex: number;
	focusIndex: boolean;
	isMouseHoverAllowed: boolean;
	inputRef: React.RefObject<HTMLInputElement>;
	onKeyDownHandler: (e: KeyboardEvent) => void;
	optionsRef: React.RefObject<HTMLUListElement>;
	isActiveHandler: React.Dispatch<React.SetStateAction<boolean>>;
	onClickItemHandler: (item: optionItemProps, idx: number) => void;
	isMouseHoverAllowedHandler: React.Dispatch<React.SetStateAction<boolean>>;
	optionItemsRef: React.MutableRefObject<React.MutableRefObject<HTMLLIElement>[]>;
}

// Props getting getting from the parent component
export interface ReceivedInputProps {
	value: string;
	placeholder: string;
	error: {
		isError: boolean,
		errorText: string
	};
	options: optionItemProps[];
	valueHandler: (val: string) => void;
}

function withKeyboardNavigation<P extends ReceivedInputProps>(WrappedComponent: React.ComponentType<P>) {
	return (props: Omit<P, keyof InjectedInputProps>) => {
		// To preserve previous value
		const cachedValueRef = useRef<string>("");
		// To prevent bi-directional scroll updation, on value change
		const scrollLock = useRef<boolean>(false);
		// Ref for input field
		const inputRef = useRef<HTMLInputElement>(null);
		// Ref for dropdown
		const optionsRef = useRef<HTMLUListElement>(null);
		// Is dropdown active ?
		const [isActive, setIsActive] = useState<boolean>(false);
		// Active hover index
		const [focusIndex, setFocusIndex] = useState<number>(-1);
		// Active item index
		const [activeIndex, setActiveIndex] = useState<number>(-1);
		// Ref for dropdown items
		const optionItemsRef = useRef<React.MutableRefObject<HTMLLIElement>[]>([]);
		// To prevent mouse from interfering scroll updation
		const [isMouseHoverAllowed, setIsMouseHoverAllowed] = useState<boolean>(true);

		// Scroll to given index
		const scrollToSelectedIndex = (i: number) => {
			if (!optionsRef.current || !optionItemsRef.current) return
			console.log("Scrolling to index: ", i)
			optionsRef.current?.scrollTo(0, optionItemsRef.current[i]?.current?.offsetTop)
		}

		// Dropdown item click handler
		const onClickItemHandler = (item: optionItemProps, idx: number) => {
			props.valueHandler(item.label)
			setActiveIndex(idx)
			setIsActive(false)
		}

		// onKeyDownHandler to invoke when keys are pressed
		const onKeyDownHandler = (e: KeyboardEvent) => {
			if (!optionsRef.current || !optionItemsRef.current) return

			const dropdownScrollTop = optionsRef.current?.scrollTop
			const dropdownClientHeight = optionsRef.current?.clientHeight
			const dropdownScrollHeight = optionsRef.current?.scrollHeight
			const dropdownBottom = dropdownScrollTop + dropdownClientHeight

			if (e.key.toLowerCase() === "arrowup") {
				// Do not update scroll when value changes from here
				scrollLock.current = true

				// Pointer events none for the list
				setIsMouseHoverAllowed(false)

				const nextElement = optionItemsRef.current[focusIndex - 1]?.current
				const nextElementTop = nextElement?.offsetTop

				if (focusIndex === 0 || focusIndex === -1) {
					optionsRef.current?.scrollTo(0, dropdownScrollHeight)
					// Last index
					setFocusIndex(props.options.length - 1)
					props.valueHandler(props.options[props.options.length - 1].label)
					return
				}

				const scrollDiff = dropdownBottom - nextElementTop
				if (scrollDiff > dropdownClientHeight) {
					optionsRef.current?.scrollBy(0, dropdownClientHeight - scrollDiff)
				}

				setFocusIndex(focusIndex - 1)
				props.valueHandler(props.options[focusIndex - 1].label)
				return
			}
			else if (e.key.toLowerCase() === "arrowdown") {
				// Do not update scroll when value changes from here
				scrollLock.current = true

				// Pointer events none for the list
				setIsMouseHoverAllowed(false)

				const nextElement = optionItemsRef.current[focusIndex + 1]?.current
				const nextElementTop = nextElement?.offsetTop
				const nextElementHeight = nextElement?.clientHeight
				const nextElementBottom = nextElementTop + nextElementHeight

				if (focusIndex === props.options.length - 1) {
					optionsRef.current?.scrollTo(0, 0)
					setFocusIndex(0)
					props.valueHandler(props.options[0].label)
					return
				}

				const scrollDiff = nextElementBottom - dropdownScrollTop
				if (scrollDiff > dropdownClientHeight) {
					optionsRef.current?.scrollBy(0, scrollDiff - dropdownClientHeight)
				}

				setFocusIndex(focusIndex + 1)
				props.valueHandler(props.options[focusIndex + 1].label)

				return
			}
			else if (e.key.toLowerCase() === "enter") {
				// Do not update scroll when value changes from here
				scrollLock.current = true
				// Pointer events none for the list
				setIsMouseHoverAllowed(false)
				props.valueHandler(props.options[focusIndex].label)
				setIsActive(false)
				inputRef.current?.blur()
				return
			}

			scrollLock.current = false
		}

		// Select the value from the dropdown, if any value matches
		useEffect(() => {
			if (!isActive) return

			// Updating cached value
			cachedValueRef.current = props.value

			const isIndexFound = valueMatcher(props.value, props.options)
			if (isIndexFound !== false) {
				setFocusIndex(isIndexFound)
				setActiveIndex(isIndexFound)
				scrollToSelectedIndex(isIndexFound)
			}
			// No match found
			else {
				setFocusIndex(-1)
				setActiveIndex(-1)
			}

			//eslint-disable-next-line
		}, [isActive])

		// For only to run when value updates, while writing
		useEffect(() => {
			if (scrollLock.current) return

			const isIndexFound = valueMatcher(props.value, props.options)
			if (isIndexFound !== false) {
				setFocusIndex(isIndexFound)
				scrollToSelectedIndex(isIndexFound)
			}
			// No match found
			else {
				setFocusIndex(-1)
			}

			// eslint-disable-next-line
		}, [props.value])

		return <WrappedComponent
			inputRef={inputRef}
			isActive={isActive}
			optionsRef={optionsRef}
			focusIndex={focusIndex}
			activeIndex={activeIndex}
			isActiveHandler={setIsActive}
			optionItemsRef={optionItemsRef}
			prevValue={cachedValueRef.current}
			onKeyDownHandler={onKeyDownHandler}
			onClickItemHandler={onClickItemHandler}
			isMouseHoverAllowed={isMouseHoverAllowed}
			isMouseHoverAllowedHandler={setIsMouseHoverAllowed}
			{...props as P}
		/>
	}
}



export default withKeyboardNavigation