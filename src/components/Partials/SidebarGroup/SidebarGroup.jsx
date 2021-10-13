import styled from "styled-components"
import ButtonGroup from "../ButtonGroup/ButtonGroup"
import Heading from "../../Simple/Heading/Heading"


const StyledGroup = styled.div`
`

const SidebarGroup = ({children, title}) => {
	return	<StyledGroup className='sidebarGroup'>
				<Heading forComponent='sidebarGroup'> {title} </Heading>

				<ButtonGroup>
					{children}
				</ButtonGroup>
			</StyledGroup>
}

export default SidebarGroup