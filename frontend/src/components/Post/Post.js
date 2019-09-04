//@flow
import React from "react";

import { connect } from "react-redux";

import Comment from "../Comment/Comment";

import "./style/Post.scss";

type PostProps = {};

const baseClassName = "post";

class Post extends React.Component<PostProps> {
  render() {
    return (
      <div className={`${baseClassName}`}>
        <div className={`${baseClassName}__header`}>
          <span className={`${baseClassName}__header-user`}>Anonymous</span>
          <span className={`${baseClassName}__header-time`}>
            posted 7 hours ago
          </span>
        </div>
        <div className={`${baseClassName}__body`}>{this.props.post.text}</div>
        {this.props.post.comments.length ? (
          this.props.post.comments.map(comment => <Comment comment={comment} />)
        ) : (
          <div>No comments yet.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(mapStateToProps)(Post);
