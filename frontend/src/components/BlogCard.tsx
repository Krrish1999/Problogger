import { Link } from "react-router-dom";



interface BlogInputes{
    authorName : string;
    title : string;
    publishDate : string;
    content : string;
    id:string
}

export const BlogCard = ({
    id,
    authorName ,
    title,
    publishDate, 
    content 
}:BlogInputes) =>{
    
    return <Link to={`/blog/${id}`}>
        <div className=" p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            
            <div className="flex ">
                <Avatar name={authorName} size="small" />
                
                    <div className=" font-extralight pl-2 text-sm  flex justify-center flex-col ">
                        {authorName} 
                    </div>
                    <div className=" pl-2 flex justify-center flex-col ">
                        <Circle />
                    </div>
                    <div className="text-slate-500 pl-2 font-thin text-sm flex justify-center flex-col"> 
                      
                        {publishDate}
                    </div>
            </div>
                <div className="text-2xl font-semibold pt-2">
                    <div dangerouslySetInnerHTML={{ __html: title }} />
                </div>
                <div className="text-md font-thin">
                  
                     <div dangerouslySetInnerHTML={{ __html: content.slice(0,100) + "..." }} />
                </div>
                <div className="text-slate-400 text-sm font-thin pt-2">s
                    {`${Math.ceil(content.length/100)}`+"minutes(s) read"}
                </div>

        </div>
    </Link>
}


export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({name, size}:{name:string , size:"small" | "big"}){
    return<div className = {`relative inline-flex items-center justify-center ${size=="small"? "w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`font-medium ${size == "small"? "text-sm" :"text-md"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
  </div>

    

}