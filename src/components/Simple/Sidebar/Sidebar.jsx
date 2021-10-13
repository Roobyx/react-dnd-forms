import styled from "styled-components"

const AbsoluteSidebar = styled.div`
	position: absolute;
	left: 100%;
	top: 0;
	width: 260px;
	height: 100vh;
	background-color: #ccc;
`

const Sidebar = () => {
	return <AbsoluteSidebar />
}

export default Sidebar