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
  cosnt [placeAddress, setPlaceAddress] = useState('');
  const navigate = useNavigate();
  const MAX_RESQUESTS_FOR_SPEEDS_TEST = 5;
  const SPEED_TEST_PING_INTERVAL = 1000;

  useEffect(() => {

    if (latestDownloadSpeed) {
      const newDownloadSpeeds = [...downloadSpeeds, latestDownloadSpeed]
      console.log('before: ${downloadSpeeds}, after: ${newDownloadSpeeds}');
      setDownloadSpeeds(newDownloadSpeeds);
      const sufficientDataPoints = newDownloadSpeeds.length >= MAX_RESQUESTS_FOR_SPEEDS_TEST;
      if (sufficientDataPoints) {
        const apiEndpoint = `/api/internet_speeds`;
        const data = {
          "download_units": "mbps",
          "download_speed": (newDownloadSpeeds.reduce((a, b) => a + b, 0) / newDownloadSpeeds.length).toFixed(2),
          "place_name": placeName,
          "place_city": placeCity,
          "place_address": placeAddress
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
            navigate('/');          
          } else {
            location.reload();
          }
          setTestInProgress(false);
          setDownloadSpeeds([]);
        })
        .catch((error) => {
          console.error('Network Error: ', error);
          location.reload();
        });
      }
    }
  }, [latestDownloadSpeed])

  const placeFieldsMissing = placeName.length == 0 || placeCity.length == 0 || placeAddress.length == 0;
  }
  
  return (
    <div className="container">
      <div>
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
            onChange={(e) => setPlaceName(e.target.value)} />
        </div>
        <div className="md:ml-2 mt-2 w-96">
          <label className='block mb-2 text-sm font-bold text-gray-700'>
            Address
          </label>
          <input
            className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            id='address'
            type='text'
            placeholder='Address'
            onChange={(e) => setPlaceAddress(e.target.value)} />
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
            onChange={(e) => setPlaceCity(e.target.value)} />
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
              pingInterval={SPEED_TEST_PING_INTERVAL}
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
            disabled={placeFieldsMissing}
            className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
            type='button'
            onClick={() => setTestInProgress(true)}
          >
            Start Speed Test
          </button>
        )}
      </div>
    </div>
  );
}
