function View(id, status){
    this.containers = {};
    this.viewEvents = {};
    this.modal = null;
    this.currentEventQueue;
    this.id = id;
    this.view = null;
    this.status = status

    var findID = (id)=>{
        let element = document.getElementById(id);
        if(element){return element}
        console.error(`${id} not found !`)
        return false
    }
    this.view = findID(this.id)
    var getViewElement = ()=>{
        let element = findID(this.id);
        if(!element){return};
        this.view = element
    }

    this.addViewEvents = (type, addFunction)=>{
        if(!this.modal){return console.error('no modal!')}
        if(this.viewEvents[type] === undefined){this.viewEvents[type]={}};
        this.viewEvents[type][addFunction.name] = addFunction ;
    }
    this.removeViewEvents = (type, removeFunction)=>{
        if(!this.modal){return console.error('no modal!')}
        if(this.viewEvents[type][removeFunction.name]=== null){return};
        delete this.viewEvents[type][removeFunction.name];
        console.log('removedEventFuntion',removeFunction)
    }

    this.setContainer = (id)=>{
        let element = findID(id);
        if(!element){return}
        if(this.containers[id] === undefined){
            this.containers[id] = element; 
            console.log(`Added ${id} !`)
        }else{
            console.error(`${id} is already defined !`)
        }
    }
    this.setModal = (modalName, modalID)=>{
        console.log('setting modal')
        let element = findID(modalID);
        if(!element){return}
        this.modal = new Modal(modalName, modalID)
        return console.log(`modal ${modalName} set`)
    }
    this.openModal = ()=>{
        if(this.modal){
            this.modal.open() 
        }
        return console.error('modal doesntExist')
    }
    this.closeModal = ()=>{
        if(this.modal){
            !this.modal.classList.contains('hidden') ?
            this.modal.classList.add('hidden') : null;
            return console.log('closedModal')
        }
        return console.error('modal doesntExist')
    }
    this.open = ()=>{
        this.view.classList.contains('hidden')?
        this.view.classList.remove('hidden'):
        null
        this.status = 'opened'
    }
    this.close = ()=>{
        !this.view.classList.contains('hidden')?
        this.view.classList.add('hidden'):
        null
        this.status = 'closed'
    }
    this.startEventQueue = ()=>{
        getViewElement();
        let types = []
        if(this.currentEventQueue){
            this.currentEventQueue.forEach(([type, oldFunction])=>{
                this.view.removeEventListener(type, oldFunction)
            })
        }
        console.log(this.viewEvents)
        Object.entries(this.viewEvents).forEach(([type, functionObject])=> {
            let newFunction = (e)=>{
                Object.values(functionObject).forEach((currentFunction)=>{
                    console.log(currentFunction)
                    currentFunction(e);
                })
            }
            types.push([type,newFunction])
            this.view.addEventListener(type, newFunction)
        });
        this.currentEventQueue = types;
    }
}

function Modal(name ,id, viewID){
    var findID = (id)=>{
        let element = document.getElementById(id);
        if(element){return element}
        console.error(`${id} not found !`)
        return false
    }
    
    const containers = {};
    const modalEvents = {};
    const modal = findID(id);

    this.name = name;
    this.id = id;
    this.viewID = viewID;
    this.currentEventQueue = null;

    this.addModalEvents = (type,addFunction)=>{
        if(!modal){return console.error('no modal!')}
        if(modalEvents[type]=== null){modalEvents[type]={}};
        modalEvents[type][addFunction.name]=addFunction;
        console.log('addedEventFuntion',addFunction)
    }
    this.removeModalEvents = (type, removeFunction)=>{
        if(!modal){return console.error('no modal!')}
        if(modalEvents[type][removeFunction.name]=== null){return};
        delete modalEvents[type][removeFunction.name];
        console.log('removedEventFuntion',removeFunction)
    }

    this.open = ()=>{
        modal.classList.contains('hidden')?
        modal.classList.remove('hidden'): null
    }
    this.close = ()=>{
        !modal.classList.contains('hidden')?
        modal.classList.add('hidden'): null
    }

    this.setContainer = (id)=>{
        let element = findID(id);
        if(!element){return}
        if(containers[id] === undefined){
            containers[id] = element; 
            console.log(`Added ${id} !`)
        }else{
            console.error(`${id} is already defined !`)
        }
    }

    this.start=()=>{

    }

}



