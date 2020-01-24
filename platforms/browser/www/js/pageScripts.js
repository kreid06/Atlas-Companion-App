function wheelInput(containerElement, increment, maxValue){
    let value = 100;
    let newSpace = () => {
        return document.createElement('div')
    }
    let spaceOne = newSpace()
    let spaceTwo = newSpace()
    spaceOne.classList.add('item-input-container-space')
    spaceTwo.classList.add('item-input-container-space')
    containerElement.appendChild(spaceOne)
    while(value <= maxValue){
        let newValueElement = document.createElement('div');
        let newID = `${containerElement.id}-${value}`

        newValueElement.setAttribute('id', newID);
        newValueElement.classList.add('item-value-input')
        newValueElement.innerHTML =  `${value}%`
        
        containerElement.appendChild(newValueElement);
        value += increment
    }
    containerElement.appendChild(spaceTwo)
}

let itemValue = document.getElementById('ship-value-input')
wheelInput(itemValue, 4, 200);

// function wheelController(containerElement){
//     containerElement.addEventListener('scroll',(e)=>{

//     })
// }   