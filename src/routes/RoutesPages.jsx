import React from "react";
import { Routes, Route } from "react-router-dom";
import CarList from "pages/carList";
import RootPage from "pages/root";
import Layout from "components/layout";

const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route element={<Layout />}>
        <Route path="/list" element={<CarList />} />
      </Route>
    </Routes>
  );
};

export default RoutesPage;
