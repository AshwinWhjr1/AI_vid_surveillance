video = "";
objects = [];
stat = "";

function preload()
{

    video = createVideo('video.mp4');
    video.hide();    

}

function setup() 
{

    canvas = createCanvas(640, 360);
    canvas.center();
    video.hide();
    
}

function start() 
{

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("stat").innerHTML = "Status: Detecting objects...";

}

function modelLoaded() 
{

    console.log('Model Loaded!');
    video.loop();
    stat = "true";
    video.speed(1);
    video.volume(0);

}

function gotResult(error, results)
{

    if (error){

        console.log(error);

    }
    console.log(results);
    objects = results;

    
}
function draw()
{

    image(video, 0, 0, 640, 360);
    if(stat !="")
    {
        objectDetector.detect(video, gotResult);
        
        for ( i = 0; i < objects.length; i++){
         document.getElementById("stat").innerHTML = "Status : Objects have been detected";
        document.getElementById("no_of_objects").innerHTML = "No. of objects : " + objects.length;

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }

    }

}
