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
        "Quest Item",
        "Held in Off-hand"
    ],
    slotbak: {
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
        12: "Trinket",
        13: "One-Hand",
        14: "Off Hand",//shield
        15: "Ranged",//bow
        17: "Two-Hand",
        16: "Back",
        18: "Bag",
        19: "Tabard",
        21: "Main Hand",
        22: "Off Hand",//offhand weapon
        23: "Off Hand",//held in offhand
        24: "Projectile",
        25: "Bag",//quiver
        26: "Ranged",//gun/xbow/wand
        28: "Relic"
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
        Common: 1,
        Uncommon: 2,
        Rare: 3,
        Epic: 4,
        Legendary: 5
    },
    byNumber: {
        1: "Common",
        2: "Uncommon",
        3: "Rare",
        4: "Epic",
        5: "Legendary"
    }
};

module.exports = exports;
