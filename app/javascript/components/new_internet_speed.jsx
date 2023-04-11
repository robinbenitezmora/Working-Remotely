import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react';
import { ReactInternetSpeedMeter } from 'react-internet-meter';
import { useNavigate } from 'react-router-dom';

export default function NewInternetSpeed() {
  const [testInProgress, setTestInProgress] = useState(false);
  const [downloadSpeeds, setDownloadSpeeds] = useState([]);
  const [latestDownloadSpeed, setLatestDownloadSpeed] = useState(0);
  const [placeName, setPlaceName] = useState('');
  const [placeCity, setPlaceCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    if (latestDownloadSpeed) {
      const newDownloadSpeeds = [...downloadSpeeds, latestDownloadSpeed]
      console.log('before: ${downloadSpeeds}, after: ${newDownloadSpeeds}');
      setDownloadSpeeds(newDownloadSpeeds);
      const sufficientDataPoints = newDownloadSpeeds.length >= 5;
      if (sufficientDataPoints) {
        const apiEndpoint = `/api/internet_speeds`;
        const data = {
          "download_units": "mbps",
          "download_speed": (newDownloadSpeeds.reduce((a, b) => a + b, 0) / newDownloadSpeeds.length).toFixed(2),
          "place_name": placeName,
          "place_city": placeCity
        }

        fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then((response) => {
          if (response.ok) {
            navigate('/places');          
            console.log('Success:');
          } else {
            console.log('Server Error: ${response.status} ${response.statusText}');
          }
          setTestInProgress(false);
          setDownloadSpeeds([]);
          location.reload();
        })
        .catch((error) => {
          console.error('Network Error: ', error);
        });
      }
    }
  }, [latestDownloadSpeed])
  
  return (
    <><div>
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center justify-between pb-6">
          <div>
            <h2 className="text-4xl text-gray-600 font-semibold">Log Internet Speed</h2>
          </div>
        </div>
      </div>
      <div className="md:ml-2 mt-2 w-96">
        <label className='block mb-2 text-sm font-bold text-gray-700'>
          Place Name
        </label>
        <input
          className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          id='placeName'
          type='text'
          placeholder='placeName'
          onChange={(e) => setPlaceName(e.target.value)}
          />
      </div>
      <div className="md:ml-2 mt-2 w-96">
        <label className='block mb-2 text-sm font-bold text-gray-700'>
          City
        </label>
        <input
          className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          id='city'
          type='text'
          placeholder='City'
          onChange={(e) => setPlaceCity(e.target.value)}
          />
      </div>
    </div>
    <div className='md:ml-2 mt-4 w96 text-center'>
      {testInProgress && 
      <div>
        <div>Testing... </div>
        <ReactInternetSpeedMeter
        txtSubHeading="Internet is too slow"
        outputType="alert"
        customClassName={null}
        txtMainHeading="Oops!"
        pingInterval={1000}
        thresholdUnit="megabyte"
        threshold={0}
      imageUrls="https://cdn.speedcheck.org/images/reviews/google-speed-test-mobile.jpg"
        downloadSize="157000"
        callbacksFunctionOnNetworkTest={(speed) => setLatestDownloadSpeed(speed)}
      />
      </div>
      }

      {!testInProgress && downloadSpeeds.length == 0 && (
        <button
          className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
          type='button'
          onClick={() => setTestInProgress(true)}
        >
        Start Speed Test
        </button>
      )}

    </div>
    </>
  );
}
