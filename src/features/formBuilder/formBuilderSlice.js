import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit"

const formSchema = {
	id: -1,
	name: '',
	timestamp: '',
	inputs: [],
	error: false
}

const initialState = {
	value: { ...formSchema }
}

export const formBuilderSlice = createSlice({
	name: "formBuilder",
	initialState: initialState,
	reducers: {
		setActiveForm: (state, { payload }) => {
			state.value = payload
		},
		setToNewForm: (state) => {
			state.value = formSchema
		},
		updateActiveFormInputs: (state, { payload }) => {
			state.value.inputs = payload
		}
	}
})

export const { setActiveForm, setToNewForm, updateActiveFormInputs } = formBuilderSlice.actions

const selectSelf = (state) => state
export const currentValue = createDraftSafeSelector(
	selectSelf,
	state => state.formBuilder.value
)


export default formBuilderSlice.reducer