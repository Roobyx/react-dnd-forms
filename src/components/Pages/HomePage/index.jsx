// Vendor
import { useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// Redux
import { getAllForms, getFormsList } from '../../../features/forms/formsSlice'

// Components
import SidebarPageTemplate from '../../Templates/SidebarPageTemplate/index'
import IconButton from '../../Simple/IconButton/IconButton'
import List from '../../Basic/List/List'
import SidebarGroup from '../../Partials/SidebarGroup/SidebarGroup'
import FormMenu from '../../Simple/FormMenu/FormMenu'

const SidebarNav = () => {
	return	<IconButton variation='create' to='/form/create'/>
}

const StyledCta = styled.div`
	position: absolute;
	top: 20vh;
	left: 50vw;
	background: linear-gradient( to right, 
		hsl(280deg 100% 62%), 
		hsl(204 100% 59%)
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	text-align: center;
	font-size: 40px;
	`

const Cta = () => {
	return	<StyledCta> Select or create <br /> a from the menu</StyledCta>
}

const SidebarContent = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllForms())
	}, [])

	const allForms = useSelector(getFormsList)
	const formGroups = [...new Map(allForms.map(item => [item['timestamp'], item])).values()]

	const getGroup = (timestamp) => {
		const group = allForms.filter(forms => (
			forms.timestamp === timestamp
		))

		return group.map(form => <Link to={`/form/edit/${form.id}`} key={form.id}><div>{form.name}</div></Link> )
	}

	return (
		<>	
			<SidebarGroup title='Forms'>
				<List >
					{ formGroups.map( form => {
						return (
							<FormMenu key={form.id} forms={ getGroup(form.timestamp) }> 
								{form.timestamp }
							</FormMenu>
						)
					})}
				</List>
			</SidebarGroup>
		</>
	)
}

const HomePage = () => {
	return (
		<>
			<SidebarPageTemplate sidebarNav={SidebarNav()} sidebarContent={SidebarContent()} />
			<Cta />
		</>
	)
}

export default HomePage