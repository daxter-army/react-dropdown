import styled from "@emotion/styled"

const App = styled.div`
	display: flex;
	justify-content: center;
	/* align-items: center; */
	height: 100%;
`

const ContentCtr = styled.div`
	margin-top: 150px;
	padding: 24px;
	display: flex;
	flex-direction: column;
	border: 1px #d8d8d8 solid;
	border-radius: 4px;
	/* align-items: center; */
`

const DocsIcon = styled.a`
	display: flex;
	gap: 4px;
	align-items: center;
	text-decoration: none;
	color: black;

	&:hover {
		text-decoration: underline;
	}
`

const Styled = {
	App,
	ContentCtr,
	DocsIcon,
}

export default Styled