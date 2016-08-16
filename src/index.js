import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/Search_bar';
import VideoList from './components/Video_list';
import VideoDetail from './components/Video_detail';

const YOUTUBE_API_KEY = 'AIzaSyBEZQgZzjT9ng2U_BLk57j95iq8L6xa2PA';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('surfboards');
  }
  videoSearch(term) {
    YTSearch({key: YOUTUBE_API_KEY, term: term}, videos => {
      this.setState({
        videos,
        selectedVideo: videos[0]
      });
    });
  }
  render() {
    // 검색 시 delay 시간을 줌.
    // 구글 검색 같은 경우 임
    // 컨택에 적용 하면 좋을 듯.
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos}
        />
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.querySelector('.container')
);
