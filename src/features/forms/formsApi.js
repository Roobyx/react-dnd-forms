import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const formsApi = createApi({
	reducerPath: 'formsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://rdnd-server.herokuapp.com/' }),
	endpoints: (builder) => ({
		getFormById: builder.query({
			query: (id) => `forms/${id}`,
		}),
	}),
})

export const { useGetFormByIdQuery } = formsApi