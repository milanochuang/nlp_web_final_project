import React from "react";
import { Route, Routes } from "react-router-dom";
import PageHeader from "./containers/PageHeader"
import Documentation from "./components/Documentation";
import Latest from "./components/Latest"
import Materials from "./components/Materials"
import Contact from "./components/Contact";

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<PageHeader />}>
        <Route path="Documentation" element={<Documentation />} />
        <Route path="Latest" element={<Latest />} />
        <Route path="Materials" element={<Materials />} />
        <Route path="Contact" element={<Contact />} />
        </Route>
    </Routes>
);
}
