import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Signin } from "./pages/Signin";
import { CreateBlog } from "./pages/CreateBlog";


function App(){
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/" element={<Signup/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
         <Route path="/blogs" element={<Blogs/>}/>
         <Route path="/publish" element={<CreateBlog/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default App