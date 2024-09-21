import { configureStore } from '@reduxjs/toolkit'
import { blogApi } from './featurs/blogs/blogsApi'
export const store=configureStore({
    reducer:{
        [blogApi.reducerPath]:blogApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(blogApi.middleware),
})