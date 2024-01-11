console.log("Welcome to Spotify")

//Intialize the variables
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById("masterPlay")
let masterBackward=document.getElementById("masterBackward")
let masterForward=document.getElementById("masterForward")
let myProgressBar=document.getElementById("myProgressBar")
let gif=document.getElementById("gif")
let masterSongName=document.getElementById("masterSongName")
let songItems=Array.from(document.getElementsByClassName("songItem"))
let songItemPlay=Array.from(document.getElementsByClassName("songItemPlay"))
let gifPlay=Array.from(document.getElementsByClassName("gifPlay"))
let songTimeUpdate=document.getElementById("songTimeUpdate")
let shuffleButton=document.getElementById("shuffle-button")

let songs=[
    {songName: "Tune Jo Na Kaha - Mohit Chauhan", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Mast Magan - Arijit Singh", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Kal Ho Na Ho - Sonu Nigam", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Tu Aake Dekhle - King", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Maan Meri Jaan - King", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Cheques - Shubh", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Liggi - Ritviz", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Dil Kya Kare (Salam-e-Ishq) - Adnan Sami", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Closer - The Chainsmokers", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Love Me Like You Do - Ellie Goulding", filePath: "songs/9.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName
})

// Handle play/pause click
let y=document.createTextNode(songs[songIndex].songName)
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused||audioElement.currentTime<=0)
    {
        audioElement.play()
        masterSongName.innerText=songs[songIndex].songName
        songItemPlay[songIndex].classList.remove("fa-play-circle")
        songItemPlay[songIndex].classList.add("fa-pause-circle")
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")
        gif.style.opacity=1
        masterSongName.style.opacity=1
        gifPlay[songIndex].style.opacity=1
        songTimeUpdate.style.opacity=1
    }
    else
    {
        audioElement.pause()
        songItemPlay[songIndex].classList.remove("fa-pause-circle")
        songItemPlay[songIndex].classList.add("fa-play-circle")
        masterPlay.classList.remove("fa-pause-circle")
        masterPlay.classList.add("fa-play-circle")
        gif.style.opacity=0
        masterSongName.style.opacity=0
        gifPlay[songIndex].style.opacity=0
        songTimeUpdate.style.opacity=0
    }
})

masterForward.addEventListener('click',()=>{
    if(songIndex>=9)
    {
        songItemPlay[songIndex].classList.remove("fa-pause-circle")
        songItemPlay[songIndex].classList.add("fa-play-circle")
        gifPlay[songIndex].style.opacity=0
        songIndex=0
    }
    else
    {
        songItemPlay[songIndex].classList.remove("fa-pause-circle")
        songItemPlay[songIndex].classList.add("fa-play-circle")
        gifPlay[songIndex].style.opacity=0
        songIndex++;
    }    
    audioElement.src=`songs/${songIndex+1}.mp3`
    masterSongName.innerText=songs[songIndex].songName
    audioElement.currentTime=0
    audioElement.play()
    songItemPlay[songIndex].classList.remove("fa-play-circle")
    songItemPlay[songIndex].classList.add("fa-pause-circle")
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")
    gif.style.opacity=1
    masterSongName.style.opacity=1
    gifPlay[songIndex].style.opacity=1
    songTimeUpdate.style.opacity=1
})

masterBackward.addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songItemPlay[songIndex].classList.remove("fa-pause-circle")
        songItemPlay[songIndex].classList.add("fa-play-circle")
        gifPlay[songIndex].style.opacity=0
        songIndex=9
    }
    else
    {
        songItemPlay[songIndex].classList.remove("fa-pause-circle")
        songItemPlay[songIndex].classList.add("fa-play-circle")
        gifPlay[songIndex].style.opacity=0
        songIndex--;
    }    
    audioElement.src=`songs/${songIndex+1}.mp3`
    masterSongName.innerText=songs[songIndex].songName
    audioElement.currentTime=0
    audioElement.play()
    songItemPlay[songIndex].classList.remove("fa-play-circle")
    songItemPlay[songIndex].classList.add("fa-pause-circle")
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")
    gif.style.opacity=1
    masterSongName.style.opacity=1
    gifPlay[songIndex].style.opacity=1
    songTimeUpdate.style.opacity=1
})

