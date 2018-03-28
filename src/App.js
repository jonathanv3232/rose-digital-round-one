import React, { Component } from 'react';
import Search from './Search.component';
import Gallery from './Gallery.component';
import Results from './Results.component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
      albums: [],
      searchTerm: '',
      gallery: [],
    };
  }

  setsInputValue(e) {
    this.setState({ searchTerm: e.target.value });
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  addToGallery(id) {
    const album = this.state.albums.filter(album => album.key == id);
    const newGallery = this.state.gallery.slice();
    newGallery.push(album);
    this.setState({ gallery: newGallery });
  }

  searchAlbum() {
    //go fetch the albums
    let albums = [];
    fetch(
      `https://itunes.apple.com/search?media=music&entity=album&attribute=albumTerm&term=${encodeURIComponent(
        this.state.searchTerm
      )}`
    )
      .then(results => results.json())
      .then(data => {
        albums = data.results.map(album => ({
          collectionId: album.collectionId,
          artworkUrl100: album.artworkUrl100,
          collectionName: album.collectionName,
          artistName: album.artistName,
          releaseDate: album.releaseDate,
        }));
        const firstThreeAlbums = albums.slice(0, 3);
        this.setState({
          albums: firstThreeAlbums,
        });
      });
  }
  render() {
    return (
      <div>
        {/* <MuiThemeProvider>
          <RaisedButton onClick={this.toggleHidden.bind(this)} label="Search for an album" fullWidth={true} />
        </MuiThemeProvider> */}
        <button onClick={this.toggleHidden.bind(this)}>Toggle</button>
        {!this.state.isHidden && (
          <Search searchAlbum={this.searchAlbum.bind(this)} setsInputValue={this.setsInputValue.bind(this)} />
        )}
        {/* {!this.state.isHidden && <Results albums={this.state.albums} />} */}
        {/* {!this.state.isHidden && <SearchComponent />} */}
      </div>
    );
  }
}

export default App;
