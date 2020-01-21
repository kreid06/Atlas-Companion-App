const newItemCard = (name, id, imageSrc, categoryName, type, variables)=>{
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

const convertElementID = (id)=>{
    return parseInt(id.replace(/[\w]*-/g, ""));
}

const findID = (id)=>{
        let element = document.getElementById(id);
        if(element){return element}
        console.error(`${id} not found !`)
        return false
}

const clearEventQueue = (events, target)=>{
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
HTMLImageElement.prototype.show = function(){
    this.classList.contains('hidden') ? this.classList.remove('hidden'): null
}
HTMLImageElement.prototype.hide = function(){
    !this.classList.contains('hidden') ? this.classList.add('hidden') : null
}
HTMLDivElement.prototype.select = function(){
    !this.classList.contains('selected') ? this.classList.add('selected'): null
}
HTMLDivElement.prototype.deselect = function(){
    this.classList.contains('selected') ? this.classList.remove('selected'): null
}
HTMLDivElement.prototype.selection = function(){
    !this.classList.contains('selection') ? this.classList.add('selection'): null
}
HTMLDivElement.prototype.deselection = function(){
    this.classList.contains('selection') ? this.classList.remove('selection'): null
}

const newEventQueue = (events, target)=>{
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

function Modal(name ,id, parentView){
    

    this.containers = {};
    this.modalEvents = {};
    this.modal = findID(id);

    this.name = name;
    this.id = id;
    this.parentView = parentView;
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

function DamageModal(name, id, parentView){
    Modal.call(this, name, id, parentView);
    this.header = findID('damage-modal-header');
    this.type = null
    this.variables = {
        selectedAttackShipType : null,
        selectedAttacker : null,
        selectedDefender : null,
        selectedTab : findID('island-attack-button')
    }

    this.open = (type)=>{
        this.modal.show()
        this.type = type;
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

        let cardContainer = this.containers['attack-selection-1'];
        let cardSelection = cardContainer.children

        switch(page.id){
            case 'island-attack-button':
                cardSelection[0].setAttribute('src', `./img/island.png`)
                cardSelection[1].innerHTML = 'island'
                newResultList(weaponData, 1, 'island', 'attacker');
                break;
            case 'ship-attack-button':
                cardSelection[0].setAttribute('src', `./img/pirate-ship.png`)
                cardSelection[1].innerHTML = 'ship'
                newResultList(shipData, 1, 'ship', 'attacker');
                break;
            case 'player-attack-button':
                cardSelection[0].setAttribute('src', `./img/pirate-skull.png`)
                cardSelection[1].innerHTML = 'pirate'
                newResultList(weaponData, 1, 'player', 'attacker');
                break;
            default: 
                console.log('invalid input');
        }
    }
    
    var selectShip = (shipID)=>{
        let shipCard = findID(shipID);
        let shipDataID = convertElementID(shipID); 
        let oldShipCard = this.variables.selectedAttackShipType;
        let ship = shipData[shipDataID]
        let cardContainer = this.containers['attack-selection-1'];
        let cardSelection = cardContainer.children

        // console.log(shipID, oldShipCard)

        cardSelection[0].setAttribute('src', `./img/${ship.imageSrc}`)
        cardSelection[1].innerHTML = ship.name
        
        shipCard.select();
        oldShipCard ? oldShipCard.deselect():null;

        this.variables.selectedAttackShipType = shipCard;
        let weaponDataList = ship.weapon_ids.map(weaponID=>{
            return weaponData[weaponID]
        })
        newResultList(weaponDataList, 2, 'ship', 'attacker')
        this.containers['type-attack-result2'].show()
    }

    var selectWeaponCard = (cardID)=>{
        let weaponCard = findID(cardID);
        let weaponID = convertElementID(cardID);
        let cardContainer = this.containers['attack-selection-2'];
        let cardSelection = cardContainer.children
        let {imageSrc, name} = weaponData[weaponID];

        console.log(cardSelection)

        let oldWeaponCard = this.variables.selectedAttacker;

        weaponCard.select();
        oldWeaponCard ? oldWeaponCard.deselect():null;
        cardContainer.show()
        cardSelection[0].setAttribute('src', `./img/${imageSrc?imageSrc:'close.png'}`)
        cardSelection[1].innerHTML = name.replace(/_/g, " ")
       
        this.variables.selectedAttacker = weaponCard;
    }
    var damageEvents = (e)=>{
        let id = e.target.id;
        let parentID = e.target.dataset.parentid || "";
            if(id === 'closeDamageModal'){
                this.close()
            }
            else
            if(id==="damage-confirm-button"){
                this.parentView.updateVariables(this.variables)
                this.close()
            }
            else
            if(id.includes('attack-button') && id !== this.variables.selectedTab.id){
                // console.log(this.selectedTab)
                changeTab(e.target)
            }
            else 
            if(parentID.includes('ship1-attacker') && parentID !== (this.variables.selectedAttackShipType ? this.variables.selectedAttackShipType.id : false)){
                selectShip(parentID)
            }
            else 
            if(parentID.includes('attacker') && parentID !== (this.variables.selectedAttacker ? this.variables.selectedAttacker.id : false)){
                selectWeaponCard(parentID)
            }
            
        }
        this.start = ()=>{
            this.setContainer('type-attack-result1')
            this.setContainer('type-attack-result2')
            this.setContainer('attack-selection-1')
            this.setContainer('attack-selection-2')
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
    
    this.variables = {
        selectedAttackShipType : null,
        selectedAttacker : null,
        selectedDefender : null,
        tabSelected: null
    }

    this.setModal = (modalName, modalID)=>{
        console.log('setting modal')
        let element = findID(modalID);
        if(!element){return}
        this.modal = new DamageModal(modalName, modalID, this)
        return console.log(`modal ${modalName} set`)
    }
    this.setModal('damage-modal', modalID);
    // this.parent = parent;
    
    this.updateVariables = (variables)=>{
        this.variables = variables;
        console.log(this.variables, this.containers);
        this.updateView()
    }
    this.updateView = ()=>{
        let attacker = weaponData[convertElementID(this.variables.selectedAttacker.id) ];
        
        let attackerSource = this.variables.selectedAttackShipType ? 
        shipData[convertElementID(this.variables.selectedAttackShipType.id)] :
        this.variables.selectedTab.id.includes('island') ? {name:'island',imageSrc:'island.png'}: {name:'pirate',imageSrc:'pirate-skull.png'};

        console.log(attacker,attackerSource)

        this.containers['attacker'].children['attack-details'].children['attack-details-text'].innerHTML = attacker.name.replace(/_/g, " ")
        this.containers['attacker'].selection()
        this.containers['attacker'].children['attack-image-container'].children['attack-image'].setAttribute('src', `./img/${attacker.imageSrc}`);

        this.containers['attacker-source'].show()
        this.containers['attacker-source'].deselection()
        this.containers['attacker-source'].children['attack-source-details'].children['attack-source-details-text'].innerHTML = attackerSource.name.replace(/_/g, " ")

        if(this.variables.selectedTab.id.includes('ship')){
            this.containers['attacker-source'].selection()
        }
        this.containers['attacker-source'].children['attack-source-image-container'].children['attack-source-image'].setAttribute('src', `./img/${attackerSource.imageSrc}`);
    }

    this.openModal = (sideID)=>{
        if(this.modal){
            this.modal.open(sideID)
            return
        }
        return console.error('modal doesntExist')
    }

    let damageEvents = (e)=>{
        let id = e.target.dataset.id;
        if(id === "attacker" || id === "defender"){
            this.openModal(id)
        }
    }

    this.start = ()=>{
        console.log('starting DamageView');
        this.setContainer('attacker')
        this.setContainer('attacker-source')
        this.setContainer('defender')
        this.setContainer('defender-source')
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
