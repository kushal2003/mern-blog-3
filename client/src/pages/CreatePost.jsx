import React from 'react'
import { TextInput } from 'flowbite-react'
import { Select, FileInput,Button } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>
            Create a new post
        </h1>
        <form className='flex flex-col gap-4' >
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput className='flex-1' type='text' placeholder='Title' required id='title'/>
                <Select>
                    <option value="uncategorized"> Select a Category</option>
                    <option value="javascript"> JavaScript </option>
                    <option value="react">React </option>
                    <option value="nextjs"> Next Js</option>
                </Select>
            </div>
            
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput 
                    type='file'
                    accept='image/*'
                ></FileInput>
                <Button type = 'button' gradientDuoTone='purpleToPink' size='sm' outline> Upload Image</Button>
            </div>
            <ReactQuill theme='snow' placeholder='Write Something to post' className='h-72 mb-12'/> 
            <Button type='submit ' gradientDuoTone='purpleToPink' outline>
                Publish
            </Button>
        </form>
    </div>
  )
}

export default CreatePost