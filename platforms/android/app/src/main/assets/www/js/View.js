var findID = (id)=>{
        let element = document.getElementById(id);
        if(element){return element}
        console.error(`${id} not found !`)
        return false
}

var clearEventQueue = (events, target)=>{
    if(events){
        events.forEach(([type, oldFunction])=>{
            target.removeEventListener(type, oldFunction)
        })
    }
    return target
}

HTMLDivElement.prototype.show = function(){
    this.classList.contains('hidden') ? this.classList.remove('hidden'): null
}
HTMLDivElement.prototype.hide = function(){
    !this.classList.contains('hidden') ? this.classList.add('hidden') : null
}
HTMLDivElement.prototype.select = function(){
    !this.classList.contains('selected') ? this.classList.add('selected'): null
}
HTMLDivElement.prototype.deselect = function(){
    this.classList.contains('selected') ? this.classList.remove('selected'): null
}

var newEventQueue = (events, target)=>{
    let types = []
        Object.entries(events).forEach(([type, functionObject])=> {
            let newFunction = (e)=>{
                Object.values(functionObject).forEach((currentFunction)=>{
                    currentFunction(e);
                })
            }
            types.push([type,newFunction])
            target.addEventListener(type, newFunction)
        });
        return types
}
console.dir(document.getElementById('attackHTML'))
var newItemCard = (name, id, imageSrc, categoryName, type, variables)=>{
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
    overlayBtn.setAttribute('data-parentID', newID);

    itemCard.classList.add(`${categoryName}-card`);
    itemCard.classList.add(`item-card`);
    itemCard.setAttribute('id', newID)

    newID === variables.selectedAttackShipType ||
    newID === variables.selectedAttackType     ||
    newID === variables.selectedAttacker //    ||
    // newID === selectedDefendType  ||
    // newID === selectedDefendShipType 
    ? itemCard.select(): null
    
    itemCard.appendChild(overlayBtn);
    itemCard.appendChild(itemImg);
    itemCard.appendChild(itemText);
    
    return itemCard;
}

function View(id, status){
    this.containers = {};
    this.viewEvents = {};
    this.modal = null;
    this.currentEventQueue;
    this.id = id;
    this.view = null;
    this.status = status;

    
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
            this.modal = this.modal.hide()
            return console.log('closedModal')
        }
        return console.error('modal doesntExist')
    }
    this.open = ()=>{
        this.view.show()
        console.dir(this.view.classList)

        this.status = 'opened'
    }
    this.close = ()=>{
        this.view.hide()
        this.status = 'closed'
    }
    this.startEventQueue = ()=>{
        getViewElement();
        this.view = clearEventQueue(this.currentEventQueue, this.view);        
        this.currentEventQueue = newEventQueue(this.viewEvents, this.view);
    }
}

