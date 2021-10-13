
import styled from "styled-components"
import theme from "../../themes/default"

const MenuHandle = styled.li`
		div:first-child {
			z-index: 2;
			position: relative;
			display: block;
		}

		&:hover {
			cursor: default;

			.absoluteHeader {
				display: initial;
			}

			&::after {
				content: '';
				position: absolute;
				background-color: ${ theme.colors.hightlight };
				margin-top: -35px;
				display: block;
				width: 100%;
				left: 0;
				height: 40px;
				z-index: 1;
			}
		}
	`,
	AbsoluteSidebar = styled.div`
		display: none;
		position: absolute;
		left: 100%;
		width: 260px;
		margin-top: -30px;
		padding-left: 0;

		a {
			padding-left: 40px;
			z-index: 100;
			display: block;
			position: relative;
			color: ${ theme.colors.black} 
		}

		&::after {
			
			content: '';
			height: 100vh;
			overflow: hidden;
			background-color: ${ theme.colors.grayscale[0]} ;
			width: 260px;
			top: 0;
			position: fixed;
			z-index: -1;
		}

		&::before {
			content: '';
			height: 100vh;
			overflow: hidden;
			width: 290px;
			top: 0;
			margin-left: -20px;
			position: fixed;
			z-index: 10;
			padding-left: 100px;
			
		}
	`

const FormMenu = ({children, forms}) => {
	return (
			<MenuHandle>
				<div> { children } </div>
				<AbsoluteSidebar className='absoluteHeader'> 
					{ forms }
				</AbsoluteSidebar>
			</MenuHandle>
	)
}

export default FormMenu