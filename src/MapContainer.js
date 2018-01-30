import React, { Component } from 'react';
import Map from './Map';
import cache from './vendor/ScriptCache';
import googleUrl from './vendor/GoogleApi';

class MapContainer extends Component {
  componentWillMount() {
    this.setState({});
    this.scriptCache = cache({
      google: googleUrl({
        apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
        libraries: ["places"]
      })
    });
  }

  componentDidMount() {
    this.scriptCache.google.onLoad((err, tag) => {
      this.setState({
        loaded: true,
        google: window.google
      });
    });
  }

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    };

    if (!this.state.loaded) {
      return <div>Loading Google Libraries...</div>
    }

    return (
        <div style={style}>
        <Map google={this.state.google} />
        </div>
    )
  }

}

export default MapContainer
