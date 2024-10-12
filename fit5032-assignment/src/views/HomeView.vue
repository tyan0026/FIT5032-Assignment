<template>
  <div>
    <div class="search-container">
      <input
        v-model="searchQuery"
        placeholder="Search for a place"
        class="form-control"
        type="text"
        style="width: 60%"
      />
      <button @click="searchPlace" class="btn btn-primary">Search</button>
    </div>

    <div id="map" ref="mapContainer" class="map-container" style="margin-top: 10px"></div>
  </div>
</template>

<style scoped>
@import url('https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.css');

.map-container {
  width: 100%;
  height: 600px;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-container input {
  flex: 1;
  margin-right: 10px; /* Add some space between the input and the button */
}

.search-container button {
  white-space: nowrap; /* Ensure the button text doesn't wrap */
}
</style>

<script>
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

export default {
  data() {
    return {
      locations: [
        { lng: 145.128341, lat: -37.912685, info: 'Melbourne' },
        { lng: 151.126934, lat: -33.862631, info: 'Sydney' }
      ],
      searchQuery: ''
    }
  },
  methods: {
    searchPlace() {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.searchQuery)}.json?access_token=${mapboxgl.accessToken}`

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.features.length > 0) {
            const coords = data.features[0].geometry.coordinates
            this.map.flyTo({
              center: coords,
              zoom: 12
            })

            new mapboxgl.Marker().setLngLat(coords).addTo(this.map)
          }
        })
    }
  },
  mounted() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibWNkNDI5MC10aWFubmluZ3lhbmciLCJhIjoiY2tudHV4OTVkMDV0NTJ1cGp0eHFmYjdmZyJ9.eBWm2cEOiI-UOVxvIKOftA'

    //define map
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [145.128341, -37.912685], // starting position [lng, lat]
      zoom: 9 // starting zoom
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
      placeholder: 'Search for places'
    })

    // this.map.addControl(geocoder)

    geocoder.on('result', (e) => {
      const coords = e.result.geometry.coordinates
      this.map.flyTo({
        centre: coords,
        zoom: 12
      })
    })

    this.map.on('load', () => {
      //add markers and popus to the map
      this.locations.forEach((location) => {
        const marker = new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(this.map)
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(location.info).addTo(this.map)
        marker.setPopup(popup)
      })

      const start = [this.locations[0].lng, this.locations[0].lat]
      const end = [this.locations[1].lng, this.locations[1].lat]

      //add directions from Melbourne to Sydney
      // const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?geometries=gesjson&access_token=${mapboxgl.accessToken}}`
      // const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.locations[0].lng}%2C${this.locations[0].lat}%3B${this.locations[1].lng}%2C${ this.locations[1].lat}alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${mapboxgl.accessToken}`
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/145.128341%2C-37.912685%3B151.126934%2C-33.862631?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoibWNkNDI5MC10aWFubmluZ3lhbmciLCJhIjoiY2tudHV4OTVkMDV0NTJ1cGp0eHFmYjdmZyJ9.eBWm2cEOiI-UOVxvIKOftA`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const route = data.routes[0].geometry

          this.map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: route
              }
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5
            }
          })
        })
    })
  },

  beforeDestroy() {
    if (this.map) {
      this.map.remove()
    }
  }
}
</script>
