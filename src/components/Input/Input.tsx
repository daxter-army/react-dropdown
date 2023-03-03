import React, { useRef } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import { MdErrorOutline } from "react-icons/md"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"

import useOnClickOutside from '../../hooks/useOutsideClick'
import withKeyboardNavigation from '../../hoc/withKeyboardNavigation'

import S from './Styles'

import InputProps from './Props'

const Input: React.FC<InputProps> = ({
	value,
	error,
	options,
	inputRef,
	isActive,
	prevValue,
	optionsRef,
	focusIndex,
	activeIndex,
	valueHandler,
	optionItemsRef,
	isActiveHandler,
	onKeyDownHandler,
	onClickItemHandler,
	isMouseHoverAllowed,
	isMouseHoverAllowedHandler,
	placeholder = "Placeholder",
}) => {
	// TO DETECT OUTSIDE CLICK
	const dropdownRef = useRef([inputRef, optionsRef])
	useOnClickOutside(dropdownRef, () => {
		if (isActive) {
			console.log("RUNNING")
			valueHandler(prevValue)
			isActiveHandler(false)
		}
	})

	const focusHandler = () => {
		isActiveHandler(true)
	}

	const blurHandler = () => {
		// setIsActive(false)
	}

	return (
		<S.InputWpr>
			<S.InputCtr>
				<S.Input
					value={value}
					ref={inputRef}
					onBlur={blurHandler}
					onFocus={focusHandler}
					placeholder={placeholder}
					onKeyDown={onKeyDownHandler}
					onChange={e => valueHandler(e.target.value)}
				/>
				{isActive ? <FiChevronUp /> : <FiChevronDown />}
			</S.InputCtr>
			{error.isError && <S.ErrorLabel>{error.errorText}<MdErrorOutline /></S.ErrorLabel>}
			{
				isActive && <Dropdown
					list={options}
					optionsRef={optionsRef}
					focusIndex={focusIndex}
					activeIndex={activeIndex}
					optionItemsRef={optionItemsRef}
					onClickItemHandler={onClickItemHandler}
				/>
			}
		</S.InputWpr>
	)
}

export default withKeyboardNavigation(Input)