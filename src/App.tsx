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
  const { data } = useFetchUsers();
  const { data: post } = useFetchPosts(data, undefined);
  console.log(data, post);

  return <Wrapper>ByUseFetchSWR</Wrapper>;
};

const ByUseEffectWithMutation = () => {
  const { userId, setUserId } = useUserIdParams();
  const { data: userList } = useFetchUsers();
  const { data: postList, trigger } = useFetchPostsByMutation();
  console.log(userList, postList);
  return (
    <Wrapper>
      <div>
        <input
          type="number"
          onChange={(event) => setUserId(parseInt(event.target.value))}
        />
        <button onClick={() => trigger({ userId })}>search</button>
      </div>
      <div>
        {postList?.map((post) => (
          <ul key={post.id}>
            <li>{post.id}</li>
            <li>
              {userList?.find((user) => user.id === post.userId)?.firstName ??
                "不明なユーザー"}
            </li>
            <li>{post.body}</li>
          </ul>
        )) ?? "no data"}
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
  return { userId, setUserId };
};

export default App;
