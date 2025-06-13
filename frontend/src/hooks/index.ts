import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"


export interface Blog {
   title: string
   content: string,
   id:string,
   author: { 
       name: string
   }
   updatedAt: string
}

interface BlogState {
   loading: boolean
   blogs: Blog[]
   error: string | null
  
}


export const useBlog  = ({ id }:{ id: string}) =>{
     const [blog, setBlog] = useState<Blog>()
     const [loading , setLoading ] = useState(true)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    throw new Error('No authentication token found')
                }

                const actualToken = token.startsWith('"') ? JSON.parse(token) : token
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${actualToken}`
                    }
                })

                setBlog(response.data.post)
                setLoading(false)
            } catch (error) {
                const errorMessage = error instanceof AxiosError 
                    ? error.response?.data?.message || 'Server error occurred'
                    : 'Failed to fetch blogs'

                setBlog(errorMessage)
                setLoading(false)
            }
        }

        fetchBlogs()
    }, [id])

    return {
        blog,
        loading,
        
    }
}



export const useBlogs= () => {
    const [state, setState] = useState<BlogState>({
        loading: true,
        blogs: [],
        error: null
    })

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    throw new Error('No authentication token found')
                }

                const actualToken = token.startsWith('"') ? JSON.parse(token) : token
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        'Authorization': `Bearer ${actualToken}`
                    }
                })

                setState({
                    loading: false,
                    blogs: response.data.blogs,
                    error: null
                })
            } catch (error) {
                const errorMessage = error instanceof AxiosError 
                    ? error.response?.data?.message || 'Server error occurred'
                    : 'Failed to fetch blogs'

                setState({
                    loading: false,
                    blogs: [],
                    error: errorMessage
                })
            }
        }

        fetchBlogs()
    }, [])

    return state
}