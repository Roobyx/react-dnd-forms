// Vendor
import styled from 'styled-components'

// Components
// Basic
import Input from '../../Basic/Input/Input'

// Simple
import Heading from '../Heading/Heading'

const Column = styled.div`
	display: flex;
	flex-direction: column;
`

const InputText = ({ label, name, column }) => {
	return <> 
			{column ? (
				<Column>
					{ label ? <Heading forComponent='element'> {label} </Heading> : ''}
					<Input name={name || label.replaceAll(/\s/g,'')} />
				</Column>
			) : (
				<>
					{ label ? <Heading forComponent='element'> {label} </Heading> : ''}
					<Input name={name || label.replaceAll(/\s/g,'')} />
				</>
			)}
		</>
}


export default InputText