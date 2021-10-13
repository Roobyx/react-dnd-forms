// import { Droppable, Draggable } from 'react-beautiful-dnd'
// import styled from 'styled-components'

// const Item = styled.div`
// .iconButton {
// 	user-select: none;
// 	pointer-events: none;
// }
// /* border: 1px ${(props) => (props.isDragging ? 'dashed #000' : 'solid #ddd')}; */
// `

// const Clone = styled(Item)`
// + div {
// 	display: none !important;
// }
// `

// // const Handle = styled.div`
// // 	display: flex;
// // 	align-items: center;
// // 	align-content: center;
// // 	user-select: none;
// // 	margin: -0.5rem 0.5rem -0.5rem -0.5rem;
// // 	padding: 0.5rem;
// // 	line-height: 1.5;
// // 	border-radius: 3px 0 0 3px;
// // 	background: #fff;
// // 	border-right: 1px solid #ddd;
// // 	color: #000;
// // `

// const List = styled.div`
// ${(props) => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')}
// `

// const DraggableContainer = styled(List)`
// `

// const EmptyListState = styled.div`
// 	display: flex;
// 	align-items: center;
// 	align-content: center;
// 	justify-content: center;
// 	padding: 0.5rem;
// 	margin: 0 0.5rem 0.5rem;
// 	border: 1px solid transparent;
// 	line-height: 1.5;
// 	color: #aaa;
// `


// const DropList= ({children, provided }) => {
// 	return (
// 		<Droppable droppableId="FormElements" isDropDisabled={true}>
// 			{(provided, snapshot) => (
// 				<DraggableContainer ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
// 					{LayoutElements.map((item, index) => (	
// 						<Draggable key={item.id} draggableId={item.id} index={index}>
// 							{(provided, snapshot) => (
// 								<>
// 									{children}
// 									{provided.placeholder}
// 								</>
// 							)}
// 						</Draggable>
// 					))}
// 				</DraggableContainer>
// 			)}
// 		</Droppable>
// 	)
// }

// export default DropList