function MenuView(id, status, parent){
    View.call(this, id, status);
    this.parent = parent

    // let menuEvents = (e)=>{
    //     let id = e.target.id;
    // }

    // this.start = ()=>{

    // }
}

function DamageView(id, modalID, status){
    View.call(this, id, status);

    this.setModal('damage-modal',modalID);
    // this.parent = parent;
    var atkModalData = false;
    var selectedAttackType = "island-attack-button";
    var selectedAttackShipType = null;
    var selectedAttacker = null;
    var selectedDefender = null;

    this.openModal = (sideID)=>{
        if(this.modal){
            this.modal.open()
        }
        return console.error('modal doesntExist')
    }

    function newResultList(data, type, resultLevel, preCategoryName){
        let categoryName = preCategoryName + resultLevel.toString();
        let itemContainer = 
        type === 'attacker' && resultLevel === 1 ? 
        containers['type-attack-result1'] :
        type === 'attacker' && resultLevel === 2 ?
        containers['type-attack-result2'] :
        type === 'defender' && resultLevel === 1 ?
        containers['type-defend-result1'] :
        type === 'defender' && resultLevel === 2 ?
        containers['type-defend-result2'] :
        null
        itemContainer.innerHTML = ""
        data.forEach(({name,id,imageSrc})=>{
    
            let itemCard = document.createElement('div');
            let itemImg = document.createElement('img');
            let itemText = document.createElement('div');
            let overlayBtn = document.createElement('div');
            let newID = `${categoryName}-${type}-${id}`
    
            itemImg.classList.add(`item-card-img`);
            itemImg.setAttribute('src', `./img/${imageSrc?imageSrc:'close.png'}`);
    
            itemText.classList.add(`item-card-text`);
            itemText.innerHTML = name.replace(/_/g, " ");
            
            overlayBtn.classList.add('item-overlay')
            overlayBtn.setAttribute('data-category', categoryName)
            overlayBtn.setAttribute('data-id', newID);
    
            itemCard.classList.add(`${categoryName}-card`);
            itemCard.classList.add(`item-card`);
            itemCard.setAttribute('id', newID)
    
            newID === selectedAttackShipType ||
            newID === selectedAttackType     ||
            newID === selectedAttacker //    ||
            // newID === selectedDefendType  ||
            // newID === selectedDefendShipType 
            ? itemCard.classList.add('selected'): null
            
            itemCard.appendChild(overlayBtn);
            itemCard.appendChild(itemImg);
            itemCard.appendChild(itemText);
            
            itemContainer.appendChild(itemCard)
        })
        
    }

    function selectCard(e){
    let id = e.target.id
        // if(e.target.classList.contains('item-overlay')){
        //     let side = e.target.dataset.category === "weapon" ? "Attacker" : "Defender"
        //     let prevCard = document.getElementsByClassName(`selected${side}`)[0] || null;
        //     prevCard ? prevCard.classList.remove(`selected${side}`): null;
        //     document.getElementById(e.target.dataset.id).classList.add(`selected${side}`)
        //     side === "Attacker" ? selectedAttacker = e.target.dataset.id.replace(/[\w]*-/g,"") : selectedDefender = e.target.dataset.id
        //     updateDamage(side)
        //     console.log(e)

        // }
        if(id.includes('attack-button') && id !== selectedAttackType){
            let prev = document.getElementById(selectedAttackType);
            prev.classList.remove('selected');
            e.target.classList.add('selected');
            selectedAttackType = e.target.id;
            switch(id){
                case 'ship-attack-button':
                    newResultList(shipData, 'attacker', 1, 'ship');
                    break;
                case 'island-attack-button':
                    newResultList(weaponData, 'attacker', 1,'island');
                    !containers['type-attack-result-2'].classList.contains('hidden')? containers['type-attack-result-2'].classList.add('hidden'): null;
                    selectedAttackShipType = null;
                    break;
                default:console.log('it didnt work :(');
            }
            return
        }
        if(e.target.dataset.id?e.target.dataset.id.includes('ship1-attacker') :false && e.target.dataset.id !== selectedAttackShipType) {
            console.log('looking for ship weapons');
            containers['type-attack-result-2'].classList.contains('hidden')? containers['type-attack-result-2'].classList.remove('hidden'): null;
            selectedAttackShipType ?  
            document.getElementById(selectedAttackShipType).classList.remove('selected'): null;
            document.getElementById(e.target.dataset.id).classList.add('selected');
            let weaponDataList = shipData[parseInt(e.target.dataset.id.replace(/[\w]*-/g, ""))].weapon_ids.map(weaponID=>{
                return weaponData[weaponID]
            });
            selectedAttackShipType = e.target.dataset.id
            newResultList(weaponDataList, 'attacker', 2, 'ship')
            return
        }
        let select = document.getElementById(selectedAttacker)
        if(e.target.dataset.id?e.target.dataset.id.includes('island1-attacker') :false && e.target.dataset.id !== selectedAttacker) {
            console.log('selecting island weapons');

            select && selectedAttacker ?  
            select.classList.remove('selected'): null;
            document.getElementById(e.target.dataset.id).classList.add('selected');
            
            selectedAttacker = e.target.dataset.id
        }
        if(e.target.dataset.id?e.target.dataset.id.includes('ship2-attacker') :false && e.target.dataset.id !== selectedAttacker) {
            console.log('selecting ship weapons', )
            
            select && selectedAttacker ?  
            select.classList.remove('selected'): null;
            document.getElementById(e.target.dataset.id).classList.add('selected');
            
            selectedAttacker = e.target.dataset.id
        }
    }


    this.addViewEvents('mousedown', selectCard);

    let damageEvents = (e)=>{
        let id = e.target.id;
        if(id = "attacker" || id = "defender"){
            this.openModal(id)
        }
    }

    this.start = ()=>{
            console.log('starting DamageView')
    }
}

