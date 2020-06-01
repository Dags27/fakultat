import React from 'react';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import PostList from './posts/posts';
function App() {
  return (
    <div>
      <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">About</Link></li>
        </ul>
      </nav>
          <Switch>

            <Route path="/post" component={PostList}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}


export default App;