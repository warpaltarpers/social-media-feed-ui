import React, { useState } from 'react'
import avatar from '../tpdne1.jpg'
import { FaPhotoVideo } from 'react-icons/fa'
import './PostCard.css'

const PostCard = (props) => {
  const [inputText, setInputText] = useState()

  const onChange = e => {
    setInputText(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (inputText.trim()) {
      props.addPostProps(inputText)
      setInputText('')
    } else {
      alert('You did not enter anything. Please enter text before submitting your post.')
    }
  }

  return (
    <>
      {/* Card Base */}
      <div className='flex-col container max-w-lg h-auto m-2 rounded-lg shadow-md divide-y divide-solid bg-white'>
        {/* Top Half - Avatar & Text Box */}
        <div className='flex content-start p-4'>
          <img src={avatar} className='rounded-full flex-initial max-h-14 w-14 mb-8' alt='User profile' />
          <textarea
            id='post-input'
            rows={3}
            placeholder='What is on your mind?'
            value={inputText}
            className='flex-grow font-sans placeholder-gray-400 self-start ml-4 mt-3 focus:outline-none'
            onChange={onChange}
          />
        </div>
        {/* Lower Half - Photo/Video & Post Buttons */}
        <div className='flex justify-between p-4'>
          <button className='flex items-center px-4 py-2 text-sm space-x-2 max-h-10 rounded-full bg-gray-900 hover:bg-black text-white duration-150'>
            <FaPhotoVideo />
            <p>Photo/Video</p>
          </button>
          <button className='px-4 py-2 rounded-md text-white font-medium bg-blue-400 hover:bg-blue-500 duration-150' onClick={handleSubmit}>Post It</button>
        </div>
      </div>
    </>
  )
}

export default PostCard