let temp=0
audioElement.addEventListener('timeupdate',()=>{
    //Update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value=progress
    if(Math.floor(audioElement.duration)/60>=10)
    {
        if(Math.floor((audioElement.duration-audioElement.currentTime))%60>=10)
        {
            songTimeUpdate.innerText=Math.floor((audioElement.duration-audioElement.currentTime)/60)+":"+Math.floor((audioElement.duration-audioElement.currentTime))%60
        }
        else
        {
            songTimeUpdate.innerText=Math.floor((audioElement.duration-audioElement.currentTime)/60)+":"+'0'+Math.floor((audioElement.duration-audioElement.currentTime))%60
        }
    }
    else
    {
        if(Math.floor((audioElement.duration-audioElement.currentTime))%60>=10)
        {
            songTimeUpdate.innerText='0'+Math.floor((audioElement.duration-audioElement.currentTime)/60)+":"+Math.floor((audioElement.duration-audioElement.currentTime))%60
        }
        else
        {
            songTimeUpdate.innerText='0'+Math.floor((audioElement.duration-audioElement.currentTime)/60)+":"+'0'+Math.floor((audioElement.duration-audioElement.currentTime))%60
        }
    }
    if(temp>=1)
    {
        if(myProgressBar.value==myProgressBar.max)
        {
            songItemPlay[songIndex].classList.remove("fa-pause-circle")
            songItemPlay[songIndex].classList.add("fa-play-circle")
            gifPlay[songIndex].style.opacity=0
            songIndex=Math.floor(Math.random()*10)
            audioElement.src=`songs/${songIndex+1}.mp3`
            audioElement.currentTime=0
            audioElement.play()
            masterSongName.innerText=songs[songIndex].songName
            songItemPlay[songIndex].classList.remove("fa-play-circle")
            songItemPlay[songIndex].classList.add("fa-pause-circle")
            masterPlay.classList.remove("fa-play-circle")
            masterPlay.classList.add("fa-pause-circle")
            gif.style.opacity=1
            masterSongName.style.opacity=1
            gifPlay[songIndex].style.opacity=1
            songTimeUpdate.style.opacity=1
        }
    }
    else
    {
        if(myProgressBar.value==myProgressBar.max)
        {
            if(songIndex>=9)
            {
                songItemPlay[songIndex].classList.remove("fa-pause-circle")
                songItemPlay[songIndex].classList.add("fa-play-circle")
                songIndex=0
            }
            else
            {
                songItemPlay[songIndex].classList.remove("fa-pause-circle")
                songItemPlay[songIndex].classList.add("fa-play-circle")
                songIndex++;
            }    
            audioElement.src=`songs/${songIndex+1}.mp3`
            masterSongName.innerText=songs[songIndex].songName
            audioElement.currentTime=0
            audioElement.play()
            songItemPlay[songIndex].classList.remove("fa-play-circle")
            songItemPlay[songIndex].classList.add("fa-pause-circle")
            masterPlay.classList.remove("fa-play-circle")
            masterPlay.classList.add("fa-pause-circle")
            gif.style.opacity=1
            masterSongName.style.opacity=1
            gifPlay[songIndex].style.opacity=1
            songTimeUpdate.style.opacity=1
        }
    }
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100
})

const makeAllPlay=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
        gifPlay[songIndex].style.opacity=0
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused||audioElement.currentTime<=0)
        {
            makeAllPlay()
            songIndex=parseInt(e.target.id)
            e.target.classList.remove('fa-play-circle')
            e.target.classList.add('fa-pause-circle')
            audioElement.src=`songs/${songIndex+1}.mp3`
            masterSongName.innerText=songs[songIndex].songName
            audioElement.play()
            masterPlay.classList.remove("fa-play-circle")
            masterPlay.classList.add("fa-pause-circle")
            gif.style.opacity=1
            masterSongName.style.opacity=1
            gifPlay[songIndex].style.opacity=1
            songTimeUpdate.style.opacity=1
        }
        else
        {
            if(parseInt(e.target.id)==songIndex)
            {
                e.target.classList.remove('fa-pause-circle')
                e.target.classList.add('fa-play-circle')
                audioElement.pause()
                gif.style.opacity=0
                masterSongName.style.opacity=0
                gifPlay[songIndex].style.opacity=0
                songTimeUpdate.style.opacity=0
                masterPlay.classList.add("fa-play-circle")
                masterPlay.classList.remove("fa-pause-circle")
            }
            else
            {
                makeAllPlay()
                songIndex=parseInt(e.target.id)
                e.target.classList.remove('fa-play-circle')
                e.target.classList.add('fa-pause-circle')
                audioElement.src=`songs/${songIndex+1}.mp3`
                masterSongName.innerText=songs[songIndex].songName
                audioElement.play()
                masterPlay.classList.remove("fa-play-circle")
                masterPlay.classList.add("fa-pause-circle")
                gif.style.opacity=1
                masterSongName.style.opacity=1
                gifPlay[songIndex].style.opacity=1
                songTimeUpdate.style.opacity=1
            }
        }
    })
})


shuffleButton.addEventListener('click',()=>{
    temp++;
    songIndex=Math.floor(Math.random()*10)
    masterSongName.innerText=songs[songIndex].songName
    audioElement.src=`songs/${songIndex+1}.mp3`
    audioElement.play()
    songItemPlay[songIndex].classList.remove("fa-play-circle")
    songItemPlay[songIndex].classList.add("fa-pause-circle")
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")
    gif.style.opacity=1
    masterSongName.style.opacity=1
    gifPlay[songIndex].style.opacity=1
    songTimeUpdate.style.opacity=1
})