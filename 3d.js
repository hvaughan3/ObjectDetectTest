const videoElement = document.getElementsByClassName('input_video')[0]
const canvasElement = document.getElementsByClassName('output_canvas')[0]
const canvasCtx = canvasElement.getContext('2d')

function onResults (results) {
  canvasCtx.save()
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height)

  if (!!results.objectDetections) {
    for (const detectedObject of results.objectDetections) {
      // Reformat keypoint information as landmarks, for easy drawing.
      // const landmarks: mpObjectron.Point2D[] = detectedObject.keypoints.map(x => x.point2d)
      const landmarks = detectedObject.keypoints.map(x => x.point2d)
      // Draw bounding box.
      window.drawConnectors(canvasCtx, landmarks, window.BOX_CONNECTIONS, { color: '#FF0000' })
      // Draw centroid.
      window.drawLandmarks(canvasCtx, [landmarks[0]], { color: '#FFFFFF' })
    }
  }
  canvasCtx.restore()
}

const objectron = new Objectron({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/objectron/${file}`
  }
})

objectron.setOptions({
  modelName: 'Cup',
  maxNumObjects: 3,
})

objectron.onResults(onResults)

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await objectron.send({ image: videoElement })
  },
  width: 640,
  height: 480
})
camera.start()