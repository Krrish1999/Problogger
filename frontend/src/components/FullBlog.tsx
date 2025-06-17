
import  type {Blog} from "../hooks"
import formatCustomDate from "../Utils";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";




export const FullBlog = ({ blog }:{ blog:Blog }) => {
    
    return <div>
            <AppBar/>
            <div className=" flex justify-center">
                <div className=" grid grid-cols-12  px-10 w-full  pt-12 max-w-screen-2xl">
                    <div className="col-span-8">
                   
                        <div className="text-5xl font-bold">
                            <h1>{blog.title}</h1>
                        </div>
                        <div className=" text-slate-400  pt-2">
                            {formatCustomDate(blog.updatedAt)}
                        </div>
                        <div className="pt-4">
                           <div dangerouslySetInnerHTML={{ __html: blog.content }} />;
                        </div>      
                
                    </div>
                    <div className=" col-span-4">
                       <div className=" text-slate-600">
                         Author
                        </div> 
                        <div className=" pt-4 flex w-full">
                            <div className=" pr-4 flex justify-center flex-col">
                                <Avatar name={blog.author.name ||  "Anonymous"} size={"big"}/>
                            </div>
                            <div>

                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>

                                <div className="pt-2 text-slate-400 ">
                                    Read catch phrae about author's ability and to grab user's attention
                                </div>
                            </div>

                        </div>
                       

                                

                    </div>
                 </div>
            </div>
            
            
        
    </div>
}