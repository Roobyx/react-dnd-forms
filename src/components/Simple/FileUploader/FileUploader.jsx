// Vendor
import styled from "styled-components"

// Components
// Simple
import Heading from "../Heading/Heading"
import IconButton from "../IconButton/IconButton"

const StyleUploader = styled.div`
`

const FileUploader = ({ label, name }) => {
	return <StyleUploader>
				{ label ? <Heading forComponent='element'> {label} </Heading> : ''}
				<IconButton name={name || label.replaceAll(/\s/g,'')} variation='uploader' />
			</StyleUploader>
}

export default FileUploader