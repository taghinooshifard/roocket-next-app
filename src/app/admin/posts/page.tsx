'use client'
import React, { MouseEventHandler, useState } from 'react'
import useSWR, { useSWRConfig }  from 'swr'
import RowItem from '../components/RowItem';
import { Oval } from 'react-loader-spinner';
import Post from '@/app/admin/components/Models/Post';
import Modal from '@/app/admin/components/Dialog/Modal';
import PostModal from '@/app/admin/components/Dialog/PostModal';
const getPosts=(url:string)=>{
  return fetch(url).then((res)=>{
    return res.json();
  })
}
function Posts() {
  const[page,setPage] = useState(1);
  const[isOpen,setIsOpen] = useState(false)
  const[postItem,setPostItem] = useState<Post>({id:0,title:'',text:'',tags:'',image:'',create_date:0})
  const limit = 3;
  const {data,error,isLoading} = useSWR(`https://65f55662f54db27bc022ec4a.mockapi.io/posts?page=${page}&limit=${limit}`,(url)=>getPosts(url))
  const { mutate } = useSWRConfig()
  const nextButtonHandler:MouseEventHandler<HTMLButtonElement> = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>):void=>{
    setPage(()=>page+1)
  }
  const prevButtonHandler:MouseEventHandler<HTMLButtonElement> = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>):void=>{
    setPage(()=>page-1)
  }
  const modalCloseHandler=()=>{
    console.log('modalCloseHandler');

    setIsOpen(false);
    mutate(`https://65f55662f54db27bc022ec4a.mockapi.io/posts?page=${page}&limit=${limit}`)
  }
  const newPostHandler:MouseEventHandler<HTMLButtonElement> = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>):void=>{
    setPostItem({...postItem,id:0,title:'',text:'',tags:'',image:'',create_date:Date.now()})
    setIsOpen(true);
  }
  const editPostHandler = (myPost:Post):void=>{
    setPostItem({...postItem,id:myPost.id,title:myPost.title,text:myPost.text,tags:myPost.tags,image:myPost.image,create_date:myPost.create_date})
    setIsOpen(true);
  }
  return (
    <div className="my-2 mx-4"  >
      <Modal  hasCloseBtn={true} isOpen={isOpen} onClose={modalCloseHandler}>
        {<PostModal post={postItem}/>}
      </Modal>
      <button onClick={newPostHandler} className="bg-green-300 text-slate-700 hover:bg-green-200 font-bold rounded-md px-6 py-2 my-2">New Post</button>
      <div>
      {isLoading
      ?
        /* is loading */
        <div className="flex flex-col justify-center items-center h-screen">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
            <p className="text-green-600 font-bold">Please Wait...</p>
      </div>
      :
      /* has error  */
      error != undefined
      ?


        (<div className="text-red-600"><span className="font-bold">Error: </span>{error.message}</div>)
      :
      /* show table  */
      (
      <>
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Create Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {data?.map((post:Post)=>(<RowItem key={post.id} refreshData={modalCloseHandler}  editPostHandler={editPostHandler} post={{...post}}/>))}

                </tbody>
            </table>
            <div className="flex items-center justify-center gap-2 mt-2">
                <button onClick={prevButtonHandler} className={`px-6 py-2 rounded-md ${ page-1==0 ?`bg-slate-100` :`bg-slate-300 hover:bg-slate-200` }  text-blue-900`} disabled={page-1==0}>Prev</button>
                <button onClick={nextButtonHandler} className={`px-6 py-2 rounded-md ${data?.length!=limit?`bg-slate-100` :`bg-slate-300 hover:bg-slate-200`  }  text-blue-900`} disabled={data?.length!=limit} >Next</button>
            </div>
      </>
      )
        }

      </div>

    </div>
  )
}

export default Posts
