let btn = document.querySelector(".record-btn");

window.onload = () => {

  if (localStorage.getItem("theme") === 'light-theme') {
      themeToggle();
  }
}

btn.addEventListener("click", async function () {
  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  })

  //needed for better browser support
  const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") 
             ? "video/webm; codecs=vp9" 
             : "video/webm"
    let mediaRecorder = new MediaRecorder(stream, {
        mimeType: mime
    })

    let chunks = []
    mediaRecorder.addEventListener('dataavailable', function(e) {
        chunks.push(e.data)
    })

    mediaRecorder.addEventListener('stop', function(){
      let blob = new Blob(chunks, {
          type: chunks[0].type
      })
      let url = URL.createObjectURL(blob);

      console.log(url)

      let video = document.querySelector("video")
      video.classList.remove("hidden");
      video.src = url

      let a = document.createElement('a')
      a.href = url
      a.download = `screenwiz-recording-${Date.now()}.mp4`;
      a.click()
  })

    //we have to start the recorder manually
    mediaRecorder.start()
})

function themeToggle() {
  // Toggle the theme class on the root element
  const rootElement = document.body; // Get the root HTML element

  rootElement.classList.toggle("dark-theme");
  rootElement.classList.toggle("light-theme");

  localStorage.setItem("theme", rootElement.className);
}