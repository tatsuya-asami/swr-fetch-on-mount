import { ENDPOINTS } from "./api/handlers";
import "./App.css";
import { useFetchSWR, useFetchSWRMutation } from "./swr";

function App() {
  return (
    <div>
      <ByUseFetchSWR />
      <ByUseEffectWithMutation />
    </div>
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
