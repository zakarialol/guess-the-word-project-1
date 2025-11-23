//selectors
const KeyColors = document.querySelector(".KeyColors")
const triesHolder = document.querySelector('.tries-holder')
const checkwordBtn = document.querySelector('.CheckWordBtn')
const MainDiv = document.querySelector('.TriesDiv')
const MessageHolder = document.querySelector('.message-holder')
const buttonsHolder = document.querySelector('.buttons')
const hintBtn = document.querySelector('.HintBtn')
const roleBtn = document.querySelector('.roleBtn')
const selector = document.querySelector('.selector')
const startBtn = document.getElementById('startBtn')
const GameStart = document.querySelector('.game-start')
const menuIcon = document.querySelector('.menu')
const menuHolder = document.querySelector('.menu-holder')
const sectionDiv = document.querySelector('.section')
const playAgaindivholder = document.querySelector('.playAgainDiv')
const categoryTextHolder = document.querySelector('.categoryText-holder')
let arraySavedToStorage = [];
let root = document.documentElement
let orange =JSON.parse(localStorage.getItem("ColrsArray"))? JSON.parse(localStorage.getItem("ColrsArray"))[1].clrOne:  getComputedStyle(root).getPropertyValue('--background-orange').trim()
let green  =JSON.parse(localStorage.getItem("ColrsArray"))? JSON.parse(localStorage.getItem("ColrsArray"))[2].clrTwo:  getComputedStyle(root).getPropertyValue('--background-green').trim()
let black  =JSON.parse(localStorage.getItem("ColrsArray"))? JSON.parse(localStorage.getItem("ColrsArray"))[3].clrTree: getComputedStyle(root).getPropertyValue('--background-black').trim()
let TrysDivs;
//colors for the gam
const selectorsArray = [
    {name:'fruit',arr:['apple','banana','orange','mango','pineapple','strawberry','blueberry','graps','watermelon','papaya','kiwi','peach','cherry','pomegranate','avocado','pear','plum','lychee','guava','fig','apricot','blackberries','raspberries','jackfruit','durian','cantaloupe','tangerine']},
    {name:'colors',arr:['red','orange','yellow','green','blue','purple','pink','brown','white','black','gray','gold','silver','maroon','cyan','magenta','turquoise','indigo','violet','beige']},
    {name:'countries',arr:['negiria','egypt','kenya','ghana','china','india','japan','indonesia','germany','france','italy','spain','canada','mexico','cuba','guatemale','braile','argentina','colombia','chiile','peru','australia','fiji','samoa','morocco','tunisia','alegeria']},
]
const colors = [`${getComputedStyle(root).getPropertyValue('--background-green').trim()}`,`${getComputedStyle(root).getPropertyValue('--background-orange').trim()}`,`${getComputedStyle(root).getPropertyValue('--background-black').trim()}`]
const explaination = ['letter is right but not in place','letters is right and in place','letter is wrong and not exists in the word']
let index = 0;
let inputActive = 1;
let inputs;
let word ;
let tries = 3;
let triesMainDiv;
let firstLetter;
let lastLetter;
let choseword ;
let btnover;
let menuholderWidth;
let SelectorValueHolder;
let hintNbr;
let color1;
let color2;
let color3;
let confirmationDiv;
const firstcolor  = getComputedStyle(root).getPropertyValue('--background-orange')
const secondColor = getComputedStyle(root).getPropertyValue('--background-green')
const thirdcolor  = getComputedStyle(root).getPropertyValue('--background-black')

