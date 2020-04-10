import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { getGithubUser, getGithubUserRepos } from "./utilities/data";

function App() {
  const [user, setUser] = React.useState({});
  const [repos, setRepos] = React.useState([]);

  const aa = async () => {
    const aaa = await getGithubUser("edwardpayton");
    // console.log("~/Sites/github95/src/App >>>", bb);
    return setUser(aaa);
  };

  const bb = React.useCallback(async () => {
    const bbb = await getGithubUserRepos(user["repos_url"]);
    setRepos(bbb);
  }, [user]);

  React.useEffect(() => {
    aa();
  }, []);

  React.useEffect(() => {
    if (user && user["name"] !== undefined) {
      console.log("~/Sites/github95/src/App >>>", user);
      bb();
    }
  }, [user, bb]);

  React.useEffect(() => {
    if (repos.length) console.log("~/Sites/github95/src/App >>>", repos);
  }, [repos]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
