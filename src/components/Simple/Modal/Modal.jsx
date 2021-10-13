// Vendor
import { useState, useEffect } from 'react'
import styled from 'styled-components'

// Simple
import FormElement from '../../Partials/FormElement/FormElement'

// Basic
import Heading from '../Heading/Heading'
import { Button } from '../../Basic/Button/Button'
import theme from '../../themes/default'
import Row from '../../Basic/Row/Row'

const Overlay = styled.div`
	display: flex;
	position: fixed;
	width: 100vw;
	height: 100vh;
	background-color: rgba(255, 255, 255, .8);
	align-items: center;
	justify-content: center;
	z-index: 10;

	
	`, StyledModal = styled.div`
		background-color: ${ theme.colors.white };
		border: ${theme.sizes.defaultBorderSize} solid ${ theme.colors.grayscale[0] };
		border-radius: 5px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		width: 64vw;
		max-height: 60vh;
		min-height: 40vh;
		animation: fadeIn .4s ease-in both;
		padding: 20px;

		footer {
			display: flex;
			margin: 20px 0;
			justify-content: flex-end;

			.modalButton {
				margin: 0 10px;
			}
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
				transform: translate3d(0, -20%, 0);
			}
			to {
				opacity: 1;
				transform: translate3d(0, 0, 0);
			}
		}
	`, 
	ModalBody = styled.div`
		.halfRow {
			width: 50%;
		}
	`

const Modal = ({ visible, inputContent, onClose, onSave}) => {

	const [inputState, setInputState] = useState({})

	useEffect(() => {
		setInputState(inputContent)
	}, [inputContent])

	const handleChange = (e, attribute) => {
		const { value } = e.target
		const newInput = {...inputState, [attribute]: value}
		setInputState(newInput)
	}

	return (
		<> 
			{ visible ? (
				<>
					<Overlay>
						<StyledModal>
							<Heading forComponent='element'> {inputContent.name} </Heading>

							<ModalBody>
								{ inputContent.type === 'table' ? (
										<div className="halfRow">
											<Row flex label='Layout'>
												<FormElement preview='false' type='number' label='Name' value={inputContent.value} onChange={(e) => handleChange(e, 'rows')} />
												<FormElement preview='false' type='number' label='Name' value={inputContent.value} onChange={(e) => handleChange(e, 'cols')} />
											</Row>
										</div>
									) : (
										<Row row>
											<FormElement column noLayout='true' preview='false' type='text' label='Name' value={inputContent.value} onChange={(e) => handleChange(e, 'name')} />
											<FormElement column noLayout='true' preview='false' type='text' label='Label' value={inputContent.value} onChange={(e) => handleChange(e, 'label')} />
										</Row>
									)}
							</ModalBody>

							<footer className='modalFooter'>
								<Button className='modalButton' onClick={ onClose } normal type='grayscale'> Cancel </Button>
								<Button className='modalButton' onClick={ () => onSave(inputState) } normal> Save </Button>
							</footer>
						</StyledModal>
					</Overlay>
				</>
				) : null
			}
		</>
	)
}

export default Modal
