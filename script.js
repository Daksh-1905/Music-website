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

let songs=[
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumahari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Tumahari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
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
        songItemPlay[songIndex].classList.remove("fa-play-circle")
        songItemPlay[songIndex].classList.add("fa-pause-circle")
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")
        gif.style.opacity=1
        masterSongName.style.opacity=1
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
    }
})

masterForward.addEventListener('click',()=>{
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
})

masterBackward.addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songItemPlay[songIndex].classList.remove("fa-pause-circle")
        songItemPlay[songIndex].classList.add("fa-play-circle")
        songIndex=9
    }
    else
    {
        songItemPlay[songIndex].classList.remove("fa-pause-circle")
        songItemPlay[songIndex].classList.add("fa-play-circle")
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
})

audioElement.addEventListener('timeupdate',()=>{
    //Update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value=progress
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100
})

const makeAllPlay=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlay()
        songIndex=parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src=`songs/${songIndex+1}.mp3`
        audioElement.currentTime=0
        masterSongName.innerText=songs[songIndex].songName
        audioElement.play()
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")
        gif.style.opacity=1
        masterSongName.style.opacity=1
    })
})