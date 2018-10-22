javascript:(
    function(){
        let times = document.getElementsByClassName('tracklist-duration');
        let timesSum = [0,0,0];
        for(let i=0;i<times.length;i++){
            let timeParts = times[i].firstChild.innerText.split(':').reverse();
            if(timeParts[0])
                timesSum[0] += Number.parseInt(timeParts[0]);
            if(timeParts[1])
                timesSum[1] += Number.parseInt(timeParts[1]);
            if(timeParts[2])
                timesSum[2] += Number.parseInt(timeParts[2]);
        }

        timesSum[1] += Math.floor(timesSum[0]/60);
        timesSum[0]  = timesSum[0] % 60;
        timesSum[2] += Math.floor(timesSum[1]/60);
        timesSum[1]  = timesSum[1] % 60;
        
        timesSum = timesSum.reverse();

        timesSumString = 
            timesSum[0].toString() + ':' +
            timesSum[1].toString().padStart(2,'0') + ':' +
            timesSum[2].toString().padStart(2,'0');

        console.log(timesSumString);

        let songsP = document.getElementsByClassName('TrackListHeader__text-silence TrackListHeader__entity-additional-info')[0];
        songsP.innerText = songsP.innerText+' / '+ timesSumString;
    }()
);