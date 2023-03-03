import React, { createRef } from 'react'

import S from "./Styles";

import DropdownProps from "./Props"

const Dropdown = ({
	list,
	optionsRef,
	focusIndex,
	activeIndex,
	optionItemsRef,
	onClickItemHandler,
}: DropdownProps) => {

	// Creating refs and assigning it to the elements
	const itemRefHandler = () => {
		if (optionItemsRef.current.length <= list.length) {
			optionItemsRef.current.push(createRef<HTMLLIElement>())
		}
	}

	const onItemMouseEnterHandler = (i: number) => { }

	return (
		<S.Dropdown ref={optionsRef}>
			{
				list.map((item, i) => {
					itemRefHandler()

					return <S.DropdownItem
						key={item.id}
						isFocus={focusIndex === i}
						isActive={activeIndex === i}
						ref={optionItemsRef.current[i]}
						onClick={() => onClickItemHandler(item, i)}
						onMouseEnter={() => onItemMouseEnterHandler(i)}
					>
						{item.label}
					</S.DropdownItem>
				})
			}
		</S.Dropdown>
	)
}

export default Dropdown