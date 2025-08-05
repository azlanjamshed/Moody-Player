// import React, { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
// import axios from "axios";

// const FaceExpressionDetector = ({ setSongs }) => {
//   const videoRef = useRef(null);
//   const [expression, setExpression] = useState("");

//   const loadModels = async () => {
//     const MODEL_URL = "/models";
//     await Promise.all([
//       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//       faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//     ]);
//   };

//   const startVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//       })
//       .catch((err) => console.error("Camera Error:", err));
//   };

//   const detectEmotion = async () => {
//     if (videoRef.current) {
//       const results = await faceapi
//         .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//         .withFaceExpressions();

//       if (results.length > 0) {
//         results.forEach((result, index) => {
//           const expressions = result.expressions;
//           const maxValue = Math.max(...Object.values(expressions));
//           const detectedEmotion = Object.keys(expressions).find(
//             (key) => expressions[key] === maxValue
//           );
//           console.log(`Detected Emotion (Face ${index + 1}):`, detectedEmotion);
//           setExpression(detectedEmotion);
//         });
//       } else {
//         console.log("No face detected");
//       }
//     }
//     await axios
//       .get(`http://localhost:3000/songs?mood=${expression}`)
//       .then((response) => {
//         console.log(response.data);
//         setSongs(response.data.song);
//       });
//   };

//   useEffect(() => {
//     loadModels().then(() => startVideo());
//   }, []);

//   return (
//     <div className="flex justify-center mt-5 items-center gap-5">
//       <div className="flex flex-col items-center gap-5">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           // width="400"
//           // height="400"
//           // style={{ border: "2px solid black" }}
//           className="w-100 rounded-2xl"
//         />
//         <div className="flex  items-center gap-10 ">
//           <p className=" text-xl">Expression : {expression.toLowerCase()}</p>
//           <button
//             onClick={detectEmotion}
//             className="cursor-pointer bg-green-500 px-5 py-3 rounded-xl"
//           >
//             Detect
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FaceExpressionDetector;

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const FaceExpressionDetector = ({ setSongs }) => {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("");

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Camera Error:", err));
  };

  const detectEmotion = async () => {
    if (videoRef.current) {
      const results = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (results.length > 0) {
        const expressions = results[0].expressions;
        const maxValue = Math.max(...Object.values(expressions));
        const detectedEmotion = Object.keys(expressions).find(
          (key) => expressions[key] === maxValue
        );

        setExpression(detectedEmotion);

        try {
          const response = await axios.get(
            `http://localhost:3000/songs?mood=${detectedEmotion}`
          );
          setSongs(response.data.song);
        } catch (error) {
          console.error("API Error:", error);
        }
      } else {
        console.log("No face detected");
      }
    }
  };

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-5 px-4">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full max-w-md rounded-2xl border border-gray-300"
      />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 w-full max-w-md">
        <p className="text-lg font-medium text-green-600">
          Expression: <span className="capitalize">{expression}</span>
        </p>
        <button
          onClick={detectEmotion}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md"
        >
          Detect Emotion
        </button>
      </div>
    </div>
  );
};

export default FaceExpressionDetector;
