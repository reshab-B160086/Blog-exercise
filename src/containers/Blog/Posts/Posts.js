import React, {Component} from 'react';
import axios from '../../../Axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Link, Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';


class Posts extends Component{

    state = {
        posts : []
    }

    selectedPostHandler = (id) =>{
            //this.props.history.push({pathname : '/' + id}); // prograatically
            this.props.history.push('/posts/'+id);
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
              return (
                    //<Link to = {'/' + post.id} key ={post.id}>
                        <Post 
                        key ={post.id}
                        title = {post.title} 
                        author = {post.author}
                        clicked = {()=>this.selectedPostHandler(post.id)}/>);
                      //  </Link>);
        })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path ={this.props.match.url + '/:id'} exact component = {FullPost} />
            </div>
        );



     }
}

export default Posts;


