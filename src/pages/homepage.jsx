//might be changed to App.jsx = readPosts.jsx
//should show a list of posts
//navbar on top
//posts can be sorted by newest or most popular/most upvotes
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import Post from '../components/Post';

const Homepage = ({ searchTerm }) => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("created_at"); // "created_at" or "upvotes"

  // Fetch posts whenever sortBy changes
  useEffect(() => {
    const fetchPosts = async () => {
      //console.log("Fetching posts sorted by:", sortBy); // Debug

      const { data, error } = await supabase
        .from('Posts')
        .select("*")
        .order(sortBy, { ascending: false }); // descending for newest or most upvotes

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        console.log("Fetched posts:", data); // Debug
        setPosts([...data]);
      }
    };

    fetchPosts();
  }, [sortBy]);

  // Filter posts by searchTerm
  const filteredPosts = posts.filter(post =>
    (post.title || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  return (
    <div className="ReadPosts">
      {/* Sorting buttons at the top */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setSortBy("created_at")}
          style={{ fontWeight: sortBy === "created_at" ? 'bold' : 'normal' }}
        >
          Sort by Newest
        </button>
        <button
          onClick={() => setSortBy("upvotes")}
          style={{ fontWeight: sortBy === "upvotes" ? 'bold' : 'normal' }}
        >
          Sort by Upvotes
        </button>
      </div>

      {/* Render posts */}
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            upvotes={post.upvotes}
            createdAt={post.created_at}
            image_url={post.image_url}
          />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Homepage;
