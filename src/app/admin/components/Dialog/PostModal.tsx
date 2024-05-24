import React from 'react'
import Post from '../Models/Post'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Oval } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { Bounce, toast } from 'react-toastify';

const PostSchema = Yup.object().shape({

title: Yup.string()

    .min(5, 'Too Short!')

    .max(70, 'Too Long!')

    .required('Required'),
tags: Yup.string()

    .min(2, 'Too Short!')

    .max(70, 'Too Long!')

    .required('Required'),
text: Yup.string()

    .min(10, 'Too Short!')

    .max(1000, 'Too Long!')

    .required('Required'),
image: Yup.string()
    .url('Url is Invalid')
    .min(10, 'Too Short!')

    .max(300, 'Too Long!')

    .required('Required'),



});
interface Props{
    post:Post
}
function PostModal(props:Props) {
    console.log(props.post);

  return (
    <div className="flex flex-col justify-center items-center rounded-md">
    <h1 className="w-full  bg-sky-300 text-center">Post Form</h1>
    <Formik validationSchema={PostSchema} enableReinitialize={true}
      initialValues={{...props.post }}
      onSubmit={(values, actions) => {
        // setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     actions.setSubmitting(false);
        //   }, 1000);
        try{
            fetch(props.post.id ==0 ? 'https://65f55662f54db27bc022ec4a.mockapi.io/posts' :`https://65f55662f54db27bc022ec4a.mockapi.io/posts/${props.post.id}`, {
                method: props.post.id ==0 ? "POST" :"PUT", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            .then(response => {
                console.log(response);

                if(response.status>399)
                    toast.error(`Error: (${response.statusText}),code=${response.status}`, {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                        });
                if(response.status>199 && response.status<300)
                    toast.success('Post Submitted', {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                        });

                actions.setSubmitting(false);
                return response.json();
            })
            .then(data =>{
                 actions.setSubmitting(false);
                 console.log(data)
                })
            .catch(error => {
                toast.error(`Error: ${error?.message}`, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                    });
            });
        }
        catch(error) {
            console.log('catch:',error);

        }



      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col px-10">
          {isSubmitting &&  <div className="flex flex-col justify-center items-center">
          <Oval
            visible={true}
            height="20"
            width="20"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
            <p className="text-green-600 font-bold">Please Wait...</p>
      </div>}
          <Field  name="id"   type="hidden" />
          <label htmlFor="title">title:</label>
          <Field className="px-2" name="title" placeholder="Post title" type="text" />
          <ErrorMessage className="text-red-600" name="title" component="div" />

          <label htmlFor="text">text:</label>
          <Field className="px-2" name="text" placeholder="Post text" type="text" />
          <ErrorMessage className="text-red-600" name="text" component="div" />

          <label htmlFor="image">image:</label>
          <Field className="px-2" name="image" placeholder="Post image address" type="text" />
          <ErrorMessage className="text-red-600" name="image" component="div" />

          <label htmlFor="tags">tags:</label>
          <Field className="px-2" name="tags" placeholder="tags ,..,...," type="text" />
          <ErrorMessage className="text-red-600" name="tags" component="div" />

          <button type="submit" disabled={isSubmitting} className={`px-5 py-2 my-5 rounded-md bg-green-700 hover:bg-green-600 ${isSubmitting && `bg-slate-500  hover:bg-slate-500 `} text-white`}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default PostModal
