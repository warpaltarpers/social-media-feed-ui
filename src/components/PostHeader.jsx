import React from 'react'
import avatar from '../tpdne1.jpg'
import { FaEllipsisH, FaMapMarkerAlt } from 'react-icons/fa'
import TimeAgo from 'timeago-react';

const PostHeader = (props) => {
  return (
    <div className='flex pt-4 px-4 pb-2 w-full align items-center'>
      {/* User Avatar */}
      <img src={avatar} className='rounded-full flex-initial max-h-12 w-12 sm:max-h-14 sm:w-14 duration-150' alt='User profile' />

      {/* User & Post Info */}
      <div className='ml-3 sm:ml-4 align-top w-full'>

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
  )
}

export default PostHeader
