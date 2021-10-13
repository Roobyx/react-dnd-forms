import styled, { css } from 'styled-components'
import theme from '../../themes/default'

// ---
// Can take multiple elements and wrap them. 
// Unifies the rouded shape between elements by taking care of the color, background-color, border and shape
// ---

// Possisble types
// Draggablle - appllies dashed white border
// Primary - applies primary color background and white text
// Secondary - inverted primary colors
// Status styles: Warning, Success, Grayscale, Danger

const Group = styled.div`
	display: inline-flex;
	align-items: center;
	white-space: nowrap;
	font-size: 16pt;
	border: 0.0625em ${ props => props.draggable && 'dashed'};
	border-radius: ${ props => props.normal ? '5px' : '20px' };
	/* max-height: 2.5em; */
	text-decoration: none;
	appearance: none;
	box-sizing: border-box;
	transition: background-color 250ms ease-out, color 250ms ease-out, border-color 250ms ease-out;
	width: 100%;
	max-width: ${ props => props.normal ? '150px' : '250px' };
	
	${( props => {
		switch (props.type) {
			case 'primary':
				return css`background-color: ${theme.colors.primary};
							color: ${theme.colors.white};`
		
			case 'secondary':
				return css`background-color: ${theme.colors.white};
						border: 1px solid;
						color: ${theme.colors.primary};`
			
			case 'dashedSecondary':
				return css`background-color: ${theme.colors.white};
						border: 2px dashed ${theme.colors.grayscale[1]};
						color: ${theme.colors.black};`

			case 'danger':
				return css`background-color: ${theme.colors.danger};
						color: ${theme.colors.white};`
			
			case 'warning':
				return css`background-color: ${theme.colors.warning};
						color: ${theme.colors.white};`
			
			case 'success':
				return css`background-color: ${theme.colors.success};
						color: ${theme.colors.white};`
			
			case 'grayscale':
				return css`background-color: ${theme.colors.grayscale[1]};
						color: ${theme.colors.white};`
			
			case 'grayscaleButtonArray':
				return css`background-color: ${theme.colors.grayscale[0]};
						border: 1px solid ${theme.colors.grayscale[1]};
						color: ${theme.colors.white};
						&:hover, &:focus, &:active {
							opacity: 1 !important;
						}`

			case 'transparent':
				return css`background-color: transparent;
						color: ${theme.colors.black};`

			default:
				return css`background-color: ${theme.colors.primary};
						border: 1px solid ${theme.colors.grayscale[0]};
						color: ${theme.colors.white};`
		}
	})}

	
	&:hover, &:focus, &:active {
		opacity: .7;
	}
	
	&:focus {
		outline: none
	}
`

const Shape = ({children, ...props}) => {
	return <Group {...props}> {children} </Group>
}

export default Shape