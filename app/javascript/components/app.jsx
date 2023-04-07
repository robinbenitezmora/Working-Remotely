import React from "react";
import ReactDOM from "react-dom";

import { 
  BrowserRouter,
  Routes,
  Route,
 } from "react-router-dom";

import PlacesList from "./places_list";
import NewInternetSpeed from "./internet_speeds_new";

 export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/new-internet-speed" element={<NewInternetSpeed />} />
          <Route path="*" element={<PlacesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
