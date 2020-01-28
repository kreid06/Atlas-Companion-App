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
    overlayBtn.setAttribute('data-id', newID);

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

const clearEventQueue = (events, view)=>{
    if(events === undefined){
        return view
    }
    let targetView
    console.log(events)
    if(events){
        events.forEach(([type, oldFunction])=>{
            Object.values(functionObject).forEach(({target})=>{
                target.removeEventListener(type, oldFunction)
                targetView = target.id.includes('view') ? target : targetView
            })
        })
    }
    return targetView
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

const newEventQueue = (events)=>{
    let newQueue = {};
    let target;
    let types = []
    Object.values(events).forEach((event)=>{
        let newEvent = Object.assign({}, event)
        target = newEvent.target
        delete newEvent.target
        Object.values(newEvent).forEach(({type, eventFunction})=>{
            target.addEventListener(type, eventFunction)
            types.push([type, eventFunction, target])
        })
    })
    console.log()

    // console.log(Object.entries(events), 'hi')
    //     Object.entries(events).forEach(([type, functionObject])=> {
    //         console.log(functionObject)
    //         let target = functionObject.target
    //         let newFunction = (e)=>{
    //             functionObject.forEach((eventFunction)=>{
    //                 eventFunction(e);
    //             })
    //         }
    //         types.push([type,newFunction])
    //         target.addEventListener(type, newFunction)
            
    //     });
        return types
}
console.dir(document.getElementById('attackHTML'))

function View(id, status){
    this.containers = {};
    this.viewEvents = {};
    this.modal = null;
    this.currentEventQueue;
    this.id = id;
    this.view = findID(this.id);
    this.status = status;

    var getViewElement = ()=>{
        let element = findID(this.id);
        if(!element){return};
        this.view = element
    }

    this.addViewEvents = (type, eventFunction, target)=>{
        if(!this.modal){return console.error('no modal!')}
        if(this.viewEvents[target.id] === undefined){this.viewEvents[target.id]={target}};
        this.viewEvents[target.id][eventFunction.name] = {eventFunction, type} ;
    }
    this.removeViewEvents = (target, removeFunction)=>{
        if(!this.modal){return console.error('no modal!')}
        if(this.viewEvents[target.id][removeFunction.name]=== null){return};
        delete this.viewEvents[target.id][removeFunction.name];
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
        console.log(this.viewEvents)
        getViewElement();
        this.view = clearEventQueue(this.currentEventQueue, this.view);        
        this.currentEventQueue = newEventQueue(this.viewEvents);
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
    this.addModalEvents = (type, addFunction, target)=>{
        console.log(addFunction)
        if(!this.modal){return console.error('no modal!')}
        if(this.modalEvents[target.id]=== undefined){this.modalEvents[target.id]={target}};
        this.modalEvents[target.id][addFunction.name] = {type, eventFunction:addFunction};
        console.log('addedEventFuntion',addFunction, target)
    }
    this.removeModalEvents = (type, removeFunction)=>{
        if(!this.modal){return console.error('no modal!')}
        if(this.modalEvents[type][removeFunction.name]=== null){return};
        delete this.modalEvents[type][removeFunction.name];
        console.log('removedEventFuntion',removeFunction)
    }
    this.startEventQueue = ()=>{
        clearEventQueue(this.currentEventQueue, this.modal)
        this.currentEventQueue = newEventQueue(this.modalEvents);
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
    this.attackReady = false;
    this.defendReady = false;
    this.type = null
    this.variables = {
        selectedAttackShipType : null,
        selectedAttacker : null,
        selectedAttackTab : findID('island-attack-button'),
        selectedDefendShipType : null,
        selectedDefender : null,
        selectedDefendTab : findID('island-defend-button'),
        shipAttackerDamage : 100,
        weaponAttackerDamage : 100,
        shipDefenderResistence : 100,
        structureDefenderDurability: 100

    }

    this.open = (type)=>{
        this.modal.show()
        if(type === 'attacker'){
            this.type = this.containers['attackHTML'];
            this.header.innerHTML =  'Choose Attacker';
            this.type.show()
        }else if(type === 'defender'){
            this.type = this.containers['defendHTML']
            this.header.innerHTML = 'Choose Defender';
            this.type.show()
        }
         
    }
    this.close = ()=>{
        this.modal.hide();
        this.type.hide()
    };

    var modalStatusCheck = (type)=>{
        if(type === 'attack'){
            let modalAttackButton = findID('weapon-confirm-button');
            this.attackReady ?
            modalAttackButton.show():
            modalAttackButton.hide();
        }else if(type === 'defend'){
            let modalDefendButton = findID('defender-confirm-button')
            this.defendReady ?
            modalDefendButton.show():
            modalDefendButton.hide();
        }
    }

    var newResultList = (data, resultLevel, preCategoryName, type)=>{
        let categoryName = preCategoryName + resultLevel.toString();
        // let type = this.variables.type
        let itemContainer = 
        type === 'attacker' ?
        this.containers['type-attack-result1'] :
        type === 'defender' ?
        this.containers['type-defend-result1'] :
        null
        itemContainer.innerHTML = ""
        data.forEach(({name,id,imageSrc})=>{
            itemContainer.appendChild(newItemCard(name, id, imageSrc, categoryName, type, this.variables))
        })
    }

    var clearModalData = ()=>{
        if(this.type.id.includes('attack')){
            this.variables.selectedAttackTab = null;
            this.variables.selectedAttacker = null;
            this.variables.selectedAttackShipType = null;
            console.log(this.containers['attack-selection-1'].children[0])

            this.containers['attack-selection-1'].children[0].children[0].setAttribute('src','')
            this.containers['attack-selection-2'].children[0].children[0].setAttribute('src','')

            this.attackReady = false;
            modalStatusCheck('attack');
        }
        else 
        if(this.type.id.includes('defend')){
            this.variables.selectedDefendTab = null;
            this.variables.selectedDefender = null;
            this.variables.selectedDefendShipType = null;

            this.containers['defend-selection-1'].children[0].children[0].setAttribute('src','')
            this.containers['defend-selection-2'].children[0].children[0].setAttribute('src','')

            this.defendReady = false;
            modalStatusCheck('defend');
        }
    }

    var changeTab = (page)=>{

        if(this.type.id.includes('attack')){
            // close current tab

            this.variables.selectedAttackTab.deselect()
            if(this.variables.selectedAttackTab.id === 'ship-attack-button'){
                this.containers['attacker-ship-image'].setAttribute('src', `./img/pirate-ship.png`)
            }
            // open new tab
            page.select()
            
            clearModalData();
            this.variables.selectedAttackTab = page;

            let cardContainer = this.containers['attack-selection-1'];
            let cardSelection = cardContainer.children[0].children

            switch(page.id){
                case 'island-attack-button':
                    cardSelection[0].setAttribute('src', `./img/island.png`)
                    newResultList(weaponData, 1, 'island', 'attacker');
                    break;
                case 'ship-attack-button':
                    cardSelection[0].setAttribute('src', `./img/pirate-ship.png`)
                    newResultList(shipData, 1, 'ship', 'attacker');
                    break;
                case 'player-attack-button':
                    cardSelection[0].setAttribute('src', `./img/pirate-skull.png`)
                    newResultList(weaponData, 1, 'player', 'attacker');
                    break;
                default: 
                    console.log('invalid input');
            }
        }
        else
        if(this.type.id.includes('defend')) {
            this.variables.selectedDefendTab.deselect()
            if(this.variables.selectedDefendTab.id === 'ship-defend-button'){
                this.containers['defender-ship-image'].setAttribute('src', `./img/pirate-ship.png`)
            }
            // open new tab
            page.select()
            
            clearModalData();
            this.variables.selectedDefendTab = page;

            let cardContainer = this.containers['defend-selection-1'];
            let cardSelection = cardContainer.children[0].children

            switch(page.id){
                case 'island-defend-button':
                    cardSelection[0].setAttribute('src', `./img/island.png`)
                    newResultList(structureData.filter(structure=>{return !structure.category.includes('Ship_Part')}), 1, 'island', 'defender');
                    break;
                case 'ship-defend-button':
                    cardSelection[0].setAttribute('src', `./img/pirate-ship.png`)
                    newResultList(shipData, 1, 'ship', 'defender');
                    break;
                case 'player-defend-button':
                    cardSelection[0].setAttribute('src', `./img/pirate-skull.png`)
                    newResultList(weaponData, 1, 'player', 'defender');
                    break;
                default: 
                    console.log('invalid input');
            }
        }
    }
    
    var selectShip = (shipID)=>{
        let shipCard = findID(shipID);
        let shipDataID = convertElementID(shipID); 
        let oldShipCard = this.variables.selectedAttackShipType;
        let ship = shipData[shipDataID]
        if(this.type.id.includes('attack')){
            let cardContainer = this.containers['attack-selection-1'];
            let cardSelection = cardContainer.children[0].children

            // console.log(shipID, oldShipCard)
            this.containers['attacker-ship-image'].setAttribute('src', `./img/${ship.imageSrc}`)
            cardSelection[0].setAttribute('src', `./img/${ship.imageSrc}`)
            
            shipCard.select();
            oldShipCard ? oldShipCard.deselect():null;

            this.variables.selectedAttackShipType = shipCard;
            let weaponDataList = ship.weapon_ids.map(weaponID=>{
                return weaponData[weaponID]
            })
            newResultList(weaponDataList, 2, 'ship', 'attacker')
            this.attackReady = false;
            modalStatusCheck('attack')
        }
        else
        if(this.type.id.includes('defend')){
            let cardContainer = this.containers['defend-selection-1'];
            let cardSelection = cardContainer.children[0].children
            // console.log(shipID, oldShipCard)
            
            this.containers['defender-ship-image'].setAttribute('src', `./img/${ship.imageSrc}`)
            cardSelection[0].setAttribute('src', `./img/${ship.imageSrc}`)
            
            shipCard.select();
            oldShipCard ? oldShipCard.deselect():null;

            this.variables.selectedDefendShipType = shipCard;
            let structureDataList = ship.ship_part_ids.map(structureID=>{
                return structureData[structureID]
            })
            newResultList(structureDataList, 2, 'ship', 'defender')
            this.defendReady = false;
            modalStatusCheck('defend')
        }
    }

    var selectCard = (cardID)=>{
        let ifAttack = this.type.id.includes('attack')

        let card = findID(cardID);
        let realCardID = convertElementID(cardID);
        let cardContainer = ifAttack ? this.containers['attack-selection-2'] : this.containers['defend-selection-2'];
        let cardSelection = cardContainer.children[0].children
        let {imageSrc = 'close.png', name} = ifAttack ? weaponData[realCardID] : structureData[realCardID];

        console.log(cardSelection)

        let oldCard = ifAttack ? this.variables.selectedAttacker : this.variables.selectedDefender;

        card.select();
        oldCard ? oldCard.deselect():null;
        cardContainer.show()
        cardSelection[0].setAttribute('src', `./img/${imageSrc?imageSrc:'close.png'}`)
        if(ifAttack){
                this.variables.selectedAttacker = card;
                this.attackReady = true
                modalStatusCheck('attack');
        }else{
                this.variables.selectedDefender = card;
                this.defendReady = true
                modalStatusCheck('defend');
        }
        
    }
    var damageEvents = (e)=>{
        let id = e.target.id;
        let parentID = e.target.dataset.id || "";
        console.log(parentID, e.target.id)
        if(id === 'closeDamageModal'){
            this.close()
        }
        else
        if(id==="weapon-confirm-button"){
            this.variables.weaponAttackerDamage = findID('weapon-value-input').value
            this.parentView.updateVariables(this.variables, 'attacker')
            this.close()
        }
        else
        if(parentID.includes('attack-button') && id !== this.variables.selectedAttackTab.id){
            changeTab(e.target.parentNode)
        }
        else 
        if(parentID.includes('ship1-attacker') && parentID !== (this.variables.selectedAttackShipType ? this.variables.selectedAttackShipType.id : false)){
            selectShip(parentID)
        }
        else 
        if(parentID.includes('attacker') && parentID !== (this.variables.selectedAttacker ? this.variables.selectedAttacker.id : false)){
            selectCard(parentID)
        }
        else
        if(id==="defender-confirm-button"){
            this.variables.structureDefenderDurability = findID('structure-value-input').value
            this.parentView.updateVariables(this.variables, 'defender')
            this.close()
        }
        else
        if(parentID.includes('defend-button') && id !== this.variables.selectedDefendTab.id){
            // console.log(this.selectedTab)
            changeTab(e.target.parentNode)
        }
        else 
        if(parentID.includes('ship1-defender') && parentID !== (this.variables.selectedDefendShipType ? this.variables.selectedDefendShipType.id : false)){
            selectShip(parentID)
        }
        else 
        if(parentID.includes('defender') && parentID !== (this.variables.selectedDefender ? this.variables.selectedDefender.id : false)){
            selectCard(parentID)
        }
    }
    var getSelectedValue = ({clientHeight, id, scrollHeight, scrollTop, dataset, children})=>{
        let boxHeight = clientHeight/3
        // let numberofBoxes = Math.round(((scrollHeight- 2*boxHeight)/boxHeight) -1)
        let boxDamage = Math.round(scrollTop/boxHeight) * parseInt(dataset.increment) + 100
        let boxID = `${id}-${boxDamage}`
        let selectedBox = findID(boxID)
        selectedBox.select()
        return boxDamage
    }

    var damageValueEvents = (e)=>{
        let id = e.target.id;
        let typeBoolean = id === "ship-damage-input"
        // console.log(e)
        if(id === "ship-damage-input" || id === "ship-resistance-input"){
            let selectedValueElement = findID(`${id}-${typeBoolean? this.variables.shipAttackerDamage: this.variables.shipDefenderResistence}`)
            selectedValueElement.deselect();
            if(typeBoolean){
                this.variables.shipAttackerDamage = getSelectedValue(e.target)
            }
            else{
                this.variables.shipDefenderResistence = getSelectedValue(e.target)
            }
            
        }
    }
    
        this.start = ()=>{
            this.setContainer('type-attack-result1');
            this.setContainer('attack-selection-1');
            this.setContainer('attack-selection-2');
            this.setContainer('attackHTML');
            this.setContainer('type-defend-result1');
            this.setContainer('defend-selection-1');
            this.setContainer('defend-selection-2');
            this.setContainer('defendHTML');
            this.setContainer('attacker-ship-image')
            this.setContainer('defender-ship-image')
            newResultList(weaponData, 1, 'island', 'attacker');
            newResultList(structureData.filter(struture=>{return struture.category.includes('Structure')||struture.category.includes('Weapon')}), 1, 'island', 'defender')

            // this.setContainer('type-defend-result1')
            // this.setContainer('type-defend-result2')
            this.addModalEvents('mousedown', damageEvents, this.modal)
            this.addModalEvents('scroll', damageValueEvents, findID("ship-damage-input"))
            this.addModalEvents('scroll', damageValueEvents, findID("ship-resistance-input"))
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
    
    this.updateVariables = (variables, type)=>{
        this.variables = variables;
        console.log(this.variables, this.containers);
        this.updateView(type)
    }
    this.updateView = (type)=>{
        if(type === 'attacker' || type === "defender"){
            let shipType;
            let selectedItemType;
            let selectedTabType;
            let selectedSource;
            let selectedTypeValue;
            let selectedSourceValue;

            if(type==="attacker"){
                shipType = this.variables.selectedAttackShipType;
                selectedItemType =  weaponData[convertElementID(this.variables.selectedAttacker.id) ];;
                selectedTabType = this.variables.selectedAttackTab;
                
                selectedSource = this.variables.selectedAttackShipType  
                                ? shipData[convertElementID(this.variables.selectedAttackShipType.id)]
                                : this.variables.selectedAttackTab.id.includes('island') ? {name:'island',imageSrc:'island.png'}: {name:'pirate',imageSrc:'pirate-skull.png'};
                selectedTypeValue = this.variables.weaponAttackerDamage;
                selectedSourceValue =this.variables.shipAttackerDamage
                
            }
            else
            if(type==="defender"){
                shipType = this.variables.selectedDefendShipType;
                selectedItemType = structureData[convertElementID(this.variables.selectedDefender.id) ];;
                selectedTabType = this.variables.selectedDefendTab;
                
                selectedSource = this.variables.selectedDefendShipType  
                                ? shipData[convertElementID(this.variables.selectedDefendShipType.id)]
                                : this.variables.selectedDefendTab.id.includes('island') ? {name:'island',imageSrc:'island.png'}: {name:'pirate',imageSrc:'pirate-skull.png'};
                selectedTypeValue = this.variables.structureDefenderDurability;
                selectedSourceValue =this.variables.shipDefenderResistence
            }
            let newType = type.replace(/er/g, "")
        
            this.containers[`${newType}er`].children[`${newType}-details`].children[`${newType}-details-text`].innerHTML = selectedItemType.name.replace(/_/g, " ")
            this.containers[`${newType}er`].selection()
            this.containers[`${newType}er`].children[`${newType}-image-container`].children[`${newType}-image`].setAttribute('src', `./img/${selectedItemType.imageSrc ? selectedItemType.imageSrc : 'close.png' }`);
            this.containers[`${newType}er`].children[`${newType}-details`].children[`${newType}-details-value`].innerHTML = `${selectedTypeValue}%`

            this.containers[`${newType}er-source`].show()
            this.containers[`${newType}er-source`].deselection()
            this.containers[`${newType}er-source`].children[`${newType}-source-details`].children[`${newType}-source-details-text`].innerHTML = selectedSource.name.replace(/_/g, " ")
    
            if(selectedTabType.id.includes('ship')){
                this.containers[`${newType}er-source`].selection();
                this.containers[`${newType}er-source`].children[`${newType}-source-details`].children[`${newType}-source-details-value`].innerHTML = `${selectedSourceValue}%`
            }
            this.containers[`${newType}er-source`].children[`${newType}-source-image-container`].children[`${newType}-source-image`].setAttribute('src', `./img/${selectedSource.imageSrc}`);
        }
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
        this.addViewEvents('mousedown', damageEvents, this.view);
        this.modal.start()
        this.startEventQueue()
    }
}

function App(id){
    View.call(this, id);
    this.currentPageID = 'menu-view';
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
            console.log(this.views, this.currentPageID)
            this.views[this.currentPageID].close();
            this.views["damage-view"].open();
            this.currentPageID = 'damage-view';
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
            this.views["menu-view"].open();
            this.currentPageID = 'menu-view';
            console.log('clicked damageView')
            return
        } 
    }
    this.start = ()=>{
        if(start){return};
        this.modal = new Modal('player-modal', 'player-menu', this.id);
        this.views["menu-view"] =  new View('menu-view', 'opened');

        this.views["damage-view"] = new DamageView('damage-view', 'damage-modal', 'closed');
        console.log(this.views.damage)
        this.views["damage-view"].start()
        this.setContainer('player-menu');
        this.addViewEvents('mousedown', globalEvents, this.view);
        this.startEventQueue();
        start = true
    }
}
