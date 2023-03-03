import styled from "@emotion/styled";

// Types
type DropdownItemProps = {
	isActive: boolean;
	isFocus: boolean;
}

// Elements
const Dropdown = styled.ul`
	position: absolute;
	max-height: 100px;
	border: 1px red solid;
	overflow-y: auto;
`

const DropdownItem = styled.li<DropdownItemProps>`
	${props => props.isActive && `background-color: red; color: white;`}
	${props => props.isFocus && `background-color: blue; color: white;`}
`

const Styled = {
	Dropdown,
	DropdownItem
}

export default Styled