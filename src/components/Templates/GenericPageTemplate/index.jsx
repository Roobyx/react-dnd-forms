// Vendor
import React from 'react'
import styled from 'styled-components'

const Content = styled.section`
	/* height: 100vh; */
	padding: 1vh 20px;

`
const GenericPageTemplate = ({ children, ...props }) => {
	return (
		<Content {...props}>
			{children}
		</Content>
	)
}

export default GenericPageTemplate