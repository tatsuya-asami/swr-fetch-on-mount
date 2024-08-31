import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ENDPOINTS } from "./api/handlers";
import "./App.css";
import { useFetchSWR, useFetchSWRMutation } from "./swr";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ByUseFetchSWR />} />
        <Route path="/mutation" element={<ByUseEffectWithMutation />} />
      </Routes>
    </BrowserRouter>
  );
}

const ByUseFetchSWR = () => {
  const { data } = useFetchSWR(ENDPOINTS.USER);
  console.log(data);

  return <div>ByUseFetchSWR</div>;
};

const ByUseEffectWithMutation = () => {
  const { data } = useFetchSWRMutation(ENDPOINTS.USER);
  console.log(data);

  return <div>ByUseEffectWithMutation</div>;
};

export default App;