function App(id){
    View.call(this, id);
    this.currentPageID = 'menu';
    this.views = {}
    var start = false;
    this.changePage = (pageNum)=>{
        if(pageNum !== this.currentPage){
            this.currentPage = pageNum;
            hideChildElements(viewContainer, pageNum).classList.remove('hidden');
        }
        
    }
    this.hideChildElements = (element, pageNum)=>{
        let childElements = element.children
        for(let i = 0; i < childElements.length ; i++){
            ! childElements[i].classList.contains('hidden') ? childElements[i].classList.add('hidden') : null;
        }
        return childElements[pageNum]
    }
    
    let globalEvents = (e)=>{
        let id = e.target.id;
        console.log(e.target.id)
        if(e.target.id === 'player-menu-btn'){
            this.containers['player-menu'].classList.toggle('hidden');
            return
        }
        
        if(id === 'damage-calculator' && id !== this.currentPageID){
            this.views[this.currentPageID].close();
            this.views.damage.open();
            this.currentPageID = 'damage';
            console.log('clicked damageView')
            return
        }
        // if(id === 'capture-calculator' && id !== this.currentPageID){
        //     this.views[this.currentPageID].close();
        //     this.views.capture.open();
        //     this.currentPageID = 'capture;

        //     console.log('clicked damageView')
        //     return
        // }
        // if(id === 'ship-calculator' && id !== this.currentPageID){
        //     this.views[this.currentPageID].close();
        //     this.views.ship.open();
        //     console.log('clicked damageView')
        //     this.currentPageID = 'ship';

        //     return
        // } 
        if(id === 'menu-btn' && id !== this.currentPageID){
            this.views[this.currentPageID].close();
            this.views.menu.open();
            this.currentPageID = 'menu';
            console.log('clicked damageView')
            return
        } 
    }
    this.start = ()=>{
        if(start){return};
        this.modal = new Modal('player-modal', 'player-menu', this.id);
        this.views.menu =  new View('menu', 'opened');

        this.views.damage = new DamageView('damage', 'damage-modal', 'closed');
        console.log(this.views.damage)
        this.views.damage.start()
        this.setContainer('player-menu');
        this.addViewEvents('mousedown', globalEvents);
        this.startEventQueue();
        start = true
    }
}