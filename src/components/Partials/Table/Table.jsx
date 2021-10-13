// Vendor
import { useState, useEffect } from "react"
import styled from "styled-components"
import { v4 as uuid } from 'uuid'
import { DragDropContext } from 'react-beautiful-dnd'

// Components
// Simple
import Heading from "../../Simple/Heading/Heading"
import Icon from "../../Basic/Icon/Icon"

import theme from "../../themes/default"


const defaultRow = [
	{"id": 1},
	{"id": 2}
]

const defaultCol = [
	{"id": 1},
	{"id": 2},
	{"id": 3}
]

const TableComponent = styled.div`
		position: relative;
		
		.tableControls {
			position: absolute;
			display: none;
		
			&.rowControl {
				right: -48px;
				bottom: 0px;
				padding: 40px 10px 20px 40px;

				.TControl {
					display: block;
					margin: 6px 0;
				}
			}

			&.colControl {
				right: 60px;
				bottom: -48px;
				padding: 20px 40px 10px 40px;

				.TControl {
					margin: 0 4px;
				}
			}
		}

		&:hover {
			.tableControls {
				display: initial;
			}
		}
	`,
	StyledTable = styled.div`
		display: grid;
		grid-auto-flow: row;
		border-radius: 10px;
	`,
	TRow = styled.div`
		display: grid;
		grid-auto-flow: column;
		border-top: 2px solid ${ theme.colors.grayscale[1] };

		&:first-child {
			border-top-right-radius: ${ theme.sizes.boxRadius };
			border-top-left-radius: ${ theme.sizes.boxRadius };

			.tableCell:first-child {
				border-top-left-radius: ${ theme.sizes.boxRadius };
			}

			.tableCell:last-child {
				border-top-right-radius: ${ theme.sizes.boxRadius };
			}
		}

		
		&:last-child {
			border-bottom: 2px solid ${ theme.colors.grayscale[1] };
			border-bottom-right-radius: ${ theme.sizes.boxRadius };
			border-bottom-left-radius: ${ theme.sizes.boxRadius };

			.tableCell:first-child {
				border-bottom-left-radius: ${ theme.sizes.boxRadius };
			}

			.tableCell:last-child {
				border-bottom-right-radius: ${ theme.sizes.boxRadius };
			}
		}
	`,
	TCell = styled.div`
		padding: 10px;
		min-height: 70px;
		border-left: 2px solid ${ theme.colors.grayscale[1] };
		background-color: ${ theme.colors.white };

		&:last-child {
			border-right: 2px solid ${ theme.colors.grayscale[1] };
		}
	`,
	TableControl = styled.button`
		width: 26px;
		height: 26px;
		padding: 0;
		margin: 0;
		line-height: 0;

		background-color: ${ theme.colors.grayscale[0] };
		border: 1px solid ${ theme.colors.grayscale[1] };
		border-radius: 50px;

		&:hover {
			cursor: pointer;
		}
		
		&:active {
			opacity: .6;
		}
	`
	// const Item = styled.div`
	// 	.iconButton {
	// 		user-select: none;
	// 		pointer-events: none;
	// 	}
	// 	/* border: 1px ${(props) => (props.isDragging ? 'dashed #000' : 'solid #ddd')}; */
	// `

	// const Clone = styled(Item)`
	// + div {
	// 	display: none !important;
	// }
	// `

	// const Handle = styled.div`
	// 	display: flex;
	// 	align-items: center;
	// 	align-content: center;
	// 	user-select: none;
	// 	margin: -0.5rem 0.5rem -0.5rem -0.5rem;
	// 	padding: 0.5rem;
	// 	line-height: 1.5;
	// 	border-radius: 3px 0 0 3px;
	// 	background: #fff;
	// 	border-right: 1px solid #ddd;
	// 	color: #000;
	// `

	// const List = styled.div`
	// 	${(props) => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')}
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

const Table = ({ label, FormElements, preview }) => {

	const [Row, setRow] = useState(defaultRow)
	const [Col, setCol] = useState(defaultCol)

	const getLatestId = (obj) => {
		let max = 0;
		obj.forEach(entry => {
			if (entry.id > max) {
				max = entry.id;
			}
		})

		return max
	}

	const addNewRow = () => {
		const id = getLatestId(Row)+1
		setRow(prevRow => [...prevRow, {id}])
	}

	const removeRow = () => {
		if(Row.length > 1) {
			const newRow = Row.slice(0, Row.length-1)
			setRow(newRow)
		}
	}

	const addNewCol = () => {
		const id = getLatestId(Col)+1
		setCol(prevCol => [...prevCol, {id}])
	}

	const removeCol = () => {
		if(Col.length > 1) {
			const newCol = Col.slice(0, Col.length-1)
			setCol(newCol)
		}
	}



	const [dndLists, setDndLists] = useState({})

	useEffect(() => {
		setDndLists({ ...dndLists, [uuid()]: [] })
	}, [])

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
			case 'Outside':
				setDndLists({ ...dndLists,
					[destination.droppableId]: dndCopyToList(
						FormElements,
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


	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<TableComponent>
				{ label ? <Heading forComponent='element'> {label} </Heading> : ''}
				{/* { preview === true &&  */}
					<div className="tableControls rowControl">
						<TableControl className='TControl' onClick={addNewRow}> <Icon icon='add' /> </TableControl>
						<TableControl className='TControl' onClick={removeRow}> <Icon icon='minus' /> </TableControl>
					</div>
				{/* } */}
				
				<StyledTable className="tableBody">
					{Row.map((i, idx) => (
						<TRow className="tableRow" key={idx}>
							{Col.map((item, index) => (
								<TCell className="tableCell" key={index}>
								</TCell>
							))}
						</TRow>

					))}
				</StyledTable>

				{/* { preview === true &&  */}
					<div className="tableControls colControl">
						<TableControl className='TControl' onClick={addNewCol}> <Icon icon='add' /> </TableControl>
						<TableControl className='TControl' onClick={removeCol}> <Icon icon='minus' /> </TableControl>
					</div>
				{/* } */}
			</TableComponent>
		</DragDropContext>
	)

}

export default Table
