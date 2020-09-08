import React, {Component} from 'react';
import axios from '../../../Axios';
import Post from '../../../components/Post/Post';
import './Posts.css'


class Posts extends Component{

    state = {
        posts : []
    }

    selectedPostHandler = (id) =>{
            this.setState({selectedPostId : id});
    }

       componentDidMount(){
        axios.get('/posts')
            .then(response =>{
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post =>{
                    return {
                        ...post,
                        author : "Reshab"
                    }
                });
                this.setState({posts : updatedPosts});
            })
            .catch(error =>{
                console.log(error)
                this.setState({error : true});
            })
    }


    render(){

        let posts = <p style ={{textAlign : 'center'}}>Something went wrong !!! </p>;

        if(!this.state.error){
             posts = this.state.posts.map(post =>{
              return <Post 
                        key = {post.id} 
                        title = {post.title} 
                        author = {post.author}
                        clicked = {()=>this.selectedPostHandler(post.id)}/>
        })
        }

        return (
                <section className="Posts">
                    {posts}
                </section>
        );



     }
}

export default Posts;


