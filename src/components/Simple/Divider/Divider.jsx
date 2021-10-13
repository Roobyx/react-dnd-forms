// Vendor
import styled from "styled-components"
import theme from '../../themes/default'

// Components
// Simple
import Heading from "../Heading/Heading"

const StyledHr = styled.hr`
	border-top: 1px solid ${ theme.colors.grayscale[1] };
`

const Divider = ({ label, name }) => {
	return <>
			{ label ? <Heading forComponent='element'> Divider </Heading> : ''}
			<StyledHr name={name || label.replaceAll(/\s/g,'')} />
		</>
}

export default Divider