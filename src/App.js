import './App.css';
import { postsData } from './posts.jsx';
import PostCard from './components/PostCard';
import FeedCard from './components/FeedCard';
import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [posts, setPosts] = useState(getInitialPosts());
  
  useEffect(() => {
    const temp = JSON.stringify(posts)
    localStorage.setItem('posts', temp)
  }, [posts])
  
  function getInitialPosts() {
    const temp = localStorage.getItem('posts')
    const savedPosts = JSON.parse(temp)
    return savedPosts || postsData
  }
  
  function getTimestamp() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var hr = String(today.getHours()).padStart(2, '0');
    var min = String(today.getMinutes()).padStart(2, '0');
    var sec = String(today.getSeconds()).padStart(2, '0');
    
    let timestamp = yyyy + '-' + mm + '-' + dd + ' ' + hr + ':' + min + ':' + sec;
    
    return timestamp;
  }
  
  const addPostToFeed = content => {
    const newPost = {
      key: uuidv4(),
      name: 'Fake Guy',
      location: 'OH, USA',
      timestamp: getTimestamp(),
      content: content,
      likes: 0,
      comments: [],
      isLiked: false
    }
    setPosts([newPost, ...posts])
  }
  
  const addCommentToPost = (comment, key) => {
    const newComment = {
      key: uuidv4(),
      name: 'Fake Guy',
      title: 'Bot Lane',
      timestamp: getTimestamp(),
      content: comment,
      likes: 0,
      isLiked: false
    }
    setPosts(prevState =>
      prevState.map(post => {
        if(post.key === key) {
          return {
            ...post,
            comments: [newComment, ...post.comments]
          }
        }
        return post
      })         
    )
  }
  
  const deleteComment = (pKey, cKey) => {
    setPosts(prevState =>
      prevState.map(post => {
        if(post.key === pKey) {
          post.comments = [
            ...post.comments.filter(c => {
              return c.key !== cKey
            })
          ]
          return {
            ...post
          }
        }
        return post
      })         
    )
  }
  
  const likeComment = (pKey, cKey) => {
    setPosts(prevState =>
      prevState.map(post => {
        if(post.key === pKey) {
          post.comments = [
            ...post.comments.map(c => {
              if(c.key === cKey) {
                c.isLiked = !c.isLiked
                return {
                  ...c
                }
              }
              return c
            })
          ]
          return {
            ...post
          }
        }
        return post
      })         
    )
  }
  
  const likePost = pKey => {
    setPosts(prevState =>
      prevState.map(post => {
        if (post.key === pKey) {
          return {
            ...post,
            isLiked: !post.isLiked
          }
        }
        return post
      })         
    )
  }
  
  return (
    <div id="main" className="App">
      <PostCard 
        addPostProps={addPostToFeed}
      />
      {
        posts.map((data) => {
          return <FeedCard 
            key={uuidv4()}
            name={data.name}
            location={data.location}
            timestamp={data.timestamp}
            content={data.content}
            likes={data.likes}
            comments={data.comments}
            isLiked={data.isLiked}
            addCommentProps={addCommentToPost}
            handleLikeProps={likePost}
            handleCommentDeleteProps={deleteComment}
            handleCommentLikeProps={likeComment}
          />
        })
      }
    </div>
  );
}

export default App;
