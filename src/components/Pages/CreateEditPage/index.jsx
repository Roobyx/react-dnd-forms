// Vendor
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useParams } from 'react-router'
import { v4 as uuid } from 'uuid'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Redux
import { getAllForms, getFormsList } from '../../../features/forms/formsSlice'
import { setToNewForm, currentValue, updateActiveFormInputs } from '../../../features/formBuilder/formBuilderSlice'

import { fetchFormById, updateServerWithState } from '../../../features/operations/dbOperations'
// Components
// Basic
import Row from '../../Basic/Row/Row'
import Icon from '../../Basic/Icon/Icon'

// Simple
import Heading from '../../Simple/Heading/Heading'
import IconButton from '../../Simple/IconButton/IconButton'
import SidebarGroup from '../../Partials/SidebarGroup/SidebarGroup'
import Modal from '../../Simple/Modal/Modal'

// Partials
import FormElement from '../../Partials/FormElement/FormElement'

// Templates
import SidebarPageTemplate from '../../Templates/SidebarPageTemplate/index'
import Shape from '../../Basic/Shape/Shape'

// Theme
import theme from '../../themes/default'

// Sidebar elements lists
const FormElements = [
		{
			id: 'checkbox',
			content: {
				label: 'Checkbox',
				type: 'checkbox'
			}
		},
		{
			id: 'fileUploder',
			content: {
				label: 'File Uploder',
				type: 'fileUploader'
			}
		},
		{
			id: 'text',
			content: {
				label: 'Text',
				type: 'textarea'
			}
		},
		{
			id: 'divider',
			content: {
				label: 'Divider',
				type: 'divider'
			}
		},
		{
			id: 'input',
			content: {
				label: 'Input',
				type: 'text'
			}
		}
	], 
	LayoutElements = [
		{
			id: 'table',
			content: {
				label: 'Table',
				type: 'table'
			}
		}
	]

const Item = styled.div`
	.iconButton {
		user-select: none;
		pointer-events: none;
	}
	`, Clone = styled(Item)`
		+ div {
			display: none !important;
		}
	`,
	List = styled.div`
	`, 
	DraggableContainer = styled(List)`
	`, 
	EmptyListState = styled.div`
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
		padding: 2em;
		margin: 0 0.5rem 0.5rem;
		border: 1px solid transparent;
		line-height: 1.5;
		color: ${ theme.colors.grayscale[2] };
		background-color: ${ theme.colors.grayscale[0] };
		border: 1px dashed ${ theme.colors.grayscale[1] };
		border-radius: 5px;
	`,
	ElementOptions = styled(Shape)`
		display: none;
		position: absolute;
		top: 20px;
		right: -20px;
		font-size: 14pt;
		width: auto;
		
		&.onDivider {
			top: -20px;
		}

		button {
			width: auto;
			padding-left: 0.3em;
			padding-right: 0.3em;
		}
	`,
	ElementWrapper = styled.div`
		position: relative;


		hr {
			&:before {
				content: '';
				padding: 20px 0;
				margin-top: -20px;
				width: 100%;
				display: block;
			}
		}

		input, textarea, button {
			pointer-events: none;
		}

		&:hover {
			.elementOptions {
				display: flex;
			}
		}
	`,
	EditMenu = styled.div`
		display: flex;
		padding: 20px 0;
		background-color: ${ theme.colors.grayscale[0] };
		color: ${ theme.colors.black };
		
		h2 {
			padding-left: 20px;
		}

		.sidebarGroup {
			width: 100%;
		}

		.editMenuEntry {
			padding: 10px 0 4px 40px;
			font-size: 1.2em;
			font-weight: bold;
			color: ${ theme.colors.black };
			z-index: 2;

			&:hover {
				background-color: ${ theme.colors.white };
			}

			&:active {
				text-decoration: underline;
			}
		}
		
		.newFormButton {
			position: absolute;
			top: 4.5vh;
			right: ${ theme.sizes.globalHorizontalPadding };
			color: ${ theme.colors.black };
		}
	`,
	CreateEditWrapper = styled.main`
		max-width: 1024px;
		margin: 0 auto;

		.formBuilderFooter {
			.formBuilderButton {
				margin: 0 14px;
			}
		}
	`,
	DropField = styled.div`
		display: flex;
		flex-flow: column;
		height: 70vh;
		align-items: center;
		align-content: center;
		justify-content: center;
		padding: 2em;
		margin: 0 0.5rem 0.5rem;
		border: 1px solid transparent;
		line-height: 1.5;
		color: ${ theme.colors.grayscale[2] };
		font-size: 18pt;

		svg {
			width: 2em;
			height: 2em;
		}
	`


