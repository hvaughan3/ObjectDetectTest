import { Heartbeat } from './heartbeat.js'

const OPENCV_URI = 'https://docs.opencv.org/master/opencv.js'
const HAARCASCADE_URI = 'haarcascade_frontalface_alt.xml'

// Load opencv when needed
async function loadOpenCv(uri) {
  return new Promise(function(resolve, reject) {
    console.log('starting to load opencv')
    const tag = document.createElement('script')
    tag.src = uri
    tag.async = true
    tag.type = 'text/javascript'
    tag.onload = () => {
      cv['onRuntimeInitialized'] = () => {
        console.log('opencv ready')
        resolve()
      }
    }
    tag.onerror = () => {
      throw new URIError('opencv didn\'t load correctly.')
    }
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  })
}

const demo = new Heartbeat('heart-webcam', 'heart-canvas', HAARCASCADE_URI, 30, 6, 250)
const ready = loadOpenCv(OPENCV_URI)
ready.then(function () {
  demo.init()
})
