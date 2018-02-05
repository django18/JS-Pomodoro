var app=angular.module("pomodoro",[]);

app.controller("clockController",function($scope,$interval) {

    $scope.sessionLength=15;
    $scope.breakLength=5;
    $scope.startStopFlag=false;
    $scope.newTask=true;
    $scope.timeUp=false;
    $scope.taskCompleted=[];
    $scope.taskName="Start timer for a new task";

    $scope.fillHeight=0+'%';
    $scope.fillColor='#00897b';

    $scope.working=true;
    $scope.break=false;

    $scope.breakStr="It's a break :) . Relax yourself .";

    $scope.minutes='10';
    $scope.seconds='00';
    $scope.timeToFinish=$scope.sessionLength*60;
   
    // $scope.breakLengthLeft=$scope.breakLength*60;

    $scope.startInterval=function(){
        console.log("$scope.startStopFlag",$scope.startStopFlag);
        if($scope.startStopFlag){
            $scope.interval=setInterval($scope.timeLeft,1000);
        }else{
            clearInterval($scope.interval);
        }        
    }

    $scope.timeLeft=function(){
        $scope.timeToFinish-=1;  
        let min=Math.floor($scope.timeToFinish/60);
        $scope.minutes=min<10?'0'+min:min;
        let sec=$scope.timeToFinish%60;
        $scope.seconds=sec<10?'0'+sec:sec;

        if(min==0 && sec==0)
        {
            $scope.stopClock();
            $scope.timeUp=true;
            if($scope.working){
                Materialize.toast('Your task was completed. Now you can relax for '+ $scope.breakLength+' minutes . Have fun :) . Break will start in a second.',1000,'',function(){$scope.startBreak()});
            }
            else {
                $scope.taskCompleted.push($scope.taskName);
                Materialize.toast('Break is over. Now get back to work. Have fun.', 1000,'',function(){$scope.resetClock()});
            }            
        }

        let fillH=100-(($scope.timeToFinish/($scope.sessionLength*60))*100);
        $scope.fillHeight=fillH+'%';
        //console.log("fillH :",fillH);

        $scope.$apply(); 
        //console.log("min",min);
    }

    $scope.updateTimeLeftOn=function(){
        $scope.minutes=Math.floor($scope.timeToFinish/60);
        let sec=$scope.timeToFinish%60;
        $scope.seconds=sec<10?'0'+sec:sec;
    }

    $scope.startClock=function(){
        console.log("startClock()");
        if($scope.newTask)
        $scope.taskName=prompt("What are you working on in this session?");
        $scope.newTask=false;
        $scope.startStopFlag=true;
        $scope.startInterval();
        $scope.timeUp=false;
    }

    $scope.stopClock=function(){
        console.log("StopClock()");
        $scope.startStopFlag=false;
        $scope.startInterval();
    }   

    $scope.resetClock=function(){
        console.log("resetClock()");
        $scope.startStopFlag=false;
        $scope.timeToFinish=$scope.sessionLength*60;
        $scope.updateTimeLeftOn();
        $scope.timeUp=false;
        $scope.newTask=true;
        $scope.taskName="Start with a new task";
        $scope.working=true;
        $scope.fillColor='#00897b';
        $scope.startInterval();
    }  

    $scope.startBreak=function(){
        console.log("resetClock()");
        $scope.working=false;
        $scope.timeToFinish=$scope.breakLength*60;
        $scope.updateTimeLeftOn();
        $scope.fillHeight=0+'%';
        $scope.fillColor='#f44336';
      //  $scope.taskName="It's a break :) . Relax yourself .";
        $scope.startClock();
    }  

    $scope.decreaseSessionLength=function(){
        console.log("decreaseSessionLength()");
        $scope.stopClock();
        if($scope.sessionLength>2)
        $scope.sessionLength-=1;
        $scope.timeToFinish=$scope.sessionLength*60;
        $scope.updateTimeLeftOn();
    }

    $scope.decreaseBreakLength=function(){
        console.log("decreaseBreakLength()");
        $scope.stopClock();
        if($scope.breakLength>5)
        $scope.breakLength-=1;
        //$scope.breakLengthLeft=$scope.breakLength*60;
        $scope.updateTimeLeftOn();
    }

    $scope.increaseSessionLength=function(){
        console.log("increaseSessionLength()");
        $scope.stopClock();
        if($scope.sessionLength<30)
        $scope.sessionLength+=1;
        $scope.timeToFinish=$scope.sessionLength*60;
        $scope.updateTimeLeftOn();
    }

    $scope.increaseBreakLength=function(){
        console.log("increaseBreakLength()");
        $scope.stopClock();
        if($scope.breakLength<30)
        $scope.breakLength+=1;
        //$scope.breakLengthLeft=$scope.breakLength*60;
        $scope.updateTimeLeftOn();
    }

    $scope.updateTimeLeftOn();


});