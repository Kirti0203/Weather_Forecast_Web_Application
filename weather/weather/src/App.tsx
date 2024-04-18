import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Weather from "./pages/Weather";
import { useEffect, useState } from "react";

const App = () => {


  const [tableData, setTableData] = useState<[]>([]);
  useEffect(() => {
    const getTableData = () => {
      fetch(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100`
      )
        .then((res) => res.json())
        .then((data) => setTableData(data.results));
    };

    getTableData();
  }, []);

  return (
    <>
    <Router>
        <Routes>
            <Route
                path="/"
                element={<Landing tableData={tableData} />}
            />
            <Route
                path="/weather"
                element={<Weather />}
            />
        </Routes>
    </Router>
</>
  )
}

export default App