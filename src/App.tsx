import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ENDPOINTS } from "./api/handlers";
import "./App.css";
import { useFetchSWR, useFetchSWRMutation } from "./swr";
import { ReactNode } from "react";

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

  return <Wrapper>ByUseFetchSWR</Wrapper>;
};

const ByUseEffectWithMutation = () => {
  const { data } = useFetchSWRMutation(ENDPOINTS.USER);
  console.log(data);

  return <Wrapper>ByUseEffectWithMutation</Wrapper>;
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div>
      <h1>{location.pathname}</h1>
      {children}
    </div>
  );
};

export default App;
