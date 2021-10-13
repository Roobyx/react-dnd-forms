// Vendor
import styled from 'styled-components'

// Components
// Basic
import Input from '../../Basic/Input/Input'

// Simple
import Heading from '../Heading/Heading'

const InsetWrapper = styled.div`
		display: flex;
		align-items: center;

		input {
			width: 60px;
			margin-left: 6px;
			padding: 0;
		}
	`

const InputNumber = ({ inset, label, name }) => {
	return <> 
			{ inset ? (
				<InsetWrapper>
					{ label ? <> {label}  </>: ''}
					<Input type='number' name={name || label.replaceAll(/\s/g,'')} />
				</InsetWrapper>
			) : (
				<>
					{ label ? <Heading forComponent='element'> {label} </Heading> : ''}
					<Input type='number' name={name || label.replaceAll(/\s/g,'')} />
				</>
			)}
		</>
}


export default InputNumber