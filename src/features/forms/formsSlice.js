import { createSlice, createAsyncThunk, createDraftSafeSelector } from '@reduxjs/toolkit'

export const getAllForms = createAsyncThunk(
	'forms/getAllForms',
	async () => {
		const res =  await fetch( 'https://rdnd-server.herokuapp.com/forms'),
		data = await res.json()
		return data
	}
)

const formsSlice = createSlice({
	name: 'forms',
	initialState: {
		content: [],
		status: null
	},
	extraReducers: {
		[getAllForms.pending]: (state) => {
			state.status = 'Loading'
			
		},
		[getAllForms.fulfilled]: (state, { payload }) => {
			state.content = payload
			state.status = 'Success'
		},
		[getAllForms.rejected]: (state) => {
			state.status = 'Failed'
		}
	}
})

const selectSelf = (state) => state
export const getFormsList = createDraftSafeSelector(
	selectSelf,
	state => state.forms.content
)


export default formsSlice.reducer