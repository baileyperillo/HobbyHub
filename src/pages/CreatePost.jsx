//form in the center
//should have user enter title, optional description, URL image
//buttom to create post
//maybe lead back to homepage to see post on screen
import { supabase } from '../client'
import { useState } from 'react'
import './CreatePost.css' //optional

const CreatePost = () => {
    const [post, setPost] = useState({title: "", image_url: "", description: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const createPost = async (event) => {
        event.preventDefault();

        try {
            const { data, error } = await supabase
                .from('Posts')
                .insert({
                    title: post.title,
                    description: post.description,
                    image_url: post.image_url
                })
                .select();

            if (error) {
                throw error;
            }

            window.location = "/";
        } catch (error) {
            console.error('Error creating post:', error.message);
            // You could add user feedback here (e.g., toast notification)
        }
    }
    
    return ( 
        <div className="createPost">
            <form className="create-post-form">
                <label htmlFor="title">Title</label><br />
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    className="post-input" 
                    onChange={handleChange} 
                    required
                /><br />
                <br/>

                <label htmlFor="description">Description (optional)</label><br />
                <textarea 
                    rows="5" 
                    cols="50" 
                    id="description" 
                    name="description" 
                    className="post-textarea" 
                    onChange={handleChange}
                ></textarea>
                <br/>

                <label htmlFor="image_url">Image URL (optional)</label><br />
                <input 
                    type="text" 
                    id="image_url" 
                    name="image_url"  // Fixed to match state key
                    className="post-input" 
                    onChange={handleChange} 
                /><br />
                <br/>

                <input type="submit" value="Submit" onClick={createPost}/>
            </form>
        </div>
    )
}

export default CreatePost