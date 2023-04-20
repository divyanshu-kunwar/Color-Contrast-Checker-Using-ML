const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const GAMMA = 2.4;

let rgb1 , rgb2;

document.addEventListener('DOMContentLoaded' , ()=>{
    generateRandom()
})

const generatedColor = ()=>{
    return [
        Number.parseInt((Math.random()*255)) ,
        Number.parseInt((Math.random()*255)),
        Number.parseInt((Math.random()*255))
    ]
} 

function generateRandom(){
    rgb1 = generatedColor()
    rgb2 = generatedColor()
    
    document.getElementById("box").style.backgroundColor = `rgb(${rgb1[0]} , ${rgb1[1]} , ${rgb1[2]})`
    document.getElementById("box").style.color = `rgb(${rgb2[0]} , ${rgb2[1]} , ${rgb2[2]})`
}

function save_to_file(action){
    let R1 = rgb1[0]
    let R2 = rgb2[0]
    let G1 = rgb1[1]
    let G2 = rgb2[1]
    let B1 = rgb1[2]
    let B2 = rgb2[2]
    let data = {
        R1 : R1,
        R2 : R2,
        G1 : G1,
        G2 : G2,
        B1 : B1,
        B2 : B2,
        action : action
    }
    console.log(data)

    // send a post request

    fetch("/add/" , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
    }).then((res)=>{
        console.log(res)
        if(res.status == 200){
            //  refresh the page
            window.location.reload()
        }else{
            console.log("Error")
        }
    })
}