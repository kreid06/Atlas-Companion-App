/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// var damageSources = [
//     {id: 0, name:`Human_Punch`, type:`human-fist`, species:`human`, attacks:[{name:`Left/Right hook`, baseDmg:11, atkSpd:.667, torpor:17},{name:`Jab`, baseDmg:5, atkSpd:1.0, torpor:9}, {name:`low-blow`, baseDmg:2, atkSpeed:.5667, torpor:4}, {name:`overhead-smash`, baseDmg:16, atkSpd:.6, torpor:25}]},
//     {id: 1, name:`Brass_Punch`, type:`human-fist`, species:`human`, attacks:[{name:`Left/Right hook`, baseDmg:24, atkSpd:.667, torpor:null},{name:`Jab`, baseDmg:12, atkSpd:1.0, torpor:null}, {name:`low-blow`, baseDmg:4, atkSpeed:.5667, torpor:null}, {name:`overhead-smash`, baseDmg:36, atkSpd:.6, torpor:null}]},
// ]

//melee to torpor rate 1.64
//planks start leaking at 25% hp
//54% reduxtion while fully anchored

//all data will be coming from a server eventually

//barshot 2178 to sails



        console.log('its working')





var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        let app = new App('app', 'opened');
        app.start()
        

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();