// Functions to handle dnd actions
const dndListOrder = (list, startIndex, endIndex) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const dndCopyToList = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source)
	const destClone = Array.from(destination)
	const item = sourceClone[droppableSource.index]
	destClone.splice(droppableDestination.index, 0, { ...item, id: uuid().toString() })
	return destClone
}

const CreateEditPage = () => {
	let { formId } = useParams(),
		isCreate = useRef(''),
		builderReady = useRef(false)

	const dispatch = useDispatch()
	const [editModalSettings, setEditModalSettings] = useState({visibility: false, listName: '', rowId: '', inputContent: []})
	const [dndLists, setDndLists] = useState({})

	
	useEffect(() => {
		if( formId ) {
			isCreate.current = false

			// Fetch all forms to list in the sidebar
			dispatch(getAllForms())
			// Fetch the given form to edit
			dispatch(fetchFormById(formId))
			setDndLists({})

		} else {
			isCreate.current = true
			setDndLists({})
			dispatch(setToNewForm())
		}
	}, [formId])

	const allForms = useSelector(getFormsList)
	const currentForm = useSelector(currentValue)

	useEffect(()=> {
		if(currentForm.inputs !== undefined && (isCreate.current || currentForm.inputs.length > 0)) {
			const formInputs = currentForm.inputs.map( (content) => {
				let id = uuid().toString()
					return { id, content }
				})
				
			setDndLists({ [uuid()]: [...formInputs]})
			builderReady.current = true
		}
	}, [currentForm.inputs])

	const onDragEnd = (result) => {
		const { source, destination } = result

		if (!destination) {
			return
		}

		switch (source.droppableId) {
			case destination.droppableId:
				setDndLists({ ...dndLists,
					[destination.droppableId]: dndListOrder(
						dndLists[source.droppableId],
						source.index,
						destination.index
					)
				})
				break
			case 'FormElements':
				setDndLists({ ...dndLists,
					[destination.droppableId]: dndCopyToList(
						FormElements,
						dndLists[destination.droppableId],
						source,
						destination
					)
				})
				break
			case 'LayoutElements':
				console.log('From layout')
				setDndLists({ ...dndLists,
					[destination.droppableId]: dndCopyToList(
						LayoutElements,
						dndLists[destination.droppableId],
						source,
						destination
					)
				})
				break
			default:
				console.log('No action to handle')
				return
		}
	}


	// Generate new drop list on demand if needed (usable for the table layout)
	// const addList = (e) => {
	// 	setDndLists({ ...dndLists, [uuid()]: [] })
	// }

	// Form Row actions
	const deleteRow = (currentList, rowId) => {
		const newDndList = dndLists[currentList].filter( row => row.id !== rowId )
		setDndLists({ ...dndLists, [currentList]: newDndList })
	}

	const duplicateRow = (currentList, rowId) => {
		let content = dndLists[currentList].filter( row => row.id === rowId)
		const newDndList = dndLists[currentList]
		newDndList.push({ id: uuid(), content: content[0].content})
		setDndLists({ [dndLists]: newDndList })
	}

	// Modal functionality 
	const showEditModal = (list, rowId, input) => {
		setEditModalSettings({ ...editModalSettings, visibility: true, listName: list, rowId: rowId, inputContent: input})
	}
	const closeModal = () => {
		setEditModalSettings([{...editModalSettings, visibility: false}])
	}
	const onModalSave = (input) => {
		let newDndList = dndLists[editModalSettings.listName]
		newDndList = dndLists[editModalSettings.listName].filter( row => row.id !== editModalSettings.rowId )
		newDndList.push({ id: editModalSettings.rowId, content: input})
		setDndLists({ ...dndLists, [editModalSettings.listName]: newDndList })
	}

	const saveForm = () => {
		const currentInputList = Object.keys(dndLists)[0]
		
		const newInputList = dndLists[currentInputList].map( inputPair => {
			return inputPair.content
		})

		dispatch(updateActiveFormInputs(newInputList))
		dispatch(updateServerWithState(currentValue))
	}
	return (
		<>
			<Modal title='test' visible={editModalSettings.visibility} listName={editModalSettings.listName} inputContent={editModalSettings.inputContent} onSave={onModalSave} onClose={closeModal}></Modal>

			<DragDropContext onDragEnd={onDragEnd}>
				<SidebarPageTemplate sidebarNav={isCreate.current && SidebarNav(parseInt(formId), allForms) } topMenu={!isCreate.current && SidebarNav(parseInt(formId), allForms) } sidebarContent={SidebarContent()}>
					{ builderReady.current ? (
							<CreateEditWrapper>
								<Heading forComponent='form'> Drop & {isCreate.current ? 'Create' : 'Edit'} </Heading>

								{Object.keys(dndLists).map((list, i) => (
									<Droppable key={list} droppableId={list}>
										{(provided, snapshot) => {
											return (
												<DraggableContainer ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
												{dndLists[list].length ? dndLists[list].map( (item, index) => {
													return (
														<Draggable key={item.id} draggableId={item.id} index={index}>
															{(provided) => (
																<ElementWrapper {...provided.draggableProps}  ref={provided.innerRef}>
																	<FormElement draggable name={item.content.name} type={item.content.type} label={item.content.label} />
																	
																	<ElementOptions {...provided.dragHandleProps} className={`elementOptions ${item.content.type === 'divider' ? 'onDivider' : '' }`} type='grayscaleButtonArray'> 
																		<IconButton variation='dragOnly' />
																		<IconButton onClick={()=>duplicateRow(list, item.id)} variation='duplicateOnly' />
																		<IconButton onClick={()=>showEditModal(list, item.id, item.content)} variation='editOnly' />
																		<IconButton onClick={()=>deleteRow(list, item.id)} variation='deleteOnly' />
																	</ElementOptions>
																</ElementWrapper>
															)}
														</Draggable>
													)
												}
													) : (!provided.placeholder && <EmptyListState> Drop form elements here </EmptyListState> ) 
												}
												{provided.placeholder}
											</DraggableContainer>
											)
										}}
									</Droppable>
								))}

								<Row className='formBuilderFooter' centered>
									{ !isCreate.current && (
										<Link className='formBuilderButton' to={`/validate/${formId}`}> 
											<IconButton variation='validate'/> 
										</Link>
									)}

									<IconButton className='formBuilderButton' variation='save' onClick={saveForm}/>
								</Row>
							</CreateEditWrapper>
								
						) : <DropField> 
								<Icon icon='noDb' />
								<div> No form found </div>
							</DropField>
					}
				</SidebarPageTemplate>
			</DragDropContext>
		</>
	)
}

