// Vendor
import styled from "styled-components"

// Components
// Simple
import Heading from "../Heading/Heading"

const StyleCheckbox = styled.div`
`,
	Name = styled.div`
		color: red;
`,
	Check = styled.input`
		visibility: none;
		&:checked + ${Name} {
		color: blue
	}
`,
	Label = styled.label`
		display: flex;
		flex-direction: row-reverse;
		width: fit-content;
`
const Checkbox = ({ label, inputLabel }) => {
	return <StyleCheckbox>
				{ label ? <Heading forComponent='element'> {label} </Heading> : ''}
				<Label>
					<Name>{inputLabel}</Name>
					<Check type='checkbox' name={label.replaceAll(/\s/g,'')} id={inputLabel}/>
				</Label>
			</StyleCheckbox>
}

export default Checkbox