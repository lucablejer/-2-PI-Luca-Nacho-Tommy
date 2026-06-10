import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import Profile from "./Screens/Profile/Profile";
import CreatePost from "./Screens/CreatePost/CreatePost";
import CommentPost from "./Screens/CommentPost/CommentPost"

function App() {
  return (
    <React.Fragment>
      <Login/>
      <Register/>
    </React.Fragment>
  );
}

export default App;
