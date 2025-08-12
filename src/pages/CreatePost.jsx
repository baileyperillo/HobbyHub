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
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    //function
    const createPost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .insert({
                created_at: post.created_at,
                title: post.title,
                description: post.description,
                image_url: post.image_url
            
            })
            .select();

        window.location = "/";
    }

    return (
        <div className = "createPost">
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" onChange={handleChange}>
                </textarea>
                <br/>

                <label htmlFor="image_URL">image URL</label><br />
                <input type="text" id="image_URL" name="image_URL" onChange={handleChange} /><br />
                <br/>
                <input type="submit" value="Submit" onClick={createPost}/>
                
            </form>
        </div>
    )
}

export default CreatePost
