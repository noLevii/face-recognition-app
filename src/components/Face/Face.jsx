import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Switch from "../Switch/Switch";
import defaultVideoImage from "./video.png";
import defaultPhotoImage from "./image.jpeg";
import "./Face.css";

const Home = () => {
  const [isToggled, setIsToggled] = useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [outputText, setOutputText] = useState("Sin verificar");

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 225, height: 225 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stopVideo = () => {
    let video = videoRef.current;
    let stream = video.srcObject;

    if (stream) {
      let tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      video.srcObject = null;
    }
  };

  const takePhoto = () => {
    const width = 225;
    const height = 225;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);

    predictFace();
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
    setOutputText("Sin verificar");
  };

  const predictFace = async () => {
    const input = photoRef.current;
    const imageProc = tf.browser
      .fromPixels(input)
      .resizeNearestNeighbor([224, 224])
      .expandDims(0)
      .div(255.0);
    console.log("Finalización del preprocesamiento de la imagen");

    const model = await tf.loadLayersModel("./tensorflowjs-model/model.json");
    const pred = model.predict(imageProc);
    pred.print();
    console.log("Finalización de predicción");

    const faces = ["Gustavo", "Jair", "Karime", "Luis", "Martín", "Sebastián"];

    pred.data().then((data) => {
      console.log(data);
      let maxVal = -1;
      let maxValIndex = -1;
      for (let i = 0; i < data.length; i++) {
        if (data[i] > maxVal) {
          maxVal = data[i];
          maxValIndex = i;
        }
      }
      const faceDetected = faces[maxValIndex];
      setOutputText(
        `${faceDetected} (${(maxVal * 100).toFixed(2)}% probabilidad)`
      );
    });
  };

  useEffect(() => {
    isToggled ? getVideo() : stopVideo();
  }, [videoRef, isToggled]);

  return (
    <div className="home">
      <div className="set-camera">
        <Switch
          rounded={true}
          isToggled={isToggled}
          onToggle={() => setIsToggled(!isToggled)}
        />{" "}
        Prender / Apagar camara
      </div>

      <div className="camera">
        <video
          ref={videoRef}
          poster={defaultVideoImage}
          style={{ objectFit: "cover" }}
        ></video>
      </div>

      <div className="button-container">
        <button onClick={takePhoto}>Verificar</button>
      </div>

      <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
        <canvas
          ref={photoRef}
          style={{
            backgroundImage: `url(${defaultPhotoImage})`,
          }}
        ></canvas>
      </div>

      <div id="output_text">{outputText}</div>

      <div className="button-container">
        <button onClick={closePhoto}>Cerrar</button>
      </div>
    </div>
  );
};

export default Home;
