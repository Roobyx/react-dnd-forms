// Vendor
import { useState } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid'

// Components
import Icon from '../../Basic/Icon/Icon'
import GenericPageTemplate from '../../Templates/GenericPageTemplate'



const NotFoundWrapper = styled.main`
	display: flex;
	flex-flow: column;
	height: 50vh;
	align-items: center;
	align-content: center;
	justify-content: center;
	padding: 2em;
	color: black;
	font-size: 6rem;

	svg {
		width: 1.6em;
		height: 1.6em;
	}

	.back {
		color: black;
		font-size: 16px;
	}
`


const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
}

const DraggableContainer = styled.div`
		display: flex;
		width: 400px;
	`,
	WordContainer = styled.div`
		border: 2px dashed #ccc;
		border-radius: 10px;
		width: 33%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px;

		.success {
			color: green !important;
		}
	`,
	Word = styled.div`
		font-size: 18px;
		padding: 20px;
	`, 
	Handle = styled.div`
		width: 20px;
		height: 20px;
		border: 2px dashed #ccc;
		border-radius: 10px;
		margin: 0 10px;
	`


const NotFoundPage = () => {
	const [state, setState] = useState(['Not', 'Page', 'Found'])
	const onDragEnd = (result) => {
		if (!result.destination) {
			return
		}
	
		const items = reorder(
			state,
			result.source.index,
			result.destination.index
		)

		setState(items)
	}

	return (
		<GenericPageTemplate>
			<NotFoundWrapper>
				<Icon icon='search' />
				<div> 404 </div>
				
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='404Droppable' direction='horizontal'>
						{provided => (
							<DraggableContainer ref={provided.innerRef} {...provided.droppableProps}>
								{ state.map( (word, index) => {
									return (
										<Draggable key={uuid()} draggableId={word.toString()} index={index}>
											{(provided) => (
												<WordContainer {...provided.draggableProps}  ref={provided.innerRef}>
													<Word>
														{word}
													</Word>

													<Handle {...provided.dragHandleProps} />

												</WordContainer>
											)}
										</Draggable>
									)})
								}
								{provided.placeholder}
							</DraggableContainer>
						)}
					</Droppable>
				</DragDropContext>

				<Link className='back' to='/'> Go back home</Link>
			</NotFoundWrapper>
		</GenericPageTemplate>
	)
}

export default NotFoundPage