function ColorsExaplainFunc(){
    // header text
    let keyColorsTxtHolder = document.createElement('p')
    keyColorsTxtHolder.classList.add('keyColorsText')
    keyColorsTxtHolder.textContent = 'key colors'
    KeyColors.innerHTML = keyColorsTxtHolder.outerHTML
    //colors explaination
    let ColorsHolder = document.createElement('div')
    ColorsHolder.classList.add('colors-explaination-holder')
    colors.forEach((_,index)=>{
        //create a div holder
        const div = document.createElement('div')
        //span for color
        const span = document.createElement('span')
        span.classList.add(`span-color-${index+1}`)
        //p for text expalanation
        let p = document.createElement('p')
        p.textContent = `${explaination[index]}`
        //appending childes
        div.append(span,p)
        ColorsHolder.append(div)
        KeyColors.append(ColorsHolder)
    })
}
ColorsExaplainFunc()
//working on treis div
function triesFunc(indx,arr){
    triesHolder.textContent = ''
    let randomChosen = Math.floor(Math.random() * arr.length)
        word = arr[randomChosen]
        if(word.length > 4 && word.length <= 7){
            hintNbr = 1
            hintTextfunc(hintNbr)
        }else if(word.length > 7){
            hintNbr = 2
            hintTextfunc(hintNbr)
        }else{
            hintNbr = 0
            hintTextfunc(hintNbr)
        }
        firstLetter = word.slice(0,1)
        lastLetter = word.slice(word.length-1,word.length)
    let wordArray = word.split('')
    for(let i = 0 ; i < tries ; i++){
        // create elemenets
        let tryDiv = document.createElement('div')
        let inputHolder = document.createElement('div')
        let textHolder = document.createElement('p')
        textHolder.textContent = `try ${i + 1}`
        tryDiv.id = `try-${i + 1}`
        tryDiv.classList.add('try')
        //appending childs 
        wordArray.forEach(()=>{
            let input = document.createElement('input')
            input.setAttribute('maxlength','1')
            inputHolder.append(input)
        })
        tryDiv.append(textHolder,inputHolder)
        triesHolder.append(tryDiv)
    }
    triesMainDiv = document.querySelectorAll('.tries-holder .try')
    addDisactiveFunc(indx,triesMainDiv)
    inputs = document.querySelectorAll(`#try-${indx+1} input`)
    AddLetters(firstLetter,lastLetter,inputs,inputActive)
    TrysDivs= document.querySelectorAll('.tries-holder .try')
}

function addDisactiveFunc(indx,trysdivs){
    trysdivs.forEach((itm,index)=>{
        itm.classList.remove('disabled')
        if(indx !== index){
            itm.classList.add('disabled')
        }
    })
}
//function to add first letter and the last letter
function AddLetters(firstLetter,lastLetter,inputs,activeinpt){
    inputs[0].value = firstLetter
    inputs[0].classList.add('input-disabled','bg-green')
    inputs[inputs.length - 1].value = lastLetter
    inputs[inputs.length - 1].classList.add('input-disabled','bg-green')
    inputs[activeinpt].focus()
    inputs.forEach((itm,index)=>{
        itm.addEventListener('keydown',(itm)=>{
            if(itm.key === 'Tab'){
                if(index === Number(inputs.length - 2)){
                    itm.preventDefault()
                    return
                }
            }else if(itm.key === 'Enter'){
                checkwordBtn.click()
            }
            if(!itm.key.match('^[a-zA-Z]$') && !['Backspace','Tab'].includes(itm.key)){
                itm.preventDefault()
                return
            }else{
                setTimeout(()=>{
                    if(itm.key === 'Backspace'){
                        if(index === activeinpt){
                            return
                        }
                        inputs[index-1].focus()
                        return
                    }
                    if(index === Number(inputs.length - 2)){
                            return
                    }
                    inputs[index + 1].focus()
                },0)
            } 
        })
    })
}
// working on check button
checkwordBtn.addEventListener('click',checkBtnFunc)
function checkBtnFunc(){
    let wordAsarray = word.split('')
    let wordcutted = word.slice(1,word.length-1)
    let WordChosenAsarray = wordcutted.split('')
    let InputResultWord = ''
    for(let i = 0 ; i < inputs.length ; i++){
        if(inputs[i].value.trim()=== ''){
            inputs[i].focus()
            messageFunc('msg-orange','please fill the inputs')
            return
        }
    }
    //
    inputs.forEach((itm,index)=>{
        InputResultWord +=itm.value
        if(index > 0 && index < inputs.length-1){
            if(itm.value.toLowerCase() === wordAsarray[index]){
                itm.classList.add('bg-green')
            }else if(WordChosenAsarray.includes(itm.value.toLowerCase())){
                itm.classList.add('bg-orange')
            }else{
                itm.classList.add('bg-black')
            }
        }
    })
    if(word.toLowerCase() === InputResultWord.toLowerCase()){
        btnover = '<button class="restart-gameBtn">restart game</button>'
        resultMsg('resultMsg victoryText','victory','the word is:',word,btnover)
    }else{
        index++
        if(index >= triesMainDiv.length){
            btnover = '<button class="restart-gameBtn">restart game</button>'
            resultMsg('gameOver','game over','currect word is:',word,btnover)
        }else{
            inputs = document.querySelectorAll(`#try-${index+1} input`)
            addDisactiveFunc(index,triesMainDiv)
            AddLetters(firstLetter,lastLetter,inputs,inputActive)
        }
    }
}
//message function 
function messageFunc(clas,mesg){
    let message = `<p class ="${clas}">${mesg}</p>`
    MessageHolder.innerHTML = message
    let mesholder = document.querySelector(`.message-holder p`)
    let p_height = mesholder.offsetHeight
    MessageHolder.style.height = p_height + 'px'
    setTimeout(()=>{
        MessageHolder.style.height = 0 + 'px'
    },1100)
}
function resultMsg(clss,text,text2,word,BtnRestart){
    menuIcon.style.display ='none'
    let message = `<div class='result-Msg-container'>
                            <p class = '${clss}'>${text}</p>
                            <div class='currectWordHolder'>
                                <p class='text2'>${text2}</p>
                                <span class='Msg-word-styling'>${word}</span>
                            </div>
                            <div class ='selectDivHolder'></div>
                            <div class='BtnRestart'>${BtnRestart}</div>
                    </div>`
    triesHolder.innerHTML = message
    let selectDiv = document.querySelector('.selectDivHolder')
    selectDiv.appendChild(selector)
    MainDiv.style.justifyContent= 'center'
    buttonsHolder.style.display = 'none'
    menuholderWidth = menuHolder.offsetWidth
    menuHolder.style.right = `-${menuholderWidth}px`
}
triesHolder.addEventListener('click',(element)=>{
    if(String(element.target.classList) === 'playAgainBtn'){
        index = 0
        buttonsHolder.style.display = 'flex'
        triesFunc(index,ChossenArray)
    }else{
        return
    }
})
// working on hint button
function hintTextfunc(nbr){
    hintBtn.textContent = `${nbr} hint`
}

