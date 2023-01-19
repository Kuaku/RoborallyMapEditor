import './App.css';
import Header from "./components/header/header";
import {useState} from "react";
import StartMenu from "./components/start_menu/start_menu";


function App() {

    const [map, setMap] = useState(undefined);

  return (
    <div className="App">
        <Header></Header>
        {
            map == undefined ?
                    <StartMenu></StartMenu> :
                    undefined
        }
    </div>
  );
}

export default App;
