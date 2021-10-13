import styled, { css } from 'styled-components'
import theme from '../../themes/default'

const StyledList = css`
	margin: 1rem 0;
	padding-left: 1.6rem;
	line-height: 1.7rem;
	color: #fff;

	li {
		list-style: none;
		margin: 0.4em 0;
		font-size: ${ theme.fontSize.medium }
	}
`

const Ol = styled.ol`${StyledList}`
const Ul = styled.ul`${StyledList}`

const List = ({ ordered, children, ...props }) => {
	if(ordered) {
		return <Ol {...props}> {children} </Ol>
	} else {
		return <Ul {...props}> {children} </Ul>
	}
}


export default List