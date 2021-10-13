import styled, { css } from 'styled-components'
import theme from '../../themes/default'

const StyledInput = css`
	display: block;
	width: 100%;
	margin: 0;
	box-sizing: border-box;
	border-radius: 5px;
	padding: .4em;
	border: 2px solid ${ state => state === 'invalid' ? theme.colors.danger : theme.colors.grayscale[1]};
	
	pointer-events: ${ props => props.preview === true && 'none' };

	&[type=checkbox], &[type=radio] {
		display: inline-block;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		margin: 0 0.2rem 0 0;
	}
`

const StyledTextarea = styled.textarea`${StyledInput}`
const StyledSelect = styled.select`${StyledInput}`
const StyledInputText = styled.input`${StyledInput}`
const StyledNumber = styled.input.attrs({ 
	type: 'number'
  })`${StyledInput}`

const Input = ({ type, state }) => {
	if (type === 'textarea') {
		return <StyledTextarea placeholder='Type here...' state={state}/>
	} else if (type === 'select') {
		return <StyledSelect state={state} />
	} else if (type === 'number') {
		return <StyledNumber state={state} />
	}

	return <StyledInputText state={state} />
}


export default Input