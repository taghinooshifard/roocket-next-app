import React, { MouseEventHandler, useState } from 'react'
import Post from '../Models/Post'
import Swal from 'sweetalert2';
import { Bounce, toast } from 'react-toastify';
interface Props{
    post:Post,
    editPostHandler:(myPost:Post)=>void,
    refreshData:()=>void

}
function RowItem(props:Props) {
    console.log(props);
    const deleteHandler:MouseEventHandler<HTMLButtonElement> = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>):void=>{
        Swal.fire({
            title: "Are you sure to Delete Post?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            showLoaderOnConfirm:true,
            preConfirm:async () => {
                try{
                 const response = await   fetch(`https://65f55662f54db27bc022ec4a.mockapi.io/posts/${props.post.id}`, {
                        method: "DELETE", // or 'PUT'
                        headers: {
                          "Content-Type": "application/json",
                        }
                    });
                 if(!response.ok){
                    return Swal.showValidationMessage(`${JSON.stringify(await response.json())}`);
                 }
                 return response.json();

                }catch (error) {
                    Swal.showValidationMessage(`
                      Request failed: ${error}
                    `);
                  }
              },
              allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Post has been deleted.",
                    icon: "success"
                  });
                  props.refreshData()


            }
          });


      }
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {props.post.id}
    </td>
    <td className="px-6 py-4">
        {props.post.title}
    </td>
    <td className="px-6 py-4">
        {new Date(props.post.create_date).toDateString()}
    </td>
    <td className="px-6 py-4">
        <button onClick={()=>{props.editPostHandler(props.post)}} className="bg-blue-300 text-slate-700 hover:bg-blue-200 font-bold rounded-md px-6 py-2 m-1">Edit</button>
        <button onClick={deleteHandler} className="bg-red-300 text-slate-700 hover:bg-red-200 font-bold rounded-md px-6 py-2 m-1">Delete</button>
    </td>
</tr>
  )
}

export default RowItem
