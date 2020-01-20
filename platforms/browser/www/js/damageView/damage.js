
// need to change these functions to listen to the parent element instead

function createMenuButtonEvent(){
    for(let i = 0; i < menuContainer.children.length; i++){
        let button = menuContainer.children[i];
        let dataID = button.getAttribute('data-id');

        button.addEventListener('mousedown',(e)=>{
            changePage(dataID)
        })
    }
}
function createDamageButtonEvents(){
    for(let i = 0; i < damageBtns.length; i++){
        let button = damageBtns[i];
        let dataID = button.getAttribute('data-id');

        button.addEventListener('mousedown', (e)=>{
            openDamageModal(dataID)
        })
    }
}

function playerMenuEvents(){
    playerMenuBtn.addEventListener('mousedown', (e)=>{
        playerMenu.classList.toggle('hidden');
    })
    closeDamageModalBtn.addEventListener('mousedown', (e)=>{
        closeModal();
    })
}

