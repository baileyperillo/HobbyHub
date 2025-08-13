//form when user presses on edit button
//should allow to change title, description, or URL
//update button

import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
//import './EditPost.css'
import { supabase } from '../client'

const EditPost = ({data}) => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [post, setPost] = useState({
        id: null, 
        title: "", 
        description: "", 
        image_url: "", 
        upvotes: 0
    })


      // Fetch existing post data on mount
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error('Error loading post:', error)
            } else if (data) {
                setPost({
                title: data.title || '',
                description: data.description || '',
                image_url: data.image_url || '',
                upvotes: data.upvotes || 0,
                })
            }
        }
        fetchPost()
    }, [id])


    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event, error) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .update({ 
                title: post.title, 
                description: post.description,
                image_url: post.image_url, 
                upvotes: post.upvotes
            
            })
            .eq('id', id);

            if (error) {
                console.error('Error updating post:', error)
            } else {
                navigate(`/post/${id}`) // Go back to post details after update
            }

        window.location = "/";
    }

    // UPDATE post
    const deletePost = async (event, error) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .delete()
            .eq('id', id); 

        if (error) {
            console.error('Error deleting post:', error)
        } else {
            navigate('/') // Go home after delete
        }

        window.location = "/";
    }

    return (
       <div>
        <h2>Edit Post</h2>
        <form onSubmit={updatePost}>
            <label htmlFor="title">Title</label>
            <br />
            <input
                type="text"
                id="title"
                name="title"
                value={post.title}
                onChange={handleChange}
                required
            />
            <br />
            <br />

            <label htmlFor="description">Description (optional)</label>
            <br />
            <textarea
                id="description"
                name="description"
                rows="5"
                cols="50"
                value={post.description}
                onChange={handleChange}
            />
            <br />
            <br />

            <label htmlFor="image_url">Image URL (optional)</label>
            <br />
            <input
                type="text"
                id="image_url"
                name="image_url"
                value={post.image_url}
                onChange={handleChange}
            />
            <br />
            <br />

            <button type="submit">Update Post</button>
            <button type="button" onClick={deletePost} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                Delete Post
            </button>
        </form>
    </div>
    )
}

export default EditPost

{/* <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange} >
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton">Delete</button>
            </form>
 */}