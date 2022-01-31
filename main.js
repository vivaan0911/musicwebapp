song1="";
song2="";

song1_status="";
song2_status="";

function preload(){
    song1= loadSound("UFS.mp3");
    song2= loadSound("HPTS.mp3");
}

scoreRightWrist=0;
scoreLeftWrist=0;

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    console.log("canvas is on");
    
    video= createCapture(VIDEO);
    video.hide();
    
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Pose Net is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        
        scoreRightWrist= results[0].pose.keypoints[10].score;
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("score right wrist = " + scoreRightWrist + " score left wrist = " + scoreLeftWrist);
        
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightWristX + " right wrist y = " + rightWristY);
        
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftWristX + " left wrist y = " + leftWristY);
    }
}

function draw(){
image(video, 0, 0, 600, 500);
fill("#0016FF");
stroke("#0016FF");

song1_status= song1.isPlaying();
song2_status= song2.isPlaying();

if(scoreRightWrist > 0.2){
    circle(rightWristX, rightWristY, 20);
    song2.stop();

    if(song1_status == false){
        song1.play();
        document.getElementById("song_name").innerHTML= "SONG NAME - Uptown Funk";
    }
}

if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    song1.stop();

    if(song2_status == false){
        song2.play();
        document.getElementById("song_name").innerHTML= "SONG NAME - Harry Potter Theme Song";
    }
}
}