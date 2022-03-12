import { Heartbeat } from './heartbeat.js'

const OPENCV_URI = 'https://docs.opencv.org/master/opencv.js'
const HAARCASCADE_URI = 'haarcascade_frontalface_alt.xml'

const emptyDiv = document.getElementById('empty-content')
const heartDiv = document.getElementById('heart-content')
const handDiv = document.getElementById('hand-content')

let displayedDiv = emptyDiv

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

const demo = new Heartbeat('webcam', 'canvas', HAARCASCADE_URI, 30, 6, 250)
const ready = loadOpenCv(OPENCV_URI)
ready.then(function () {
  demo.init()
})

document.getElementById('heartbeat-link').addEventListener('click', function () {
  displayedDiv.classList.add('invisible')
  heartDiv.classList.remove('visible')
  displayedDiv = heartDiv
})

document.getElementById('hand-link').addEventListener('click', function () {
  displayedDiv.classList.add('invisible')
  handDiv.classList.remove('visible')
  displayedDiv = handDiv
})
