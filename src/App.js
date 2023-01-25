import './App.css';
import Header from "./components/header/header";
import {useEffect} from "react";
import StartMenu from "./components/start_menu/start_menu";
import {create_new_map, xml_to_map} from "./model/map";
import Editor from "./components/editor/editor";
import { useSelector, useDispatch } from 'react-redux';
import { setMap } from "./store/mapSlice";
import load_images from "./model/images";
import {setImages} from "./store/imageSlice";

function App() {
    const map = useSelector((state) => state.map.present.value);
    const images = useSelector((state) => state.images.value);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!images) {
            load_images().then(images => {
                dispatch(setImages(images));
            })
        }
    }, [images, dispatch])

    const create_new_map_cb = () => {
        dispatch(setMap(create_new_map()));
    }

    const open_map_cb = (xml_string) => {
        dispatch(setMap(xml_to_map(xml_string)));
    }

    return (
            <div className="App">
                <Header></Header>
                {
                    map === undefined || images === undefined ?
                    <StartMenu create_new_map_cb={create_new_map_cb} open_map_cb={open_map_cb}/> :
                    <Editor></Editor>
        }
    </div>
    );
}

export default App;
