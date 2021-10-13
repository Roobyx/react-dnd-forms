import styled from "styled-components"

const StyledTitle = styled.div`

`

const Title = ({children}) => {
	return <StyledTitle> {children} </StyledTitle> 
}

export default Title