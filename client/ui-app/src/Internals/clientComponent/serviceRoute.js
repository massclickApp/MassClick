import React from "react";
import { Routes, Route } from "react-router-dom";

import RestaurantsPage from "./RestaurantsPage";
import HotelsPage from "./HotelsPage";
import BeautySpaPage from "./BeautySpaPage";
import HomeDecorPage from "./HomeDecorPage";

const ServiceRoutes = () => {
  return (
    <Routes>
      <Route path="/restaurants" element={<RestaurantsPage />} />
      <Route path="/hotels" element={<HotelsPage />} />
      <Route path="/beauty-spa" element={<BeautySpaPage />} />
      <Route path="/home-decor" element={<HomeDecorPage />} />
    </Routes>
  );
};

export default ServiceRoutes;
