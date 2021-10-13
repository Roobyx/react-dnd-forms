// Vendor
import styled, { css } from "styled-components"

// Components
import Heading from "../../Simple/Heading/Heading"

const StyledRow = styled.div`
	margin: 5vh 0;
	${ props => props.centered ? css`{text-align: center;}` : '' };
	${ props => props.flex ? css`{
		display: flex;
		justify-content: space-around;
	}
	` : '' };

	${ props => props.row ? css`{
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px;
	}` : '' };
`

const Row = ({children, label, centered, flex, innerRef, onChange, ...props}) => {
	return (
		<>
			{ label ? <Heading forComponent='element'> {label} </Heading> : ''}
			<StyledRow centered={centered} {...props} ref={innerRef} onChange={onChange}> {children} </StyledRow>
		</>
	)
}

export default Row