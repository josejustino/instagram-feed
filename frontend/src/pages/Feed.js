import React, { Component } from "react";
import api from "../services/api";
import io from "socket.io-client";
import Content from "../components/Content";

import "./Feed.css";

class Feed extends Component {
  state = {
    feed: []
  };

  // Monta os posts no Feed
  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get("posts");

    this.setState({
      feed: response.data
    });
  }

  registerToSocket = () => {
    const socket = io("http://localhost:3333");

    // post
    socket.on("post", newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    // like
    socket.on("like", likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likedPost._id ? likedPost : post
        )
      });
    });

    // comment
    socket.on("comment", commentedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === commentedPost._id ? commentedPost : post
        )
      });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    return (
      <section id="post-list">
        {this.state.feed.map((post, index) => (
          <Content contentInfo={post} key={index} />
        ))}
      </section>
    );
  }
}

export default Feed;
