import React from 'react'
import avatar from '../tpdne1.jpg'
import TimeAgo from 'timeago-react';
import { FaPencilAlt, FaHeart, FaTrash } from 'react-icons/fa'

const CommentFeed = (props) => {
  const handleCommentLike = cId => {
    props.commentLikeHandler(cId)
  }

  const handleCommentDelete = cId => {
    props.commentDeleteHandler(cId)
  }

  return (
    <div>
      {
        props.comments.map((data) => {
          return (
            <>
              <div className={
                data.id === props.comments[props.comments.length - 1].id
                  ? 'flex items-center px-4 pb-4 rounded-b-lg bg-gray-100 space-x-4'
                  : 'flex items-center px-4 pb-4 bg-gray-100 space-x-4'
              }>
                <img src={avatar} className='rounded-full flex-initial max-h-8 w-8 sm:max-h-10 sm:w-10' alt='User profile' />
                <div className='p-3 bg-periwinkle rounded-lg w-full'>
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
                        onClick={() => handleCommentLike(data.id)}
                      >
                        <FaHeart className='fill-current' />
                        <p>{data.isLiked ? 'Liked' : 'Like'}</p>
                      </button>
                      <button className='flex items-center space-x-1 rounded-full bg-transparent text-gray-500'
                      >
                        <FaPencilAlt className='fill-current' />
                        <p>Edit</p>
                      </button>
                      <button className='flex items-center space-x-1 rounded-full bg-transparent text-gray-500 hover:text-black duration-150' onClick={() => handleCommentDelete(data.id)}
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
  )
}

export default CommentFeed
