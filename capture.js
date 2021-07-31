let captureBtn = document.querySelector("#capture");
captureBtn.addEventListener("click",e=>{
    let div = document.createElement("div");
    div.classList.add("capture-effect");
    body.append(div);
    setTimeout(() => {
        div.remove();
        let canvas = document.createElement("canvas");
        canvas.width = videoPlayer.videoWidth;
        canvas.height = videoPlayer.videoHeight;
        let tool = canvas.getContext("2d");
        tool.drawImage(videoPlayer,0,0);
        // let body =document.querySelector("body");
        // body.append(canvas);
        if(filterColor!=""){
            tool.fillStyle = filterColor;
            tool.fillRect(0,0,canvas.width,canvas.height);
        }
        console.log(canvas.toDataURL()); // even though its a url but it is actual data that we drawn on canvas
        let aTag = document.createElement("a");
        aTag.href = canvas.toDataURL();
        aTag.download = "img.png"
        aTag.click();
        aTag.remove();
        canvas.remove();
    },200); 
})