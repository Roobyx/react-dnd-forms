// Vendor
import React from 'react'
import styled from 'styled-components'

const 
	Content = styled.section`
		display: grid;
		height: 100vh;
		grid-template-columns: 280px 1fr;

		@media ${ ({ theme }) => theme.mediaQueries.mw768 } {
			grid-template-rows: ${ ({theme}) => theme.sizes.mainSidebarResponsiveHeight } 1fr;
			grid-template-columns: auto;
		}
	`,
	MainView = styled.main`
		padding: ${ ({theme}) => theme.sizes.globalVerticalPadding} 4vw;
	`,
	Sidebar = styled.aside`
		position: relative;
		background-color: ${ ({theme}) => theme.colors.primary};
		color: ${ ({theme}) => theme.colors.white};
		padding: ${ ({theme}) => theme.sizes.globalVerticalPadding} ${ ({theme}) => theme.sizes.globalHorizontalPadding};
	`,
	Nav = styled.header`
		margin: 1em 0 6em 0;
	`,
	TopMenu = styled.div`
		margin: -${ ({theme}) => theme.sizes.globalVerticalPadding} -${ ({theme}) => theme.sizes.globalHorizontalPadding};
	`


const SidebarPageTemplate = ({ sidebarNav, sidebarContent, children, ...props }) => {
	return (
		<Content {...props}>
			<Sidebar>
				<TopMenu> 
					{props.topMenu}
				</TopMenu>

				<Nav>
					{sidebarNav}
				</Nav>

				<section>
					{sidebarContent}
				</section>
			</Sidebar>

			<MainView> 
				{children}
			</MainView>
		</Content>
	)
}

export default SidebarPageTemplate