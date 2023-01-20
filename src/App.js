import './App.css';
import Header from "./components/header/header";
import {useState} from "react";
import StartMenu from "./components/start_menu/start_menu";
import {create_new_map} from "./model/map";
import Editor from "./components/editor/editor";


function App() {

    const [map, setMap] = useState(undefined);

    const create_new_map_cb = () => {
        setMap(create_new_map());
    }

    const changeTileRequest = (tilePosition, tile) => {
        console.log(map, tilePosition, tile);
        console.log(map[tilePosition.x])
        map.tiles[tilePosition.x][tilePosition.y] = tile;
        setMap({...map});
    }

    return (
    <div className="App">
        <Header></Header>
        {
            map === undefined ?
                    <StartMenu create_new_cb={create_new_map_cb}/> :
                    <Editor map={map} changeTileRequest={changeTileRequest}></Editor>
        }
    </div>
    );
}

export default App;
