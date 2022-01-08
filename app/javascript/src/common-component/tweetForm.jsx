import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, safeCredentialsForm, handleErrors } from '@utils/fetchHelper';

import './tweetForm.scss';

class TweetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: '',
      error: '',
      tweetButton: true,
    }
    this.uploadedFile = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.charCount = this.charCount.bind(this);
    this.post = this.post.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  charCount() {
    if (this.state.tweet.length > 0 && this.state.tweet.length <= 140) {
      this.setState({tweet: this.state.tweet})
      this.setState({tweetButton: false});
    } else {
      this.setState({tweetButton: true});
    }
  }

  post(e) {
   if (e) { e.preventDefault(); }
   this.setState({
     error: '',
   });

   let formData = new FormData();
   if (this.uploadedFile.current.files[0] == null) {
     formData.set('tweet[message]', this.state.tweet);
   } else {
     formData.set('tweet[image]', this.uploadedFile.current.files[0]);
     formData.set('tweet[message]', this.state.tweet);
   }

   fetch('/api/tweets', safeCredentialsForm({
         method: 'POST',
         body: formData,
         contentType: false,
         processData: false,
       }))
         .then(handleErrors)
         .then(data => {
           this.props.getTweets();
         })
         .catch(error => {
           this.setState({
             error: 'Could not post tweet',
           })
         })
      this.setState({ tweet: '' });
      document.getElementById("image-select").value = null;

  }

  render () {
    const { tweet, error, tweetButton } = this.state;

    return (
      <div className="col-xs-12 post-tweet-box">
        <form className="form-inline my-4" onSubmit={this.post}>
          <input type="text" className="form-control" placeholder="What's happening?" name="tweet" value={tweet} onChange={this.handleChange} onKeyUp={this.charCount} required/><br/>
          <div className="pull-right">
            <label id="upload-image-btn" htmlFor="image-select">Upload image</label>
            <input type="file" id="image-select" name="image" accept="image/*" ref={this.uploadedFile}/>
            <button className="btn btn-primary" id="post-tweet-btn" disabled={tweetButton} >Tweet</button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default TweetForm;
