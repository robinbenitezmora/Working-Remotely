import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom/client';

function PlacesList() {
  const [loading, setLoading] = useState(true);
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const loadingSection = (<div>Loading...</div>);
  const dataSection = loadedPlaces.map((place, index) => 
    <div key={index}>
      <table>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>Recent Upload Speed</th>
          <th>Recent Upload Speed Unist</th>
          <th>Amount of Measurements</th>
        </tr>
        <tr>
          <td>{place.name}</td>
          <td>{place.city}</td>
          <td>{place.most_recent_download_speed}</td>
          <td>{place.most_recent_download_units}</td>
          <td>{place.amount_of_measurements}</td>
        </tr>
      </table>
    </div>
  )

  if (loading) {
    return loadingSection
  } else {
    return dataSection
  }
}

const placesList = ReactDOM.createRoot(document.getElementById("places-list-container"));
placesList.render(<PlacesList />);
