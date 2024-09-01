import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import "./App.css";
import { useFetchPost, useFetchPostByMutation, useFetchUsers } from "./swr";
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
  const {
    data: { user },
  } = useFetchUsers(userId);
  const { data: postOnMount } = useFetchPost(user?.postId, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  const { data: postByMutation, trigger } = useFetchPostByMutation();

  return (
    <Wrapper
      userId={userId}
      setUserId={setUserId}
      clearUserId={clearUserId}
      trigger={trigger}
      postId={user?.postId}
      post={postByMutation || postOnMount}
    />
  );
};

const ByUseEffectWithMutation = () => {
  const { userId, setUserId, clearUserId } = useUserIdParams();
  const {
    data: { user },
  } = useFetchUsers(userId);
  const { data: postList, trigger } = useFetchPostByMutation();

  useEffect(() => {
    trigger({ postId: user?.postId });
  }, []);

  return (
    <Wrapper
      userId={userId}
      setUserId={setUserId}
      clearUserId={clearUserId}
      trigger={trigger}
      postId={user?.postId}
      post={postList}
    />
  );
};

const Wrapper = ({
  userId,
  setUserId,
  trigger,
  clearUserId,
  postId,
  post,
}: {
  userId: number;
  setUserId: (userId: number) => void;
  trigger: (arg: { postId: number | undefined }) => void;
  clearUserId: () => void;
  postId: number | undefined;
  post: { id: number; body: string } | undefined;
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
        <button onClick={() => trigger({ postId })}>search</button>
        <button onClick={() => clearUserId()}>clear</button>
      </div>
      <div>
        {post ? (
          <ul key={post.id}>
            <li>{post.id}</li>
            <li>{post.body}</li>
          </ul>
        ) : null}
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
