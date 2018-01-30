import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentZoom: this.props.zoom,
      currentLocation: this.props.start
    };
  }

  componentDidMount() {
    this.loadMap();

    // if (navigator && navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((pos) => {
    //     console.log(pos.coords);
    //     this.setState({
    //       currentLocation: {
    //         lng: pos.coords.longitude,
    //         lat: pos.coords.latitude
    //       }
    //     });
    //     this.updateMap();
    //   });
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState !== this.state) {
      this.updateMap();
      localStorage.setItem('map.state', JSON.stringify(this.state));
    }
  }


  loadMap() {
    if (!this.props.google) { return; }

    const maps = this.props.google.maps;
    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);

    let {lat, lng} = this.state.currentLocation;
    const coords = new maps.LatLng(lat, lng);
    const mapConfig = Object.assign({}, {
      center: coords,
      zoom: this.state.currentZoom
    });
    this.map = new maps.Map(node, mapConfig);

    let pauseTimeout = null;
    this.map.addListener('dragend', (e) => {
      if (pauseTimeout) {
        clearTimeout(pauseTimeout);
        pauseTimeout = null;
      }
      pauseTimeout = setTimeout(() => {
        this.setState({
          currentLocation: {
            lng: this.map.center.lng(),
            lat: this.map.center.lat()
          }
        });
        console.log(this.map.center);
      }, 500);
    });
  }

  updateMap() {
    this.map.panTo(this.state.currentLocation);
    this.map.setZoom(this.state.currentZoom);
  }

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    };

    return (
        <div ref="map" style={style}>
        Loading Map...
        </div>
    )
  }
}

if (localStorage && localStorage.getItem('map.state')) {
  let conf = JSON.parse(localStorage.getItem('map.state'));
  Map.defaultProps = {
    zoom: conf.currentZoom,
    start: conf.currentLocation
  }
} else {
  Map.defaultProps = {
    zoom: 15,
    // Detroit
    start: {
      lat: 42.347471,
      lng: -83.057962
    }
  }
}

export default Map;
