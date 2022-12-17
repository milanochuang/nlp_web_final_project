import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./containers/Layout"
import Latest from "./components/Latest"
import Materials from "./components/Materials"

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="Latest" element={<Latest />} />
            <Route path="Materials" element={<Materials />} />
        </Route>
    </Routes>
);
}
