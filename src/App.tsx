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
import { useEffect } from "react";

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
  const { userId, setUserId, clearUserId } = useUserIdParams();
  const { data: user } = useFetchUsers(userId);
  const { data: postListOnMount } = useFetchPosts(user?.list?.postIds, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  const { data: postListByMutation, trigger } = useFetchPostsByMutation();

  const postIds = user?.list?.postIds ?? [];

  return (
    <Wrapper
      userId={userId}
      setUserId={setUserId}
      clearUserId={clearUserId}
      trigger={trigger}
      postIds={postIds}
      postList={postListByMutation || postListOnMount}
    />
  );
};

const ByUseEffectWithMutation = () => {
  const { userId, setUserId, clearUserId } = useUserIdParams();
  const { data: user } = useFetchUsers(userId);
  const { data: postList, trigger } = useFetchPostsByMutation();
  const postIds = user?.list?.postIds ?? [];

  useEffect(() => {
    trigger({ postIds });
  }, []);

  return (
    <Wrapper
      userId={userId}
      setUserId={setUserId}
      clearUserId={clearUserId}
      trigger={trigger}
      postIds={postIds}
      postList={postList}
    />
  );
};

const Wrapper = ({
  userId,
  setUserId,
  trigger,
  clearUserId,
  postIds,
  postList,
}: {
  userId: number;
  setUserId: (userId: number) => void;
  trigger: (arg: { postIds: number[] }) => void;
  clearUserId: () => void;
  postIds: number[];
  postList: { id: number; body: string }[] | undefined;
}) => {
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
      <div>
        <input
          type="number"
          value={userId}
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
