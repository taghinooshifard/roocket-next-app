import Link from "next/link";

export default function Error(){
    return <div className="flex flex-col justify-center items-center h-screen gap-2">
             <p className="text-red-600 text-2xl">Page Not Found!</p>
             <Link className="px-4 py-2 bg-inherit border rounded-md hover:bg-blue-300" href={'/'}>go to home...</Link>
         </div>
}