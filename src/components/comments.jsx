//comment section or comment box in postPage.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { formatDistanceToNow } from 'date-fns'


const Comments = ({ postId }) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [newComment, setNewComment] = useState('')

    useEffect(() => {

        // console.log("Fetching comments for postId:", postId);
        // if (!postId) return;
        // // fetch comments...

        const fetchComments = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', postId)
            .order('created_at', { ascending: true })
        
        if (error) {
            console.error('Error fetching comments:', error)
        } else {
            setComments(data)
        }
        setLoading(false)
        }
        if (postId) fetchComments()
    }, [postId])


    const handleAddComment = async (e) => {
        e.preventDefault()
        if (!newComment.trim()) return // ignore empty
        
        const { data, error } = await supabase
        .from('comments')
        .insert([
            {
            post_id: postId,
            content: newComment
            }
        ])
        .select();

        if (error) {
        console.error('Error adding comment:', error)
        } else if (data && data.length > 0) {
            setComments(prev => [...prev, data[0]]); // append new comment
            setNewComment('');
        } else {
            console.warn('No data returned after insert');
        }
    }

    return (
        <div className= "comments">
        <h3>Comments</h3>
        {loading ? <p>Loading comments...</p> : null}

        <ul className="comment-lst" >
            {comments.map(c => (
                <li key={c.id} style={{
                    display: 'flex',             // row layout
                    justifyContent: 'space-between', // push content and time apart
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #ddd'
                    }}>
                    {/* Left side: comment content */}
                    <div>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{c.author || 'Anonymous'}</p>
                        <p style={{ margin: 0 }}>{c.content}</p>
                    </div>

                    {/* Right side: time */}
                    <div style={{ fontSize: '0.8rem', color: '#555' }}>
                        {formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}
                    </div>
                </li>
            ))}
        </ul>

        <form onSubmit={handleAddComment}>
            <textarea 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            placeholder="Write a comment..." 
            rows={3} 
            cols={40}
            />
            <br />
            <button type="submit">Add Comment</button>
        </form>
        </div>
    )
}

export default Comments
