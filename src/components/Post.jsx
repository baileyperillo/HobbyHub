//used to create post on the homepage.
//  Should show the time it was posted, title of the post, upvotes
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "../client";
import { formatDistanceToNow } from 'date-fns';

const Post = ({ id, title, upvotes, createdAt, image_url }) => {
  const [currentUpvotes, setUpvotes] = useState(upvotes || 0);

  // Handle upvoting
  const upvotePost = async () => {
    const { error } = await supabase
      .from("Posts")
      .update({ upvotes: currentUpvotes + 1 })
      .eq("id", Number(id));

    if (error) {
      console.error("Error upvoting post:", error);
    } else {
      setUpvotes(currentUpvotes + 1);
    }
  };

  return (
    <div
      className="Card"
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        margin: '1rem 0',
        borderRadius: '8px',
        position: 'relative',
        backgroundColor: '#fff'
      }}
    >
      {/* Clickable card content */}
      <Link
        to={`/post/${id}`}
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        <p className="created_at" style={{ fontSize: '0.85rem', color: '#555' }}>
          {createdAt
            ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
            : "Unknown time"}
        </p>
        <h2 className="title" style={{ margin: '0.5rem 0' }}>{title}</h2>
        {/* {image_url && (
          <img
            className="image_url"
            src={image_url}
            alt={title}
            style={{ width: '100%', borderRadius: '6px', marginBottom: '0.5rem' }}
          />
        )} */}
        <p className="upvotes">{currentUpvotes} upvotes</p>
      </Link>

      {/* Upvote button outside the link */}
      <button
        onClick={upvotePost}
        style={{
          marginTop: '0.5rem',
          cursor: 'pointer',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          border: 'none',
        //   backgroundColor: '#007bff',
        //   color: '#fff'
        color: 'black'
        }}
      >
        Upvote
      </button>
    </div>
  );
};

export default Post;

 // Time ago helper
//   const timeAgo = (date) => {
//     const now = new Date();
//     const postDate = new Date(date);
//     const seconds = Math.floor((now - postDate) / 1000);

//     if (seconds < 60) return `${seconds} seconds ago`;
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes} minutes ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours} hours ago`;
//     const days = Math.floor(hours / 24);
//     if (days < 30) return `${days} days ago`;
//     const months = Math.floor(days / 30);
//     if (months < 12) return `${months} months ago`;
//     const years = Math.floor(months / 12);
//     return `${years} years ago`;
//   };
