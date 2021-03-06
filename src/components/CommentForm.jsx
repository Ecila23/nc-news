import React, { Component } from 'react';
import api from '../utils/api.utils';

class CommentForm extends Component {
  state = {
    username: 'jessjelly',
    body: '',
    commentAdded: false
  };

  render() {
    return (
      <form className='comment-form' onSubmit={this.handleSubmit}>
        {/* input for custom username */}
        {/* <div>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' onChange={this.handleChange} />
        </div> */}
        <p>
          You are currrently logged in as <i>{this.state.username}</i>
        </p>
        {this.state.commentAdded ? <p>Comment Added!</p> : null}
        <div>
          <label htmlFor='body'>New comment:</label>
          <br />
          <textarea
            type='text'
            rows='6'
            cols='35'
            id='body'
            value={this.state.body}
            onChange={this.handleChange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, body } = this.state;
    const article_id = this.props.article_id;
    api.postComment({ username, body }, article_id);
    this.setState({
      // username: '',
      body: '',
      commentAdded: true
    });
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value
    });
  };
}

export default CommentForm;
