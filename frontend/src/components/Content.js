import React, { Component } from "react";
import api from "../services/api";

import more from "../assets/more.png";
import like from "../assets/like.png";
import commentIcon from "../assets/comment.png";
import send from "../assets/send.png";

class Content extends Component {
  state = {
    comment: ""
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  handleSubmit = (id, e) => {
    e.preventDefault();
    api
      .post(`/posts/${id}/comment`, {
        comment: this.state.comment
      })
      .then(
        this.setState({
          comment: ""
        })
      );

    // .then(response => {
    //   const feedUpdated = this.state.feed.map(feed => {
    //     if (feed._id === response.data._id) {
    //       feed.comments = response.data.comments;
    //     }
    //     return feed;
    //   });

    //   this.setState({ feed: feedUpdated });
    //   console.log(feedUpdated);
    // });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  render() {
    const {
      author,
      comments,
      description,
      hashtags,
      image,
      likes,
      place,
      _id
    } = this.props.contentInfo;

    return (
      <article key={_id}>
        <header>
          <div className="user-info">
            <span>{author}</span>
            <span className="place">{place}</span>
          </div>

          <img src={more} alt="Mais" />
        </header>
        <img src={`http://localhost:3333/files/${image}`} alt="" />
        <footer>
          <div className="actions">
            <button type="button" onClick={() => this.handleLike(_id)}>
              <img src={like} alt="" />
            </button>
            <img src={commentIcon} alt="" />
            <img src={send} alt="" />
          </div>

          <strong>{likes} curtidas</strong>
          <p>
            {description}
            <span>{hashtags}</span>
          </p>
        </footer>
        <div className="reply">
          {comments.map((value, index) => {
            return <p key={index}>{value}</p>;
          })}
        </div>
        <div className="post-comment">
          <form id="new-comment" onSubmit={e => this.handleSubmit(_id, e)}>
            <textarea
              name="comment"
              id="comment"
              placeholder="Adicione um comentário..."
              onChange={e => this.handleChange(e)}
              value={this.state.comment}
            />
            <button type="submit">Publicar</button>
          </form>
        </div>
      </article>
    );
  }
}

export default Content;
