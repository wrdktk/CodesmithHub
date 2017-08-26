import React, { Component } from 'react';
import FeedItem from './feedItem.jsx';

class NewsFeed extends Component {

  constructor() {
    super();
    this.state = {
      feedItems: [],
    };
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  render() {
    const feed = [];
    const imgURL = 'https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/438/codesmith_logo.png';

    for (let i = 0; i < this.state.feedItems.length; i += 1) {
      feed.push(
        <FeedItem
          username={this.state.feedItems[i].id} 
          message={this.state.feedItems[i].post}
          imgURL={imgURL}
          key={i}
        />);
    }

    return (
      <div className="directory">
        <h1>NEWS FEED</h1>
        <ul className="news-feed">
          {feed}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    this.fetchPosts();
  }

  /** Get the news feed from the database */
  fetchPosts() {
    console.log('Fetching posts...');
    axios.get('/user/allposts')
    .then((res) => {
      console.log(res.data);
      this.setState({ feedItems: res.data });
    })
    .catch((err) => {
      console.log(`ERROR: ${err}`);
    });
  }
}

export default NewsFeed;