// Sidebar components
const SidebarNav = (currentFormId, formsList) => {
	return <>
			{ !isNaN(currentFormId) ? (
				<EditMenu>
					<SidebarGroup title='Forms'>
						<Link to="/form/create" className='newFormButton'> <Icon icon='add'/> </Link>
						
						<List>
							{ formsList.map( (form, index) => <Link key={form.id} to={`/form/edit/${form.id}`}> <div className='editMenuEntry'>{form.name}</div></Link> ) }
						</List>
					</SidebarGroup>
				</EditMenu>
			) : (
				<Link  to={`/validate/${currentFormId}`}> 
					<IconButton variation='validate'/> 
				</Link>
			)
		}
	</>
	
}

const SidebarContent = () => {
	return (
		<>
			<SidebarGroup title='Cell layout'>
				{/* TODO: Export as partial to handle all droppable lists */}
				<Droppable droppableId="LayoutElements" isDropDisabled={true}>
					{(provided, snapshot) => (
						<DraggableContainer ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
							{LayoutElements.map((item, index) => {
								return (
									(
										<Draggable key={item.id} draggableId={item.id} index={index}>
											{(provided, snapshot) => (
												<>
													<Item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} isDragging={snapshot.isDragging}>
														<IconButton variation='drag'> {item.content.label} </IconButton>
													</Item>
		
													{snapshot.isDragging && (
														<Clone><IconButton variation='drag'> {item.content.label} </IconButton></Clone>
													)}
													{provided.placeholder}
												</>
											)}
										</Draggable>
									)
								)
							})}
						</DraggableContainer>
					)}
				</Droppable>
			</SidebarGroup>

		
			<SidebarGroup title='Form Components'>
				<Droppable droppableId="FormElements" isDropDisabled={true}>
					{(provided, snapshot) => (
						<DraggableContainer ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
							{FormElements.map((item, index) => (
								<Draggable key={item.id} draggableId={item.id} index={index}>
									{(provided, snapshot) => (
										<>
											<Item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} isDragging={snapshot.isDragging}>
												<IconButton variation='drag'> {item.content.label} </IconButton>
											</Item>

											{snapshot.isDragging && (
												<Clone><IconButton variation='drag'> {item.content.label} </IconButton></Clone>
											)}
											{provided.placeholder}
										</>
									)}
								</Draggable>
							))}
						</DraggableContainer>
					)}
				</Droppable>
			</SidebarGroup>
		</>
	)
}


export default CreateEditPage