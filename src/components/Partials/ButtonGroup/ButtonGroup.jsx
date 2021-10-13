import styled from 'styled-components'

const ButtonsWrapper = styled.div`
	.simpleButton, .iconButton {
		margin: .4em 0;
	}
`

const ButtonGroup = ({children, ...props}) => {
	return <ButtonsWrapper {...props}>
				{children}
			</ButtonsWrapper>
}

export default ButtonGroup