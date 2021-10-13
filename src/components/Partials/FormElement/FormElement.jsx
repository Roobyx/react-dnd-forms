// Components
import Row from "../../Basic/Row/Row"
import InputTextarea from "../../Simple/InputTextarea/InputTextarea"
import InputText from "../../Simple/InputText/InputText"
import Divider from "../../Simple/Divider/Divider"
import FileUploader from "../../Simple/FileUploader/FileUploader"
import Table from "../../Partials/Table/Table"
import Checkbox from "../../Simple/Checkbox/Checkbox"
import InputNumber from "../../Simple/InputNumber/InputNumber"


// const CurrentElement = ({type, label, preview, labelName, value}) => {
	const CurrentElement = ({preview, type, label, name}) => {
	switch(type) {
		case 'text':
		case 'email':
		case 'password':
			return <InputText type={type} label={label} name={name} preview={preview} />
		
			case 'textarea':
			return <InputTextarea  type={type} label={label} name={name} preview={preview} />
		
		case 'divider':
			return <Divider label={label} />
		
		case 'fileUploader':
			return <FileUploader  type={type} label={label} name={name} preview={preview}/>

		case 'table':
			return <Table label={label} name={name} preview={preview} />

		case 'checkbox':
			return <Checkbox  type={type} label={label} name={name} preview={preview} />
		
		case 'number':
			return <InputNumber inset label={label} name={name} preview={preview} />
		default:
			return <div> No type provided </div>
	}
}

// const FormElement = ({...props}) => {
// 	return { ...props.draggable ? (
// 				<Draggable key={props.key} draggableId={props.draggableId} index={props.index}>
// 					{(provided) => (
// 						<Item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
// 							{/* <Handle {...provided.dragHandleProps}>
// 								<svg width="24" height="24" viewBox="0 0 24 24">
// 									<path fill="currentColor" d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"/>
// 								</svg>
// 							</Handle> */}
							
// 							<Row centered={props.centered} innerRef={props.innerRef} onChange={props.onChange}>
// 								<CurrentElement preview={props.preview} name={props.name} type={props.type} label={props.label} />
// 							</Row>
// 						</Item>
				// 	)}
				// </Draggable>
// 			) : (
// 				<Row centered={props.centered} innerRef={props.innerRef} onChange={props.onChange}>
// 					<CurrentElement preview={props.preview} type={props.type} label={props.label} />
// 				</Row>
// 			)}
// }


const FormElement = ({...props}) => {
	return (
		<Row centered={props.centered} onChange={props.onChange}>
			<CurrentElement preview={props.preview} type={props.type} label={props.label} />
		</Row>
	)
}

export default FormElement