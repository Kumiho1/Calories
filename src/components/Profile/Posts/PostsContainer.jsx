import React from "react";
import Post from "./Post/Post";
import c from './Posts.module.css';
import {addPospActionCreator} from '../../../redux/profileReduser'

import Posts from "./Posts";
import StoreContext from "../../../StoreContext";

const PostsContainer = () => {

    return (
      <StoreContext.Consumer> 
        {
        (store)=> {
          const addPost = (text) => {
            store.dispatch.addPospActionCreator(text);
        }
        (
        <Posts posts={store.getState().profilePage.posts} addPost={addPost}/>
        )}
      }
      </StoreContext.Consumer>
    )
}

export default PostsContainer;