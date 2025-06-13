import { useState } from 'react';
import MediumEditor from '../components/Editor';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { AppBar } from '../components/AppBar';
import { useNavigate } from 'react-router-dom';

export const CreateBlog = () => {
  const [content, setContent] = useState<string>('')
  const navigate = useNavigate()

  const handleContentChange = async () => {
     if (!content) {
      console.error("Content is empty");
      return;
    }
    try {
      const token = localStorage.getItem('token')
      if (!token) {
          throw new Error('No authentication token found')
      }
      const actualToken = token.startsWith('"') ? JSON.parse(token) : token
      const response =  await axios.post(`${BACKEND_URL}/api/v1/blog`,{ content },  
        {
          headers: {
            'Authorization': `Bearer ${actualToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      navigate(`/blog/${response.data.id}`)
    } catch (error){
      console.log(error)
    }
  }
  return (
      <div>
        <AppBar  onClick={handleContentChange}  />
        <MediumEditor onContentChange={(html) => setContent(html)} /> 
      </div>

  );
};
