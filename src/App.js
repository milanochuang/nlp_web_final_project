import React from "react";
import { Route, Routes } from "react-router-dom";
import PageHeader from "./containers/PageHeader";
import Documentation from "./containers/Documentation";
import Latest from "./containers/Latest";
import Materials from "./containers/Materials";
import Contact from "./containers/Contact";

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
