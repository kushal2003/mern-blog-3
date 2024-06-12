import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PostPage() {
    const{postSlug} =useParams();
    console.log(postSlug)
    const [loading , setLoading]= useState(true)
    const [error,setError]= useState(false);
    const [post,setPost]= useState(null);

    useEffect(()=>{
        const fetchPost= async()=>{
            try {
                setLoading(true);
                const res= await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = res.json();
                if (!res.ok)
                {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok)
                {
                    setPost (data.posts[0]);
                    setLoading(false);
                    setError(false);

                }
            } catch (error) {
                setLoading(false);
                setError(true)
            }
        }
        fetchPost();
    },[postSlug]);

    if (loading)
    {
        return <div>Loading.....</div>
    }
    // console.log(post);
  return (
    <div>PostPage</div>
  )
}

export default PostPage