import React, { useState, useEffect } from 'react';
import { ReactInternetSpeedMeter } from 'react-internet-meter';

export default function NewInternetSpeed() {
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
        <label className='block mb-2 text-sm font-bold text-gray-700' for='placeName'>
          Place Name
        </label>
        <input
          className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          id='placeName'
          type='text'
          placeholder='placeName' />
      </div>
      <div className="md:ml-2 mt-2 w-96">
        <label className='block mb-2 text-sm font-bold text-gray-700' for='city'>
          City
        </label>
        <input
          className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          id='city'
          type='text'
          placeholder='City' />
      </div>
    </div>
    <div className='md:ml-2 mt-4 w96 text-center'>
      <button
        className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
        type='button'
      >Start Speed Test
      </button>
    </div>
    <ReactInternetSpeedMeter
      txtSubHeading="Internet is too slow"
      outputType="alert"
      customClassName={null}
      txtMainHeading="Oops!"
      pingInterval={4000}
      thresholdUnit="megabyte"
      threshold={100}
    imageUrls="https://res.cloudinary.com/dx9dnqzaj/image/upload/v1598450773/undraw_speed_test_wxl0.png"
      downloadSize="178128"
      callbacksFunctionOnNetworkDown={(speed) => console.log(`Internet speed is down ${speed}`)}
      callbacksFunctionOnNetworkTest={(speed) => setwifiSpeed(speed)}
    />
    </>
  );
}
