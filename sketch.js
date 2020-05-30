let video;
let poseNet;
let pose;
let skeleton;
var capture;
var tracker
var w = 640,
    h = 480;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  capture = createCapture({
    audio: false,
    video: {
        width: w,
        height: h
    }
},
 function() {
    console.log('capture ready.')
});
capture.elt.setAttribute('playsinline', '');
createCanvas(w, h);
capture.size(w, h);
capture.hide();

colorMode(HSB);

tracker = new clm.tracker();
tracker.init();
tracker.start(capture.elt);
  
}
function gotPoses(poses){
 // console.log(poses);
   if (poses.length > 0){
    pose = poses[0].pose;
     skeleton=poses[0].skeleton;
  
  }
      
}

function modelLoaded() {
  console.log('PoseNet Ready');
}

function draw() {
  image(video, 0, 0);
  image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();

    noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }

    endShape();
/*
    noStroke();
    for (var i = 0; i < positions.length; i++) {
        fill(map(i, 0, positions.length, 0, 360), 50, 100);
        ellipse(positions[i][0], positions[i][1], 4, 4);
        text(i, positions[i][0], positions[i][1]);
    }

    if (positions.length > 0) {
        var mouthLeft = createVector(positions[44][0], positions[44][1]);
        var mouthRight = createVector(positions[50][0], positions[50][1]);
        var smile = mouthLeft.dist(mouthRight);
        // uncomment the line below to show an estimate of amount "smiling"
        // rect(20, 20, smile * 3, 20);

        // uncomment for a surprise
        noStroke();
        fill(0, 255, 255);
        ellipse(positions[62][0], positions[62][1], 50, 50);
     }
*/
  
  if (pose){
    let eyeR = pose.rightEye;
    let eyeL = pose.rightEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    
    fill (255,0,0);
    ellipse(pose.nose.x, pose.nose.y,0);
    fill(0,0,255);
   ellipse(pose.rightWrist.x, pose.rightWrist.y,32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y,32);
    
    for (let i = 0; i< pose.keypoints.length; i++){
    let x = pose.keypoints[i].position.x; 
    let y = pose.keypoints[i].position.y;
    fill(0,255,0);
    ellipse(x,y,16,16);
    }
}
  }
