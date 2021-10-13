import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const formsApi = createApi({
	reducerPath: 'formsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
	endpoints: (builder) => ({
		getFormById: builder.query({
			query: (id) => `forms/${id}`,
		}),
	}),
})

export const { useGetFormByIdQuery } = formsApi