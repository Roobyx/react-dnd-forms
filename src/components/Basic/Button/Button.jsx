import styled, { css } from 'styled-components'
import Shape from '../Shape/Shape'
import { Link } from 'react-router-dom'

// Button :
// Normal button
// Icon button


const StyleButton = styled.button`
	position: relative;
	width: 100%;
	height: 100%;
	padding: 0.4em 1em;
	background-color: transparent;
	border: 0;
	color: inherit;
	cursor: pointer;
	font-weight: 600;

	${ props => props.draggable && css`
		display: flex;
		padding: .4em 0 .4em 25%;
	`}
`


export const SimpleButton = ({children, ...props}) => {
	return	<StyleButton name={props.name} draggable={props.draggable}>
				{children}
			</StyleButton>
}


export const Button = ({...props}) => {
	if(props.to) {
		return	<Link to={props.to}>
					<Shape {...props}>
						<SimpleButton {...props} />
					</Shape>
				</Link>
	} else {
		return <Shape {...props}>
					<SimpleButton {...props} />
				</Shape>
	}

	
}