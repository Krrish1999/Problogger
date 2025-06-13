import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import DOMPurify from "dompurify";
import formatCustomDate from "../Utils";
import { SkeletonLoaders } from "../components/SkeletonLoaders";


export const Blogs = () =>{
    const {loading, blogs, error} = useBlogs();
    if(loading){
        return <div>
          <AppBar/>
           <div className=" flex justify-center">
                <div>
                    <SkeletonLoaders/>
                    <SkeletonLoaders/>
                    <SkeletonLoaders/>
                    <SkeletonLoaders/>
                    <SkeletonLoaders/>
                </div>
           </div>
        </div>
    }
    if (error) return <div>Error: {error}</div>
    console.log(blogs)

    return <div>
        <AppBar/>
        <div className="flex justify-center">
            <div className="">
                {blogs.map(blog =>
                    <BlogCard 
                    id={blog.id}
                    authorName={blog.author.name}
                    title={DOMPurify.sanitize(blog.title)}
                    content={DOMPurify.sanitize(blog.content)}

                    publishDate={formatCustomDate(blog.updatedAt)}
                />

                )}
                
            </div>
        </div>
    </div>
}