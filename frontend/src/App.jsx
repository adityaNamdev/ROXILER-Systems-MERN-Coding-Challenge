import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Transcations from "./pages/Transcations";
import Statistics from "./pages/Statistics";
import Barchart from "./pages/Barchart";
import Piechart from "./pages/Piechart";

const App = () => {
  const [month, setMonth] = useState(3);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainLayout month={month} setMonth={setMonth} />}
          >
            <Route index element={<Transcations month={month} />} />
            <Route path="statistics" element={<Statistics month={month} />} />
            <Route path="bar-chart" element={<Barchart month={month} />} />
            <Route path="pie-chart" element={<Piechart month={month} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
