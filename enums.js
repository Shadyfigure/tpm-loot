var exports = {};

exports.weaponType = {
    array: [
        "Axe",
        "Bow",
        "Crossbow",
        "Dagger",
        "Fishing Pole",
        "Fist Weapon",
        "Gun",
        "Held in Off-hand",
        "Idol",
        "Libram",
        "Mace",
        "Polearm",
        "Shield",
        "Staff",
        "Sword",
        "Thrown",
        "Totem",
        "Wand"
    ]
};

exports.itemSlots = {
    array: [
        "Ammo",
        "Head",
        "Neck",
        "Shoulder",
        "Shirt",
        "Chest",
        "Waist",
        "Legs",
        "Feet",
        "Wrist",
         "Hands",
         "Finger",
         "Trinket",
         "Back",
         "Main Hand",
         "Off Hand",
         "Ranged",
         "Tabard",
         "Bag",
         "Two-Hand",
         "Relic",
         "One-Hand",
         "Pet",
         "Mount",
         "Quest Item"
    ],
    byNumber: {
        0: "Ammo",
        1: "Head",
        2: "Neck",
        3: "Shoulder",
        4: "Shirt",
        5: "Chest",
        6: "Waist",
        7: "Legs",
        8: "Feet",
        9: "Wrist",
        10: "Hands",
        11: "Finger",
        13: "Trinket",
        15: "Back",
        16: "Main Hand",
        17: "Off Hand",
        18: "Ranged",
        19: "Tabard",
        20: "Bag",
        24: "Two-Hand",
        25: "Relic",
        26: "One-Hand",
        27: "Pet",
        28: "Mount",
        29: "Quest Item"
    },
    byName: {
        "Ammo": 0,
        "Head": 1,
        "Neck": 2,
        "Shoulder": 3,
        "Shirt": 4,
        "Chest": 5,
        "Waist": 6,
        "Legs": 7,
        "Feet": 8,
        "Wrist": 9,
        "Hands": 10,
        "Finger": 11,
        "Trinket": 13,
        "Back": 15,
        "Main Hand": 16,
        "Off Hand": 17,
        "Ranged": 18,
        "Tabard": 19,
        "Bag": 20,
        "Two-Hand": 24,
        "Relic": 25,
        "One-Hand": 26,
        "Pet": 27,
        "Mount": 28,
        "Quest Item": 29
    }
};

exports.userRoles = {
    byName: {
        ADMIN: 0,
        LOOT_COUNCIL: 1,
        OFFICER: 2
    },
    byNumber:{
        0: "ADMIN",
        1: "LOOT_COUNCIL",
        2: "OFFICER"
    }
};

exports.contentType = {
    byName: {
        DUNGEON_CONTENT: 0,
        RAID40_CONTENT: 1,
        RAID20_CONTENT: 2,
        WORLD: 3,
        CRAFTED: 4
    },
    byNumber: {
        0: "DUNGEON_CONTENT",
        1: "RAID40_CONTENT",
        2: "RAID20_CONTENT",
        3: "WORLD",
        4: "CRAFTED"
    }
};

exports.instances = {
    byName: {
        "Naxxramas":0,
        "The Temple of Ahn Qiraj":1,
        "The Ruins of Ahn Qiraj":2,
        "Blackwing Lair":3,
        "Zil'Gurub":4,
        "Onyxia":5,
        "Molten Core":6
    },
    byNumber: {
        0: "Naxxramas"
        ,1: "The Temple of Ahn Qiraj"
        ,2: "The Ruins of Ahn Qiraj"
        ,3: "Blackwing Lair"
        ,4: "Zil'Gurub"
        ,5: "Onyxia"
        ,6: "Molten Core"
    },
    fromDB: {
        "Naxxramas": "Naxxramas",
        "TheTempleofAhnQiraj": "The Temple of Ahn Qiraj",
        "TheRuinsofAhnQiraj": "The Ruins of Ahn Qiraj",
        "BlackwingLair": "Blackwing Lair",
        "Zul\'Gurub": "Zul\'Gurub",
        "Onyxia": "Onyxia",
        "MoltenCore": "Molten Core"
    }
};

exports.itemRarityVal = {
    byName: {
        Green: 2,
        Blue: 3,
        Purple: 4,
        Orange: 5
    },
    byNumber: {
        2: "Green",
        3: "Blue",
        4: "Purple",
        5: "Orange"
    }
};

module.exports = exports;
