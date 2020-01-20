// soon will move damage values to ammo JSON

var weaponData = [
    {
        "name": "Cannon",
        "id": 0,
        "type": "structure_weapon",
        "dmg": {
            "ships": {
                "direct": 1230,
                "splash": 660
            },
            "land": {
                "thatch": {
                    "direct": 3980,
                    "splash": 1980
                },
                "wood": {
                    "direct": 861,
                    "splash": 462
                },
                "stone": {
                    "direct": 380,
                    "splash": 264
                }
            }
        },
        "ammunition-ids": [],
        "reload-time": 4.0,
        "imageSrc": "items/Ship_Cannon.png"
    },
    {
        "name": "Large_Cannon",
        "id": 1,
        "type": "structure_weapon",
        "dmg": {
            "ships": {
                "direct": 1501,
                "splash": 785
            },
            "land": {
                "thatch": {
                    "direct": null,
                    "splash": null
                },
                "wood": {
                    "direct": 1501,
                    "splash": 785
                },
                "stone": {
                    "direct": 663,
                    "splash": 347
                }
            }
        },
        "ammunition-ids": [],
        "reload-time": 7.2,
        "imageSrc": "items/Large_Cannon.png"
    },
    {
        "name": "Torpedo_Launcher",
        "type": "structure_weapon",
        "id": 2,
        "dmg": {
            "ships": {
                "direct": 4950,
                "splash": 3900,
                "close": 900,
                "close-splash": 450
            },
            "land": {
                "thatch": {
                    "direct": null,
                    "splash": null
                },
                "wood": {
                    "direct": 3465,
                    "splash": 2730
                },
                "stone": {
                    "direct": 1531,
                    "splash": 1206
                }
            }
        },
        "ammunition-ids": [],
        "reload-time": null,
        "imageSrc": "items/Torpedo_Launcher.png"
    },
    {
        "name": "Ballista",
        "id": 3,
        "type": "structure_weapon",
        "dmg": {
            "ships": {
                "direct": 187
            },
            "land": {}
        },
        "ammunition-ids": [],
        "reload-time": null,
        "imageSrc": "items/Ballista.png"
    },
    {
        "name": "Mortar",
        "id": 4,
        "type": "structure_weapon",
        "dmg": {},
        "ammunition-ids": [],
        "reload-time": null,
        "imageSrc": null
    },
    {
        "name": "Swivel",
        "id": 5,
        "type": "defensive_weapon",
        "dmg": {},
        "ammunition-ids": [],
        "reload-time": null,
        "imageSrc": null
    },
    {
        "name": "Puckle",
        "id": 6,
        "type": "defensive_weapon",
        "dmg": {},
        "ammunition-ids": [],
        "reload-time": null,
        "imageSrc": null
    }
];