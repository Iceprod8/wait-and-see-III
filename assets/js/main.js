function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let notStarted = true

async function imageHome() {
    let image = document.querySelector(".card-showing")
    image.src = `assets/img/card/${Math.floor((Math.random() * 58) + 1)}.webp`
    while(notStarted) {
        await sleep(6000)
        for(let i = 100; i >= 0; i--) {
            image.style.opacity = i / 100
            await sleep(15)
        }
        image.src = `assets/img/card/${Math.floor((Math.random() * 58) + 1)}.webp`
        for(let i = 0; i <= 100; i++) {
            image.style.opacity = i / 100
            await sleep(15)
        }
    }
}

imageHome()