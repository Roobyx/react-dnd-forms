// Vendor
import styled from "styled-components"

// Components
import theme from "../../themes/default"

// -Basic
import Title from "../../Basic/Title/Title"

const 	ElementHeading = styled.h3``,
		FormHeading = styled.h3`
			color: ${ theme.colors.grayscale[1] };
			text-align: center;
		`,
		PageHeading = styled.h1`
			color: ${ theme.colors.grayscale[1] };
			font-size: 3em;
		`,
		SidebarGrpHeading = styled.h2``,
		MediumHeading = styled.h2``


const Heading = ({children, forComponent}) => {
	switch (forComponent) {
		case 'element':
			return <ElementHeading> <Title> {children} </Title> </ElementHeading>
		case 'form':
			return <FormHeading> <Title> {children} </Title> </FormHeading>
		case 'page':
			return <PageHeading> <Title> {children} </Title> </PageHeading>
		case 'sidebarGroup':
			return <SidebarGrpHeading> <Title> {children} </Title> </SidebarGrpHeading>
		case 'mediumElement': 
			return <MediumHeading> <Title> {children} </Title></MediumHeading>

		default:
			return <Title> {children} </Title>
	}
}

export default Heading