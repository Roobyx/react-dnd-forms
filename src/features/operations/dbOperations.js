// Rexdux
import store from "../../store"
import { setActiveForm } from "../formBuilder/formBuilderSlice"

// Update a form on the server
export const updateServerWithState = () => {
	return async () => {
		const currentValue = store.getState().formBuilder.value

		const settings = {
			method: 'PUT',
			body: JSON.stringify(currentValue),
			headers: {
				'Content-Type': 'application/json',
			}
		}

		try {
			const fetchResponse = await fetch(`https://rdnd-server.herokuapp.com/forms/${currentValue.id}`, settings)
			const data = await fetchResponse.json()
			return data
		} catch (e) {
			return e
		}
	}
}

// Fetch a given form from the server
export const fetchFormById = (id) => {
	return async (dispatch) => {
		const form = await fetch(`https://rdnd-server.herokuapp.com/forms/${id}`)
		dispatch(setActiveForm(await form.json()))
	}
}