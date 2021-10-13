// Vendor
import styled from 'styled-components'

// Components
// -Basic
import Input from '../../Basic/Input/Input'

// Simple
import Heading from '../Heading/Heading'

const InputWrapper = styled.div`

`

const InputTextarea = ({ label, name }) => {
	return <InputWrapper className='textareaWrapper'> 
				{ label ? <Heading forComponent='element'> {label} </Heading> : ''}
				<Input name={name || label.replaceAll(/\s/g,'')} type='textarea' /> 
			</InputWrapper>
}


export default InputTextarea