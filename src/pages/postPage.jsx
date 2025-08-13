//should show full post when post is clicked on = summary page
//show time, title, description, image, upvotes
//post has an edit and delete button
//also have a comment box

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../client';
import { formatDistanceToNow } from 'date-fns';
import Comments from '../components/comments';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error(error);
      else setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  const timeAgo = post.created_at
    ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
    : "some time ago";

  console.log("Post image URL:", post.image_url); // Debug

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h1>{post.title}</h1>
      <p style={{ color: '#555', fontSize: '0.9rem' }}>Posted {timeAgo}</p>

      {post.image_url ? (
        <img
            src={post.image_url}
            alt={post.title || "Post image"}
            style={{
            width: '300px',       // fixed width
            height: '200px',      // fixed height
            objectFit: 'cover',   // fills container, crops excess
            borderRadius: '6px',
            display: 'block',
            margin: '1rem 0',
            
            }}
        />
        ) : (
        <p>No image available</p>
        )}


      <p>{post.description}</p>
      <p>{post.upvotes || 0} upvotes</p>

      <Comments postId={id} />

      <Link to={`/edit/${post.id}`}>
        <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Edit Post</button>
      </Link>
    </div>
  );
};

export default PostPage;






// import { useEffect, useState } from 'react'
// //import more from './more.png'
// import { Link } from 'react-router-dom'
// import { useParams } from 'react-router-dom';
// import { supabase } from '../client';
// import { formatDistanceToNow } from 'date-fns';
// import Comments from '../components/comments'


// const PostPage = () => {
//     const { id } = useParams();
//     const [post, setPost] = useState(null);

//     useEffect(() => {
//         const fetchPost = async () => {
//             const { data, error } = await supabase
//                 .from('Posts')
//                 .select('*')
//                 .eq('id', id)
//                 .single();

//             if (error) {
//                 console.error(error);
//             } else {
//                 setPost(data);
//             }
//         };
    
//     fetchPost();
//     }, [id]);

//     if (!post) {
//         return <p>Loading...</p>;  // or a spinner or whatever loading UI you want
//     }


// //    console.log('post.created_at raw:', post.created_at);
// // console.log('typeof created_at:', typeof post.created_at);
// // console.log('Date object:', new Date(post.created_at));
// // console.log('Date valid?', !isNaN(new Date(post.created_at).getTime()));

//     const timeAgo = post.created_at
//     ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
//     : "some time ago";


//     return (
//     <div>
//         <h1>{post.title}</h1>
//         <p>Posted {timeAgo}</p> {/* This line is key */}
//         <img src={post.image_url} alt={post.title} />
//         <p>{post.description}</p>
//         <p>{post.upvotes} upvotes</p>

//         <Comments postId={id} />

//         <Link to={`/edit/${post.id}`}>
//             <button>Edit Post</button>
//         </Link>
    
//         </div>
//     );

// }
// export default PostPage
