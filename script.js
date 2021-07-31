let chunks = [];
let mediaRecorder;
let filterColor="";
    let videoContainer = document.createElement("div");
    videoContainer.classList.add("video-contaienr");
    let videoPlayer = document.querySelector("video");
    let recordBtn = document.querySelector("#record");
    let recordBtnSpan = document.querySelector("#record>span");
    let body = document.querySelector("body");
    let filterLiveFeed = document.querySelectorAll(".filter-live-feed");

    let isRecording = false;
  let filterContainers = document.querySelectorAll(".filter-video-container");
  for(let i = 0; i<filterContainers.length;i++){
      filterContainers[i].addEventListener("click",e=>{
        let previousFilter = document.querySelector(".main-filter");
        if(previousFilter){
            previousFilter.remove();
        }
        filterColor =  e.currentTarget.style.backgroundColor;
        let div = document.createElement("div");
        div.style.backgroundColor = filterColor;
        div.classList.add("main-filter");
        body.append(div);
        
      })
  }
   let cameraPromise =  navigator.mediaDevices.getUserMedia({video:true}); //taking user permissions
   recordBtn.addEventListener("click",e=>{
       if(isRecording){
           recordBtnSpan.classList.remove("recording-animation");
           mediaRecorder.stop();  // stop recording
            isRecording = false;
        }
        else{
             recordBtnSpan.classList.add("recording-animation");
             let previousFilter = document.querySelector(".main-filter");
             if(previousFilter){
                 previousFilter.remove();
             }
             mediaRecorder.start();
             isRecording = true; // start recording , this will not append new Recording to old recording
       }
   })
//    #b7e994e5
   cameraPromise.then((mediaStream)=>{
        videoPlayer.srcObject = mediaStream;
        for(let i =0;i<filterLiveFeed.length;i++){
            filterLiveFeed[i].srcObject = mediaStream;
    }
        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.addEventListener("dataavailable",e=>{
            chunks.push(e.data);
        })
        mediaRecorder.addEventListener("stop",e=>{
            let blob = new Blob(chunks,{type:"video/url"}); // all chunks are now a single file
            chunks = []; 
            let link = URL.createObjectURL(blob) // create a link of blob so we can download the blob using that link
            let a = document.createElement("a");
            a.href = link;
            a.download = "video.mp4";
            a.click();
            a.remove();
        })

        console.log("permission given"); 
    })
    cameraPromise.catch(()=>{
        console.log("Permission Denied");
    })