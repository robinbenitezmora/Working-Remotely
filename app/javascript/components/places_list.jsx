import React from 'react';
import ReactDom from 'react-dom/client';

const PlacesList extends React.Component  {
  render() {
    return (
      <div>places_list</div>
    )
  }
}

const placesList = ReactDOM.createRoot(document.getElementById("places-list-container"));
placesList.render(<PlacesList />);

export default PlacesList