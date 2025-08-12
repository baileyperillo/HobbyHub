//might be changed to App.jsx = readPosts.jsx
//should show a list of posts
//navbar on top
//posts can be sorted by newest or most popular/most upvotes

import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'


const homepage = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        // READ all post from table
        const fetchPosts = async () => {
        const {data} = await supabase
            .from('Posts')
            .select();

        // set state of posts
        setPosts(data)
        }
        fetchPosts()
    }, [props])
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                [...posts]
                .sort((a, b) => a.id - b.id)
                .map((post,index) => 
                    <Card 
                        key={post.id}
                        id={post.id} 
                        title={post.title}
                        author={post.author}
                        description={post.description}
                    />
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default homepage