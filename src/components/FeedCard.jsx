import React, { useState } from 'react'
import avatar from '../tpdne1.jpg'
import { FaCommentDots, FaEllipsisH, FaHeart, FaMapMarkerAlt, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid';
import TimeAgo from 'timeago-react';

const FeedCard = (props) => {
  const [comment, setComment] = useState();
  const [commentList, setCommentList] = useState(props.comments);
  const [key, setKey] = useState(props.key);

  const onChange = e => {
    setComment(e.target.value)
  }

  function handlePostLike() {
    props.handleLikeProps(key)
  }

  const handleCommentPost = e => {
    e.preventDefault()
    if (comment.trim()) {
      props.addCommentProps(comment, key)
      setComment('')
    } else {
      alert('You did not enter anything. Please enter text before submitting your comment.')
    }
  }

  function handleCommentLike(commentKey) {
    props.handleCommentLikeProps(key, commentKey)
  }

  function handleCommentDelete(commentKey) {
    props.handleCommentDeleteProps(key, commentKey)
  }

  return (
    <>
      {/* Card Base */}
      <div className='flex-row container max-w-lg h-auto rounded-lg shadow-md bg-white m-2'>

        {/* Top Fourth - Avatar & User/Post Info */}
        <div className='flex pt-4 px-4 pb-2 w-full align items-center'>

          {/* User Avatar */}
          <img src={avatar} className='rounded-full flex-initial max-h-14 w-14' alt='User profile' />

          {/* User & Post Info */}
          <div className='ml-4 align-top w-full'>

            {/* Name & Options */}
            <div className='flex w-full items-center justify-between'>
              <p className='text-gray-600 font-bold'>{props.name}</p>
              <FaEllipsisH className='text-gray-500 hover:text-current duration-150' />
            </div>

            {/* Location */}
            <span className='flex items-center align text-blue-500 space-x-1 text-sm font-semibold'>
              <FaMapMarkerAlt />
              <p>{props.location}</p>
            </span>

            {/* Time */}
            <TimeAgo className='flex ml-0.5 text-tiny font-sans font-semibold text-gray-600' datetime={props.timestamp} live={false} />

          </div>
        </div>

        {/* Mid-Top Fourth - Post Content */}
        <div className='pl-4 pb-2'>
          <p>{props.content}</p>
        </div>

        {/* Mid-Low Fourth - Like/Comment Counters */}
        <div className='space-x-2 pl-4 pb-2 flex text-gray-600 text-sm'>
          <p>{props.isLiked ? props.likes + 1 : props.likes} Likes</p>
          <p>•</p>
          <p>{commentList.length} Comments</p>
        </div>

        {/* Lower Fourth - Like & Comment Buttons + Feed */}
        {
          commentList.length === 0
            // No comments
            ? <div className='flex justify-start pl-2 pb-3 bg-gray-100 rounded-b-lg'>
              {/* Like Button */}
              <button className={
                props.isLiked
                  ? 'flex items-center px-2 pt-3 space-x-2 max-h-10 rounded-full bg-transparent text-red-500 duration-150'
                  : 'flex items-center px-2 pt-3 space-x-2 max-h-10 rounded-full bg-transparent text-gray-600 hover:text-red-500 duration-150'
              }
                onClick={() => handlePostLike()}
              >
                <FaHeart className='fill-current' />
                <p>{props.isLiked ? 'Liked' : 'Like'}</p>
              </button>

              {/* Comment Button */}
              <button className='flex items-center px-2 pt-3 space-x-2 max-h-10 rounded-full bg-transparent text-gray-600 hover:text-blue-500 duration-150'>
                <FaCommentDots className='fill-current' />
                <p>Comment</p>
              </button>
            </div>

            // Has comments
            : <>
              <div className='flex justify-start pl-2 pb-3 bg-gray-100'>
                {/* Like Button */}
                <button className={
                  props.isLiked
                    ? 'flex items-center px-2 pt-3 space-x-2 max-h-10 rounded-full bg-transparent text-red-500 duration-150'
                    : 'flex items-center px-2 pt-3 space-x-2 max-h-10 rounded-full bg-transparent text-gray-600 hover:text-red-500 duration-150'
                }
                  onClick={() => handlePostLike()}
                >
                  <FaHeart className='fill-current' />
                  <p>{props.isLiked ? 'Liked' : 'Like'}</p>
                </button>

                {/* Comment Button */}
                <button className='flex items-center px-2 pt-3 space-x-2 max-h-10 rounded-full bg-transparent text-gray-600 hover:text-blue-500 duration-150'>
                  <FaCommentDots className='fill-current' />
                  <p>Comment</p>
                </button>
              </div>

              {/* Comment Field */}
              <div className='flex items-center px-4 pb-4 space-x-4 bg-gray-100 rounded-b-lg'>
                <img src={avatar} className='rounded-full flex-initial max-h-8 w-8' alt='User profile' />
                <form onSubmit={handleCommentPost} className='w-full'>
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    className="placeholder-gray-400 rounded-full p-2 w-full bg-transparent border-2 border-gray-400 focus:outline-none"
                    onChange={onChange}
                  />
                </form>
              </div>

              {/* Comment Feed */}
              <div>
                {
                  commentList.map((data) => {
                    data.key = uuidv4();
                    return (
                      <>
                        <div className='flex items-center px-4 pb-4 rounded-b-lg bg-gray-100 space-x-4'>
                          <img src={avatar} className='rounded-full flex-initial max-h-8 w-8' alt='User profile' />
                          <div className='p-3 bg-periwinkle rounded-md w-full'>
                            <div className='ml-2'>
                              {/* Name & Time */}
                              <div className='flex w-full justify-between'>
                                <p className='text-gray-600 font-bold'>{data.name}</p>
                                <TimeAgo className='text-xs font-semibold font-sans text-periwinkle-dark' datetime={data.timestamp} live={false} />
                              </div>

                              {/* Title */}
                              <p className='flex items-center text-blue-500 space-x-1 text-sm font-semibold'>{data.title}</p>

                              {/* Comment */}
                              <p className='text-sm pt-1 pb-2'>{data.content}</p>

                              {/* Bottom Bar */}
                              <div className='flex items-center space-x-3 text-sm text-gray-500'>
                                <p>{data.isLiked ? data.likes + 1 : data.likes} Likes</p>
                                <button className={
                                  data.isLiked
                                    ? 'flex items-center space-x-1 rounded-full bg-transparent text-red-500 duration-150'
                                    : 'flex items-center space-x-1 rounded-full bg-transparent text-gray-500 hover:text-red-500 duration-150'
                                }
                                  onClick={() => handleCommentLike(data.key)}
                                >
                                  <FaHeart className='fill-current' />
                                  <p>{data.isLiked ? 'Liked' : 'Like'}</p>
                                </button>
                                <button className='flex items-center space-x-1 rounded-full bg-transparent text-gray-500'
                                >
                                  <FaPencilAlt className='fill-current' />
                                  <p>Edit</p>
                                </button>
                                <button className='flex items-center space-x-1 rounded-full bg-transparent text-gray-500' onClick={() => handleCommentDelete(data.key)}
                                >
                                  <FaTrash className='fill-current' />
                                  <p>Delete</p>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                }
              </div>
            </>
        }
      </div>
    </>
  )
}

export default FeedCard
