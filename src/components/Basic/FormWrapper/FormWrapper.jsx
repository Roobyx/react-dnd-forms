import styled from "styled-components"

const StyleForm = styled.div`
`

const FormWrapper = ({children}) => {
	return <StyleForm> {children} </StyleForm>
}

export default FormWrapper