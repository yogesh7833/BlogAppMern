import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath:"blogsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000/api/',
    }),
    endpoints: (builder)=>(
        {
            fetchBlogs : builder.query({
                query:({search='', category='', location=''})=> `/blogs?search=${search}&category=${category}&location=${location}`
            })
        }
    )
  })

  export const {useFetchBlogsQuery}=blogApi;