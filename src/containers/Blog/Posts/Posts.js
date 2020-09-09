import React, {Component} from 'react';
import axios from '../../../Axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Link} from 'react-router-dom';


class Posts extends Component{

    state = {
        posts : []
    }

    selectedPostHandler = (id) =>{
            this.setState({selectedPostId : id});
    }

       componentDidMount(){
        console.log(this.props);
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
              return (<Link to = {'/' + post.id} key ={post.id}>
                        <Post 
                        title = {post.title} 
                        author = {post.author}
                        clicked = {()=>this.selectedPostHandler(post.id)}/>
                        </Link>);
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


