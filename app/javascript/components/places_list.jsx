import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom/client';

function renderPlacesPage(body) {
  return (
    <div className="flex flex-wrap">
      <div className="w-full mb-12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-pink-800">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-lg text-white">New Log</h3>
              </div>
            </div>
          </div>
          {body}
        </div>
      </div>
    </div>
  )
}

function PlacesList() {
  const [loading, setLoading] = useState(true);
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    const apiEndpoint = "/api/places"
    fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setLoadedPlaces(data["places"])
      setLoading(false)
    });
  }, [])

  const loadingSection = (<div>Loading...</div>);
  const tableHeaderClass = "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-800"
  const dataSection = (
    <div>
      <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
          <table className='min-w-full leading-normal'>
            <thead>
            <tr>
                <th className={tableHeaderClass}>Name</th>
                <th className={tableHeaderClass}>City</th>
                <th className={tableHeaderClass}>Recent Upload Speed</th>
                <th className={tableHeaderClass}>Recent Upload Speed Units</th>
                <th className={tableHeaderClass}>Amount of Measurements</th>
              </tr>
            </thead>
            <tbody>
              {loadedPlaces.map((place, index) => {
                return (
                  <tr key={index}>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <div className='flex items-center'>
                        <div className='ml-3'>
                          <p className='text-gray-900 whitespace-no-wrap'>
                            {place.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {place.city}
                      </p>
                    </td>                
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {place.most_recent_download_speed}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {place.most_recent_download_speed_unit}
                      </p>                   
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {place.amount_of_measurements}
                      </p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>  
  )

  if (loading) {
    return renderPage(loadingSection)
  } else {
    return renderPlacesPage(dataSection)
  }
}

const placesList = ReactDOM.createRoot(document.getElementById("page-places"));
placesList.render(<PlacesList />);
