// Vendor
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from '@reduxjs/toolkit/query/react'

// Custom
import formsReducer from "./features/forms/formsSlice"
import formBuilderReducer from "./features/formBuilder/formBuilderSlice"
import { formsApi } from "./features/forms/formsApi"

export const store = configureStore({
	reducer: {
		forms: formsReducer,
		formBuilder: formBuilderReducer,
		[formsApi.reducerPath]: formsApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
	getDefaultMiddleware().concat(formsApi.middleware)
})

setupListeners(store.dispatch)

export default store