hintBtn.addEventListener('click',()=>{
    if(hintNbr <= 0){
        messageFunc('msg-orange','you have 0 hint')
        return
    }
    for(i = 1 ; i < word.length - 1 ; i++){
        if(word[i].toLowerCase() !== inputs[i].value.toLowerCase()){
            inputs[i].value = word[i]
            inputs[i].classList.add('border-bottom-style')
            break
        }
    }
    hintNbr--
    hintTextfunc(hintNbr)
})
// working on selector
function selectorFillFunc(){
    for( i=0 ; i < selectorsArray.length ; i++){
        selector.innerHTML += `<option value='${selectorsArray[i].name}'>${selectorsArray[i].name}</option>`
    }
}
selectorFillFunc()
//selector function
function selecteventfunc(selectval){
    index = 0 ;
    let selectvalue = selectval
    let obj = selectorsArray.find((itm)=>{
        return itm.name == selectvalue
    })
    ChossenArray = obj.arr
    triesFunc(index,ChossenArray)
}
// working on menu 
menuIcon.addEventListener('click',()=>{
    let message = `<div class='xmark-div'><a href="#">
                        <i class="xmarkButton fa-sharp fa-solid fa-xmark"></i></a>
                    </div>
                    <div class='selector-div divHover'>
                        <p>change list:</p>
                        <div class='selectorHolderDiv'></div>
                    </div>
                    <div class = 'divForColors divHover'>
                        <p>change colors</p>
                        <div class ='colorsHolder'>
                            <input type='color' class='clr color1'>
                            <input type='color' class='clr color2'>
                            <input type='color' class='clr color3'>
                        </div>
                    </div>
                    <div class='doneBtnDiv'>
                        <button class="doneBtn ">done</button>
                        <button class="resetBtn">reset</button>
                        <div class="confirmation hiden">
                            <p>are sure you want to reset setting ?</p>
                            <div class='confirmationBtnsDiv'>
                                <button class='yesBtn'>yes</button>
                                <button class='noBtn'>no</button>
                            </div>
                        </div>
                    </div>
                    `
    menuHolder.innerHTML = message
    let slectorParagraph = document.querySelector('.selector-div .selectorHolderDiv')
    confirmationDiv = document.querySelector('.doneBtnDiv .confirmation')
    color1 = document.querySelector('.divForColors .color1')
    color2 = document.querySelector('.divForColors .color2')
    color3 = document.querySelector('.divForColors .color3')
    slectorParagraph.appendChild(selector)
    menuHolder.style.right = '0px'
    //
    orange =JSON.parse(localStorage.getItem("ColrsArray"))?JSON.parse(localStorage.getItem("ColrsArray"))[1].clrOne: getComputedStyle(root).getPropertyValue('--background-orange').trim()
    green =JSON.parse(localStorage.getItem("ColrsArray"))?JSON.parse(localStorage.getItem("ColrsArray"))[2].clrTwo: getComputedStyle(root).getPropertyValue('--background-green').trim()
    black =JSON.parse(localStorage.getItem("ColrsArray"))?JSON.parse(localStorage.getItem("ColrsArray"))[3].clrTree: getComputedStyle(root).getPropertyValue('--background-black').trim()
    rootTesting(orange,green,black)
})