function Modal(name ,id, viewID){
    

    this.containers = {};
    this.modalEvents = {};
    this.modal = findID(id);

    this.name = name;
    this.id = id;
    this.viewID = viewID;
    this.currentEventQueue = null;


    this.open = ()=>{
        this.modal.show()
    }
    this.close = ()=>{
        this.modal.hide()
    }
    this.addModalEvents = (type,addFunction)=>{
        console.log(addFunction)
        if(!this.modal){return console.error('no modal!')}
        if(this.modalEvents[type]=== undefined){this.modalEvents[type]={}};
        this.modalEvents[type][addFunction.name]=addFunction;
        console.log('addedEventFuntion',addFunction)
    }
    this.removeModalEvents = (type, removeFunction)=>{
        if(!this.modal){return console.error('no modal!')}
        if(this.modalEvents[type][removeFunction.name]=== null){return};
        delete this.modalEvents[type][removeFunction.name];
        console.log('removedEventFuntion',removeFunction)
    }
    this.startEventQueue = ()=>{
        clearEventQueue(this.currentEventQueue, this.modal)
        this.currentEventQueue = newEventQueue(this.modalEvents, this.modal);
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

}

function DamageModal(name, id, viewID){
    Modal.call(this, name, id, viewID);
    this.header = findID('damage-modal-header');
    this.variables = {
        atkModalData : false,
        selectedTab: findID('island-attack-button'),
        selectedAttackShipType : null,
        selectedAttacker : null,
        selectedDefender : null,
        type: null
    }


    this.open = (type)=>{
        this.modal.show()
        this.variables.type = type;
        this.header.innerHTML = type === 'attacker' ? 'Choose Attacker' : 'Choose Defender';
    }
    this.close = ()=>{
        this.modal.hide()
    }

    

    var newResultList = (data, resultLevel, preCategoryName, type)=>{
        let categoryName = preCategoryName + resultLevel.toString();
        // let type = this.variables.type
        let itemContainer = 
        type === 'attacker' ? resultLevel === 1 ? 
        this.containers['type-attack-result1'] :
        this.containers['type-attack-result2'] :
        type === 'defender' ? resultLevel === 1 ?
        this.containers['type-defend-result1'] :
        this.containers['type-defend-result2'] :
        null
        itemContainer.innerHTML = ""
        data.forEach(({name,id,imageSrc})=>{
            itemContainer.appendChild(newItemCard(name, id, imageSrc, categoryName, type, this.variables))
        })
    }

    var changeTab = (page)=>{
        // close current tab
        this.variables.selectedTab.deselect()
        if(this.variables.selectedTab.id === 'ship-attack-button'){
            this.containers['type-attack-result2'].hide()
        }
        // open new tab
        page.select()
        
        this.variables.selectedTab = page;
        this.variables.selectedAttacker = null
        this.variables.selectedAttackShipType = null

        switch(page.id){
            case 'island-attack-button':
                newResultList(weaponData, 1, 'island', 'attacker');
                break;
            case 'ship-attack-button':
                newResultList(shipData, 1, 'ship', 'attacker');
                break;
            case 'player-attack-button':
                newResultList(weaponData, 1, 'player', 'attacker');
                break;
            default: 
                console.log('invalid input');
        }
    }
    
    var selectShip = (shipID)=>{
        let shipCard = findID(shipID);
        let shipDataID = shipID.replace(/[\w]*-/g, "")

        let oldShipCard = this.variables.selectedAttackShipType;
        // console.log(shipID, oldShipCard)

        shipCard.select();
        oldShipCard ? oldShipCard.deselect():null;

        this.variables.selectedAttackShipType = shipCard;
        let weaponDataList = shipData[shipDataID].weapon_ids.map(weaponID=>{
            return weaponData[weaponID]
        })
        newResultList(weaponDataList, 2, 'ship', 'attacker')
        this.containers['type-attack-result2'].show()
    }

    var selectCard = (cardID)=>{
        let weaponCard = findID(cardID);
        let weaponID = cardID.replace(/[\w]*-/g, "");

        let oldWeaponCard = this.variables.selectedAttacker;

        weaponCard.select();
        oldWeaponCard ? oldWeaponCard.deselect():null;

        this.variables.selectedAttacker = weaponCard;
    }
    var damageEvents = (e)=>{
        let id = e.target.id;
        let parentID = e.target.dataset.parentid || "";
            if(id === 'closeDamageModal'){
                this.close()
                return
            }
            if(id.includes('attack-button') && id !== this.variables.selectedTab.id){
                console.log(this.variables.selectedTab)
                changeTab(e.target)
                return
            }
            else 
            if(parentID.includes('ship1-attacker') && parentID !== (this.variables.selectedAttackShipType ? this.variables.selectedAttackShipType.id : false)){
                selectShip(parentID)
            }else 
            if(parentID.includes('attacker') && parentID !== (this.variables.selectedAttacker ? this.variables.selectedAttacker.id : false)){
                selectCard(parentID)
            }

        }
        this.start = ()=>{
            this.setContainer('type-attack-result1')
            this.setContainer('type-attack-result2')
            newResultList(weaponData, 1, 'island', 'attacker');

            // this.setContainer('type-defend-result1')
            // this.setContainer('type-defend-result2')
            this.addModalEvents('mousedown', damageEvents)
            this.startEventQueue()
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
    
    this.setModal = (modalName, modalID)=>{
        console.log('setting modal')
        let element = findID(modalID);
        if(!element){return}
        this.modal = new DamageModal(modalName, modalID)
        return console.log(`modal ${modalName} set`)
    }
    this.setModal('damage-modal', modalID);
    // this.parent = parent;
    var atkModalData = false;
    var selectedAttackType = "island-attack-button";
    var selectedAttackShipType = null;
    var selectedAttacker = null;
    var selectedDefender = null;

    this.openModal = (sideID)=>{
        if(this.modal){
            this.modal.open(sideID)
            return
        }
        return console.error('modal doesntExist')
    }

    let damageEvents = (e)=>{
        let id = e.target.id;
        if(id === "attacker" || id === "defender"){
            this.openModal(id)
        }
    }

    this.start = ()=>{
        console.log('starting DamageView');
        this.addViewEvents('mousedown', damageEvents);
        this.modal.start()
        this.startEventQueue()
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
