//function called when start recording
object.onstartrecord=function(){
    stopwatch = new StopWatch();
    stopwatch.start();
    recordedNotes = new Array();
}


//function called when stopped recording
object.onstoprecord=function(){
    stopwatch.clear();
}


//function called when note is pressed
onNotePressed(var key, var instrument){
    var time = recordclock();
    //store key and time somewhere
    recordedNotes.push({t:time,k:key,i:instrument});
}

//function called when record is played back
//assuming the function to play note is play(intrument, note)
onPlayRecord(){
    for(var j = 0; j < recordedNotes.length; j++) {
        var timer = recordedNotes[j].t;
        var note = recordedNotes[j].k;
        var instr = recordedNotes[j].i;
        setTimeout(function(){play(instr, note)}, timer);
    }
    //clear array
    recordedNotes = [];
}



//everything here is called by above functions
//start clock
function startclock() {
    //stopwatch object (global)
    stopwatch = new StopWatch();
    stopwatch.startTime();
}

//record the current time and return it in s
function recordclock(){
    stopwatch.recordTime();
    return stopwatch.elapsed/1000;
}

//stopwatch object implementation
function StopWatch() {
    this.start = 0;
    this.elapsed = 0;
}

StopWatch.prototype.startTime = function() {
    this.start = new Date().getTime();
}

StopWatch.prototype.recordTime = function() {
    this.elapsed = new Date().getTime() - this.start;
}

StopWatch.prototype.clear = function() {
    this.start = 0;
    this.elapsed = 0;
}



