import styled from 'styled-components'
import Icon from '../../Basic/Icon/Icon'
import { Button } from '../../Basic/Button/Button'

const Offset = styled.div`
		position: absolute;
		left: 10%;
		top: calc(50% - 0.5em);
	`,
	BackButton = styled.div`
		display: inline-block;
		
		svg {
			width:40px;
			height:40px;
		}
		&:hover {
			cursor: pointer;
		}
	`


const IconButton = ({variation, icon, onClick, children, ...props}) => {
	switch (variation) {
		case 'create':
			return  <Button name={props.name || ''} className='iconButton' to={props.to} draggable type='secondary' onClick={onClick}>
						<Offset> <Icon icon='add' /> </Offset>
						<div> Create </div>
					</Button>

		case 'drag':
			return <Button name={props.name || ''} className='iconButton' draggable type='primary' onClick={onClick}>
						<Offset> <Icon icon='move' /> </Offset>
						<div> {children} </div>
					</Button>
		
		case 'dragOnly':
			return <Button name={props.name || ''} className='iconButton' type='transparent' onClick={onClick}>
						<Icon icon='move' />
					</Button>

		case 'validate':
			return <Button className='iconButton' type='secondary' onClick={onClick}>
						<Offset> <Icon icon='refresh' /> </Offset>
						<div> Validate </div>
					</Button>

		case 'save':
			return <Button name={props.name || ''} className='iconButton' onClick={onClick}>
						<Offset> <Icon icon='download' /> </Offset>
						<div> Save </div>
					</Button>
	
		case 'uploader':
			return <Button name={props.name || ''} className='iconButton' type='dashedSecondary' onClick={onClick}>
						<Offset> <Icon icon='upload' /> </Offset>
						<div> Choose file </div>
					</Button>
		
		case 'delete':
			return <Button name={props.name || ''} className='iconButton' {...props}>
						<Offset> <Icon icon='trash' /> </Offset>
					</Button>

		case 'deleteOnly':
			return <Button name={props.name || ''} className='iconButton' type='transparent' onClick={onClick}>
						<Icon icon='trash' />
					</Button>

		case 'edit':
			return <Button name={props.name || ''} className='iconButton' {...props}>
						<Offset> <Icon icon='edit' /> </Offset>
					</Button>
		
		case 'editOnly':
			return <Button name={props.name || ''} className='iconButton' type='transparent' onClick={onClick}>
						<Icon icon='edit' />
					</Button>

		case 'duplicate':
			return <Button name={props.name || ''} className='iconButton' {...props}>
						<Offset> <Icon icon='duplicate' /> </Offset>
					</Button>
	
		case 'duplicateOnly':
			return <Button name={props.name || ''} className='iconButton' type='transparent' onClick={onClick}>
						<Icon icon='duplicate' />
					</Button>
		case 'newRow':
			return <Button name={props.name || ''} className='iconButton' {...props}>
						<Offset> <Icon icon='newRow' /> </Offset>
					</Button>
		
		case 'newCol':
			return <Button name={props.name || ''} className='iconButton' {...props}>
						<Offset> <Icon icon='newCol' /> </Offset>
					</Button>
		case 'back':
			return <BackButton onClick={onClick}> <Icon icon='backArrow' /> </BackButton>

		default:
			return <Button name={props.name || ''} className='iconButton' {...props}>
						<Offset> <Icon icon={icon} /> </Offset>
						<div> {children} </div>
					</Button>
	}
}

export default IconButton