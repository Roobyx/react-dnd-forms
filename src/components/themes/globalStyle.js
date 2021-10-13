import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`
	body {
		font-family: ${ props => props.theme.fonts.primary };
	}

	a {
		text-decoration: none;

		&:visited, &::focused {
			color: inherit;
		}
	}
`

export default globalStyle