sectionDiv.addEventListener('click',(itm)=>{
    if(itm.target.classList.contains('xmarkButton')){
        menuholderWidth = menuHolder.offsetWidth + 1
        menuHolder.style.right = `-${menuholderWidth}px`
    }if(itm.target.classList.contains('roleBtn')||itm.target.classList.contains('restart-gameBtn')||itm.target.classList.contains('startBtn')){
        SelectorValueHolder = selector.value
        localStorageFunc(orange,green,black)
        categoryTextHolder.textContent =`${SelectorValueHolder} category`
        GameStart.style.display = 'none'
        menuIcon.style.display ='block'
        buttonsHolder.style.display ='flex'
        selecteventfunc(selector.value)
    }
    if(itm.target.classList.contains('doneBtn')){
        if(selector.value !== SelectorValueHolder){
            startBtn.click()
        }
        menuholderWidth = menuHolder.offsetWidth
        menuHolder.style.right = `-${menuholderWidth}px`
    }
    if(itm.target.classList.contains('resetBtn')){
        confirmationDiv.classList.remove('hiden')
    }
    if(itm.target.classList.contains('noBtn')){
        confimationFunc(false)
    }
    if(itm.target.classList.contains('yesBtn')){
        confimationFunc(true)
    }
    
})
//
function confimationFunc(boll){
    if(boll){
        root.style.setProperty('--background-orange',firstcolor)
        root.style.setProperty('--background-green',secondColor)
        root.style.setProperty('--background-black',thirdcolor)
        confirmationDiv.classList.add('hiden')
        rootTesting(firstcolor,secondColor,thirdcolor)
        localStorageFunc(firstcolor,secondColor,thirdcolor)
        return
    }else{
        confirmationDiv.classList.add('hiden')
    }
}
//
sectionDiv.addEventListener('input',(elm)=>{
    let arrColors =JSON.parse(localStorage.getItem('ColrsArray'))
    if(elm.target.classList.contains('color1')){ 
        root.style.setProperty('--background-orange',`${color1.value}`)
        modifieArrayFunc(arrColors , color1.value , Object.keys(arrColors[1])[0])
    }
    if(elm.target.classList.contains('color2')){
        root.style.setProperty('--background-green',`${color2.value}`)
        modifieArrayFunc(arrColors , color2.value , Object.keys(arrColors[2])[0])
    }
    if(elm.target.classList.contains('color3')){
        root.style.setProperty('--background-black',`${color3.value}`)
        modifieArrayFunc(arrColors,color3.value,color3)
        modifieArrayFunc(arrColors , color3.value , Object.keys(arrColors[3])[0])
    }
})
//
function modifieArrayFunc(storageArray,colr,elm){
    storageArray = storageArray.map((itm) => {
        if(itm[elm]){
            itm[elm] = colr
        }
        return itm
    }) 
    saveToLocalfunc(storageArray)
}
//get properties inside the root
function rootTesting(orange,green,black){
    color1.value = orange
    color2.value = green
    color3.value = black
}
//function for local storage
function localStorageFunc(orange,green,black){
    let arraySavedToStorage = [{selecVal:`${selector.value}`},
        {clrOne: orange},
        {clrTwo: green},
        {clrTree: black},
    ]
    saveToLocalfunc(arraySavedToStorage)
}
// localStorageFunc()
function saveToLocalfunc(storageArray){
    localStorage.setItem('ColrsArray',JSON.stringify(storageArray))
}
// geting local storage done
window.addEventListener('load',()=>{
    let arrayretrivedFromLocalStorage = JSON.parse(localStorage.getItem("ColrsArray"))
    arrayretrivedFromLocalStorage ? root.style.setProperty('--background-orange',arrayretrivedFromLocalStorage[1].clrOne) : null
    arrayretrivedFromLocalStorage ? root.style.setProperty('--background-green',arrayretrivedFromLocalStorage[2].clrTwo) : null
    arrayretrivedFromLocalStorage ? root.style.setProperty('--background-black',arrayretrivedFromLocalStorage[3].clrTree) : null
})
