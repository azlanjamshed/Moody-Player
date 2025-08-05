import { useState } from "react";

import "./App.css";
import FaceExpressionDetector from "./components/FaceExpressionDetector";
import MoodSong from "./components/MoodSong";

function App() {
  const [songs, setSongs] = useState([
  
  ]);
  return (
    <>
      <FaceExpressionDetector setSongs={setSongs} />
      <MoodSong songs={songs} />
    </>
  );
}

export default App;
