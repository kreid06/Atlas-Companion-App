function wheelInput(containerElement, increment, maxValue){
    let value = 100;
    let newSpace = () => {
        return document.createElement('div')
    }
    let spaceOne = newSpace()
    let spaceTwo = newSpace();
    let selected = false
    spaceOne.classList.add('item-input-container-space')
    spaceTwo.classList.add('item-input-container-space')
    containerElement.appendChild(spaceOne)
    while(value <= maxValue){
        let newValueElement = document.createElement('div');
        let newID = `${containerElement.id}-${value}`
        if(!selected){
            newValueElement.classList.add('selected')
            selected =true
        }
        newValueElement.setAttribute('id', newID);
        newValueElement.classList.add('item-value-input')
        newValueElement.innerHTML =  `${value}%`
        
        containerElement.appendChild(newValueElement);
        value += increment
    }
    containerElement.appendChild(spaceTwo)
}

let shipDamageContainer = document.getElementById('ship-damage-input')
let shipResistanceContainer =  document.getElementById('ship-resistance-input')

wheelInput(shipDamageContainer, 4, 252);
wheelInput(shipResistanceContainer, 8, 396)
// function wheelController(containerElement){
//     containerElement.addEventListener('scroll',(e)=>{

//     })
// }   