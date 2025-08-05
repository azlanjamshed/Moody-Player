// import React, { useState } from "react";
// import { FaPlayCircle } from "react-icons/fa";
// import { FaCirclePause } from "react-icons/fa6";
// const MoodSong = ({ songs }) => {
//   const [isPlaying, setIsPlaying] = useState(null);
//   const handlePlayPause = (index) => {
//     if (isPlaying == index) {
//       setIsPlaying(null);
//     } else {
//       setIsPlaying(index);
//     }
//   };
//   return (
//     <div className="flex justify-center mt-5">
//       <div className="bg-red-400 w-[50%] items-center p-5">
//         <h1 className="text-2xl mb-3">Recommended Songs</h1>
//         {songs.map((song, index) => {
//           return (
//             <div key={index} className="flex  justify-between py-1">
//               <div>
//                 <h3 className="font-black">{song.title}</h3>
//                 <p>{song.artist}</p>
//               </div>
//               <div className="flex ">
//                 <audio src={song.audio} controls></audio>
//                 <button onClick={() => handlePlayPause(index)}>
//                   {isPlaying === index ? <FaPlayCircle /> : <FaCirclePause />}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default MoodSong;

// import React, { useState, useEffect, useRef } from "react";
// import { FaPlayCircle } from "react-icons/fa";
// import { FaCirclePause } from "react-icons/fa6";

// const MoodSong = ({ songs }) => {
//   const [isPlaying, setIsPlaying] = useState(null);
//   const handlePlayPause = (index) => {
//     if (isPlaying == index) {
//       setIsPlaying(null);
//     } else {
//       setIsPlaying(index);
//     }
//   };

//   return (
//     <div className="flex justify-center mt-8 px-4">
//       <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
//         <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
//           🎶 Recommended Songs
//         </h2>
//         {songs.length === 0 ? (
//           <p className="text-center text-gray-500">No songs to display.</p>
//         ) : (
//           songs.map((song, index) => (
//             <div
//               key={index}
//               className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 py-4 gap-4"
//             >
//               <div className="text-center md:text-left">
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {song.title}
//                 </h3>
//                 <p className="text-sm text-gray-500">{song.artist}</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 {isPlaying === index && (
//                   <audio
//                     src={song.audio}
//                     className="hidden"
//                     autoPlay={isPlaying === index}
//                   />
//                 )}

//                 <button
//                   onClick={() => handlePlayPause(index)}
//                   className="text-3xl text-blue-600 hover:text-blue-800 transition duration-200"
//                 >
//                   {isPlaying === index ? <FaCirclePause /> : <FaPlayCircle />}
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default MoodSong;

import React, { useState, useEffect, useRef } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";

const MoodSong = ({ songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const [showPauseDefault, setShowPauseDefault] = useState(false);
  const audioRefs = useRef([]);

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      audioRefs.current[index]?.pause();
      setIsPlaying(null);
    } else {
      audioRefs.current.forEach((audio, i) => {
        if (audio && i !== index) audio.pause();
      });
      audioRefs.current[index]?.play();
      setIsPlaying(index);
    }
    setShowPauseDefault(false);
  };

  // Auto pause audio on re-detection (custom event trigger)
  useEffect(() => {
    const handleReset = () => {
      setIsPlaying(null);
      setShowPauseDefault(true);
      audioRefs.current.forEach((audio) => audio?.pause());
    };
    window.addEventListener("resetAudioPlay", handleReset);
    return () => window.removeEventListener("resetAudioPlay", handleReset);
  }, []);

  return (
    <div className="flex justify-center mt-8 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
          🎶 Recommended Songs
        </h2>
        {songs.length === 0 ? (
          <p className="text-center text-gray-500">No songs to display.</p>
        ) : (
          songs.map((song, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 py-4 gap-4"
            >
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  {song.title}
                </h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
              <div className="flex items-center gap-3">
                <audio
                  ref={(el) => (audioRefs.current[index] = el)}
                  src={song.audio}
                />
                <button
                  onClick={() => handlePlayPause(index)}
                  className="text-3xl text-blue-600 hover:text-blue-800 transition duration-200"
                >
                  {isPlaying === index ? (
                    <FaCirclePause />
                  ) : showPauseDefault ? (
                    <FaCirclePause />
                  ) : (
                    <FaPlayCircle />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MoodSong;
