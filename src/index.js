import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
const API_KEY = "AIzaSyAg9oT9ZnHUbVHJjYBjJN5Ikuy5nKdWS_Y";

// componenet should produce html

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch("Surfboards");
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      // console.log(data);
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }
  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 500);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// insert to DOM
// take this component generarted HTML and put it on the page (DOM)
ReactDOM.render(<App />, document.querySelector(".container"));
