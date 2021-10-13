// Vendor
import styled from 'styled-components'

// Components
import theme from "../../themes/default"

// Simple
import Heading from '../Heading/Heading'

const borderSize = 2;

const StyledBox = styled.div`
			display: grid;
			grid-template-rows: auto 1fr;
			height: 100%;
		`,
		PreviewPane = styled.div`
			border: ${borderSize}px solid ${ theme.colors.grayscale[1] };
			border-radius: 5px;
			overflow-y: auto;
	`

const PreviewBox = ({children, label}) => {
	return	<StyledBox>
				<Heading forComponent='element'> {label} </Heading>
				<PreviewPane className='previewPane'> {children} </PreviewPane>
			</StyledBox>
}



export default PreviewBox