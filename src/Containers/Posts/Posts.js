import React, { Component } from "react";
import { Form, Card, Icon, Input, Button } from "antd";
import { inject, observer } from "mobx-react";
import AddPost from "./AddPost";
import "./Posts.scss";

const { Meta } = Card;

@inject("posts")
@observer
class Posts extends Component {
  componentDidMount() {
    this.props.posts.getPosts();
  }
  render() {
    console.log("this", this.props.posts.posts);
    return (
      <div className="post-wrapper">
        <AddPost />
        {this.props.posts.posts.map(post => {
          return (
            <Card
              key={post.id}
              className="post-card"
              actions={[
                <Icon
                  onClick={() => this.props.posts.onVote(post.id)}
                  type="like"
                  theme={post.isVoted && "twoTone"}
                  twoToneColor="#118ac3"
                />
              ]}
            >
              <Meta
                title={post.name}
                description={`${post.votes.length} votes`}
              />
            </Card>
          );
        })}
      </div>
    );
  }
}

export default Posts;
