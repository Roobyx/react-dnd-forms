// Vendor
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'


// Redux
import { currentValue } from '../../../features/formBuilder/formBuilderSlice'
import { fetchFormById } from '../../../features/operations/dbOperations'

// Components
// -Simple
import { Button } from '../../Basic/Button/Button'
import Heading from '../../Simple/Heading/Heading'
import PreviewBox from '../../Simple/PreviewBox/PreviewBox'
import FormElement from '../../Partials/FormElement/FormElement'
import IconButton from '../../Simple/IconButton/IconButton'

// -Templates
import GenericPageTemplate from '../../Templates/GenericPageTemplate'


const PreviewPanel = styled.form`
		display: grid;
		grid-template-columns: 3fr 1fr;
		grid-template-rows: minmax(20vh, 1fr) minmax(20vh, 1fr) minmax(20vh, 1fr);
		gap: 10px;
		height: 70vh;
		margin: 0 auto;

		.textareaWrapper {
			height: 100%;
			display: grid;
			grid-template-rows: 1fr 3fr;
		}

		.previewPane {
			padding: 20px;
		}

		.formViewer {
			.previewPane {
				padding: 48px;
				height: auto;
			}
		}

		.errorLine {
			padding: 2px 0;
			border-bottom: 1px solid #000;
		}
		@media ${ ({ theme }) => theme.mediaQueries.mw768 } {
			grid-template-columns: auto;
			grid-template-rows: auto;
			height: initial;
		}
	`,
	FormPreview = styled.div`
		grid-row-start: 1;
		grid-row-end: 4;
	`,
	SubmitRow = styled.div`
		margin: 1em 0;
	`

const ValidatePage = () => {
	const dispatch = useDispatch()

	let { formId } = useParams()
	const [fields, setFields] = useState([])
	const [errors, setErrors] = useState([])

	useEffect(()=>{
		dispatch(fetchFormById(formId))
	}, [formId])

	let currentForm = useSelector(currentValue)

	useEffect(()=> {
		setFields(currentForm.inputs)
	},[currentForm])

	const handleChange = (e, index) => {
		const { value } = e.target
		const fieldsList = [...fields]
		fieldsList[index] = {...fieldsList[index], value: value}

		setFields(fieldsList)
		validateForm(fields)
	}

	const handleSubmit = e => {
		e.preventDefault()
	}

	// Error validation
	const validateForm = (inputs) => {
		let formErrors = []

		formErrors = inputs.map( (input) => {
			if(input.value && (input.value.trim() && !input.value.length)) {
				formErrors.push(`${input.label} is empty`)
			} else {
				switch (input.type.toLowerCase()) {
					case 'email':
						if(!/\S+@\S+\.\S+/.test(input.value)) formErrors.push(`${input.label} is invalid`)
						break;
					case 'password':
						if (input.value.length < 6) formErrors.push(`${input.label} needs to be 6 characters or more'`)
						break;
					default:
						break;
				}
			}
			
			setErrors(formErrors)
			return formErrors
		})
	}

	useEffect(()=>{
		validateForm(fields)
	}, [fields])

	return (
		<GenericPageTemplate>
			<Heading forComponent='page'> 
				<Link to={`/form/edit/${formId}`} > 
					<IconButton variation='back'></IconButton>
				</Link>
				
				Preview
			</Heading>

			<PreviewPanel>
				<FormPreview className='formViewer'>
					<PreviewBox label='Preview'>
						{ fields.length ? 
							fields.map((item, index) => 
								<FormElement key={index} preview='false' type={item.type} label={item.label} value={item.value} onChange={(e) => handleChange(e, index)} />) 
							: 'Loading...'
						}
					</PreviewBox>
				</FormPreview>
				
				<PreviewBox label='Data'>
					<pre> { JSON.stringify(fields, null, 1).replace(/\/r/g, '/') } </pre>
				</PreviewBox>

				<PreviewBox label='Errors'>
					{ errors && errors.map( (error, i) => <div className='errorLine' key={i}> {error.toString()} </div>)}
				</PreviewBox>
				
				<PreviewBox label='Events'>
					
				</PreviewBox>
			</PreviewPanel>

			<SubmitRow> <Button normal type='primary' onSubmit={handleSubmit} > Save </Button> </SubmitRow>
		</GenericPageTemplate>
	)
}

export default ValidatePage