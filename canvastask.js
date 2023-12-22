document.addEventListener("DOMContentLoaded", () => {
  let selectedItems = 0;
  const videoPlayer1 = document.getElementById("videoPlayer1");
  const videoPlayer2 = document.getElementById("videoPlayer2");
  const videoPlayer3 = document.getElementById("videoPlayer3");
  const webcamVideo = document.getElementById("webcamVideo");
  const newCanvas = document.getElementById("newCanvas");
  const newCtx = newCanvas.getContext("2d");
  let continueDrawing = true;
  let attachVideo1 = true;
  let attachVideo2 = true;
  let attachVideo3 = true;
  let attachWebcam = true;

  // Play the video
  videoPlayer1.play();
  videoPlayer2.play();
  videoPlayer3.play();

  // Access the webcam stream
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      webcamVideo.srcObject = stream;

      // Draw frames on the canvas
      function draw() {
        newCtx.clearRect(0, 0, newCanvas.width, newCanvas.height);

        if (attachVideo1) {
          newCtx.drawImage(
            videoPlayer1,
            0,
            0,
            newCanvas.width / 4,
            newCanvas.height
          );
        }

        if (attachVideo2) {
          newCtx.drawImage(
            videoPlayer2,
            newCanvas.width / 4,
            0,
            newCanvas.width / 4,
            newCanvas.height
          );
        }

        if (attachVideo3) {
          newCtx.drawImage(
            videoPlayer3,
            (newCanvas.width / 4) * 2,
            0,
            newCanvas.width / 4,
            newCanvas.height
          );
        }

        if (attachWebcam) {
          newCtx.drawImage(
            webcamVideo,
            (newCanvas.width / 4) * 3,
            0,
            newCanvas.width / 4,
            newCanvas.height
          );
        }

        // Repeat the draw function if continueDrawing is true
        if (continueDrawing) {
          requestAnimationFrame(draw);
        }
      }

      // Start drawing frames
      draw();

      // Clear canvas and stop drawing on button click
      const clearCanvasButton = document.getElementById("clearCanvasButton");
      clearCanvasButton.addEventListener("click", () => {
        newCtx.clearRect(0, 0, newCanvas.width, newCanvas.height);
        continueDrawing = false; // Stop the drawing
        attachVideo2 = attachVideo1 = attachVideo3 = attachWebcam = false;
      });

      // Redraw canvas on button click
      const redrawCanvasButton = document.getElementById("redrawCanvasButton");
      redrawCanvasButton.addEventListener("click", () => {
        continueDrawing = true; // Resume drawing
        attachVideo2 = attachVideo1 = attachVideo3 = attachWebcam = true;

        draw();
      });

      // Attach/detach video on button click
      const attachVideoButton1 = document.getElementById("attachVideoButton1");
      const detachVideoButton1 = document.getElementById("detachVideoButton1");
      attachVideoButton1.addEventListener("click", () => {
        attachVideo1 = true;
        draw();
      });
      detachVideoButton1.addEventListener("click", () => {
        attachVideo1 = false;
        draw();
      });

      const attachVideoButton2 = document.getElementById("attachVideoButton2");
      const detachVideoButton2 = document.getElementById("detachVideoButton2");
      attachVideoButton2.addEventListener("click", () => {
        attachVideo2 = true;
        draw();
      });
      detachVideoButton2.addEventListener("click", () => {
        attachVideo2 = false;
        draw();
      });

      const attachVideoButton3 = document.getElementById("attachVideoButton3");
      const detachVideoButton3 = document.getElementById("detachVideoButton3");
      attachVideoButton3.addEventListener("click", () => {
        attachVideo3 = true;
        draw();
      });
      detachVideoButton3.addEventListener("click", () => {
        attachVideo3 = false;
        draw();
      });

      const attachWebcamButton = document.getElementById("attachWebcamButton");
      const detachWebcamButton = document.getElementById("detachWebcamButton");
      attachWebcamButton.addEventListener("click", () => {
        attachWebcam = true;
        draw();
      });
      detachWebcamButton.addEventListener("click", () => {
        attachWebcam = false;
        draw();
      });
    })
    .catch((error) => {
      console.error("Error accessing webcam:", error);
    });
});
