let captureBtn = document.querySelector("#capture");
zoomIn.addEventListener("click",e=>{
    if(isRecording){
        return;
    }
    if(zoomLevel>=3){
        zoomLevel=3;
        
    }
    else{
        zoomLevel+=0.1;
        videoPlayer.style.transform = `scale(${zoomLevel})`;
    }
    console.log(zoomLevel);
})
zoomOut.addEventListener("click",e=>{
    if(isRecording){
        return;
    }
    if(zoomLevel<=1){
        zoomLevel=1;
    }
    else{
        zoomLevel-=0.1;
        videoPlayer.style.transform = `scale(${zoomLevel})`;
    }
    console.log(zoomLevel);

})
captureBtn.addEventListener("click",e=>{
    let div = document.createElement("div");
    div.classList.add("capture-effect");
    body.append(div);
    setTimeout(() => {
        div.remove();
        let canvas = document.createElement("canvas");
        canvas.width = videoPlayer.videoWidth;
        canvas.height = videoPlayer.videoHeight;
        let sheet = canvas.getContext("2d");
        // let body =document.querySelector("body");
        // body.append(canvas);
        sheet.translate(canvas.width/2,canvas.height/2); // isse sheet ka top left cornet canvas border ke center pe aa jayega
        sheet.scale(zoomLevel,zoomLevel); // stretching the sheet
        sheet.translate(-canvas.width/2,-canvas.height/2); // again move to topleft of canvas, now our sheet is bigger than canvas and visible part look like centered zoom
        if(filterColor!=""){
            sheet.fillStyle = filterColor;
            sheet.fillRect(0,0,canvas.width,canvas.height);
        }
        sheet.drawImage(videoPlayer,0,0);
        let aTag = document.createElement("a");
        console.log(canvas.toDataURL());
        aTag.href = canvas.toDataURL(); // even though its a url but it is actual data that we drawn on canvas
        aTag.download = "img.png"
        aTag.click();
        aTag.remove();
        canvas.remove();
    },200); 
})