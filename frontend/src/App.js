import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {

  const makeApiRequest = ()=>{
    axios("/api/testwithcurrentuser").then(response =>{
      console.log("response", response);
    })
  }
  return (
    <div className="App">
      <button onClick={makeApiRequest}>Make api request</button>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Edit <code>src/App.js</code> and save to reload. 
        we are in dev! AAA
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
