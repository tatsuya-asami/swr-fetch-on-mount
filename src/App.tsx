import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import "./App.css";
import { useFetchPosts, useFetchPostsByMutation, useFetchUsers } from "./swr";
import { ReactNode, useEffect } from "react";

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
  const { data } = useFetchUsers();
  const { data: post } = useFetchPosts(data, undefined);
  console.log(data, post);

  return <Wrapper>ByUseFetchSWR</Wrapper>;
};

const ByUseEffectWithMutation = () => {
  const { userId, setUserId, clearUserId } = useUserIdParams();
  const { data: user } = useFetchUsers(userId);
  const { data: postList, trigger } = useFetchPostsByMutation();

  const postIds = user?.postIds ?? [];

  useEffect(() => {
    trigger({ postIds: postIds });
  }, []);

  return (
    <Wrapper>
      <div>
        <input
          type="number"
          onChange={(event) => setUserId(parseInt(event.target.value))}
        />
        <button onClick={() => trigger({ postIds })}>search</button>
        <button onClick={() => clearUserId()}>clear</button>
      </div>
      <div>
        {postList?.length
          ? postList.map((post) => (
              <ul key={post.id}>
                <li>{post.id}</li>
                <li>{post.body}</li>
              </ul>
            ))
          : "no data"}
      </div>
    </Wrapper>
  );
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div>
      <h1>{location.pathname}</h1>
      <ul>
        <li>
          <Link to="/">fetch</Link>
        </li>
        <li>
          <Link to="/mutation">ByUseFetchSWR</Link>
        </li>
      </ul>
      {children}
    </div>
  );
};

const useUserIdParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = parseInt(searchParams.get("userId") || "0");
  const setUserId = (userId: number) => {
    setSearchParams({ userId: userId.toString() });
  };
  const clearUserId = () => {
    setSearchParams();
  };
  return { userId, setUserId, clearUserId };
};

export default App;
