var bestEnchants = {
	"Helmet": [
		"Netherite Helmet",
		"Unbreaking 3",
		"Mending",
		["Protection 4", "Projectile Protection 4", "Blast Protection 4", "Fire Protection 4"],
		"Respiration 3",
		"Aqua Affinity",
		"Thorns 3"
	],
	"Chestplate": [
		"Netherite Chestplate",
		"Unbreaking 3",
		"Mending",
		["Protection 4", "Projectile Protection 4", "Blast Protection 4", "Fire Protection 4"],
		"Thorns 3"
	],
	"Leggings": [
		"Netherite Leggings",
		"Unbreaking 3",
		"Mending",
		["Protection 4", "Projectile Protection 4", "Blast Protection 4", "Fire Protection 4"],
		"Thorns 3"
	],
	"Boots": [
		"Netherite Boots",
		"Unbreaking 3",
		"Mending",
		["Protection 4", "Projectile Protection 4", "Blast Protection 4", "Fire Protection 4"],
		"Feather Falling 4",
		["Depth Strider 3", "Frost Walker 2"],
		"Soul Speed 3",
		"Thorns 3"
	],
	"Sword": [
		"Netherite Sword",
		"Unbreaking 3",
		"Mending",
		["Sharpness 5", "Smite 5", "Bane of Arthropods 5"],
		"Sweeping Edge 3",
		"Looting 3",
		"Fire Aspect 2",
		"Knockback 2"
	],
	"Axe": [
		"Netherite Axe",
		"Unbreaking 3",
		"Mending",
		"Efficiency 5",
		["Sharpness 5", "Smite 5", "Bane of Arthropods 5"],
		["Silk Touch", "Fortune 3"]
	],
	"Bow": [
		"Bow",
		"Unbreaking 3",
		["Infinity", "Mending"],
		"Power 5",
		"Flame",
		"Punch 2",
	],
	"Crossbow": [
		"Crossbow",
		"Unbreaking 3",
		"Mending",
		"Quick Charge 3",
		["Multishot", "Piercing 4"]
	],
	"Trident": [
		"Trident",
		"Mending",
		"Unbreaking 3",
		["Loyalty 3", "Riptide 3"],
		"Channeling",
		"Impaling 5"
	],
	"Pickaxe": [
		"Netherite Pickaxe",
		"Unbreaking 3",
		"Mending",
		"Efficiency 5",
		["Silk Touch", "Fortune 3"]
	],
	"Shovel": [
		"Netherite Shovel",
		"Unbreaking 3",
		"Mending",
		"Efficiency 5",
		["Silk Touch", "Fortune 3"]
	],
	"Hoe": [
		"Netherite Hoe",
		"Unbreaking 3",
		"Mending",
		"Efficiency 5",
		["Silk Touch", "Fortune 3"]
	],
	"Fishing Rod": [
		"Fishing Rod",
		"Unbreaking 3",
		"Mending",
		"Luck of the Sea 3",
		"Lure 3"
	],
	"Shears": [
		"Shears",
		"Unbreaking 3",
		"Mending",
		"Efficiency 5"
	],
	"Flint and Steel": [
		"Flint and Steel",
		"Unbreaking 3",
		"Mending"
	],
	"Shield": [
		"Shield",
		"Unbreaking 3",
		"Mending"
	],
	"Carrot on a Stick": [
		"Carrot on a Stick",
		"Unbreaking 3",
		"Mending"
	],
	"Warped Fungus": [
		"Warped Fungus on a Stick",
		"Unbreaking 3",
		"Mending"
	],
	"Elytra": [
		"Elytra",
		"Unbreaking 3",
		"Mending"
	]
}
var romanNumerals = ["0", "I", "II", "III", "IV", "V"]
var bookCost = {
	"Protection": 1,
	"Fire Protection": 1,
	"Feather Falling": 1,
	"Blast Protection": 2,
	"Projectile Protection": 1,
	"Thorns": 4,
	"Respiration": 2,
	"Depth Strider": 2,
	"Aqua Affinity": 2,
	"Sharpness": 1,
	"Smite": 1,
	"Bane of Arthropods": 1,
	"Knockback": 1,
	"Fire Aspect": 2,
	"Looting": 2,
	"Efficiency": 1,
	"Silk Touch": 4,
	"Unbreaking": 1,
	"Fortune": 2,
	"Power": 1,
	"Punch": 2,
	"Flame": 2,
	"Infinity": 4,
	"Luck of the Sea": 2,
	"Lure": 2,
	"Frost Walker": 2,
	"Mending": 2,
	"Curse of Binding": 4,
	"Curse of Vanishing": 4,
	"Impaling": 2,
	"Riptide": 2,
	"Loyalty": 1,
	"Channeling": 4,
	"Multishot": 2,
	"Piercing": 1,
	"Quick Charge": 1,
	"Soul Speed": 4,
	"Sweeping Edge": 2
}
var items = {
	"Netherite Helmet": {
		pos: 0,
		description: {
			text: "\nWhen on Head:",
			effect: "+3 Armor\n+3 Armor Toughness\n+1 Knockback Resistance",
			color: "5454fc",
			shadow: "15153e"
		}
	},
	"Netherite Chestplate": {
		pos: 1,
		description: {
			text: "\nWhen on Body:",
			effect: "+8 Armor\n+3 Armor Toughness\n+1 Knockback Resistance",
			color: "5454fc",
			shadow: "15153e"
		}
	},
	"Netherite Leggings": {
		pos: 2,
		description: {
			text: "\nWhen on Legs:",
			effect: "+6 Armor\n+3 Armor Toughness\n+1 Knockback Resistance",
			color: "5454fc",
			shadow: "15153e"
		}
	},
	"Netherite Boots": {
		pos: 3,
		description: {
			text: "\nWhen on Feet:",
			effect: "+3 Armor\n+3 Armor Toughness\n+1 Knockback Resistance",
			color: "5454fc",
			shadow: "15153e"
		}
	},
	"Netherite Sword": {
		pos: 4,
		description: {
			text: "\nWhen in Main Hand:",
			effect: "8 Attack Damage\n1.6 Attack Speed",
			color: "00a800",
			shadow: "002900"
		}
	},
	"Netherite Pickaxe": {
		pos: 5,
		description: {
			text: "\nWhen in Main Hand:",
			effect: "6 Attack Damage\n1.2 Attack Speed",
			color: "00a800",
			shadow: "002900"
		}
	},
	"Netherite Axe": {
		pos: 6,
		description: {
			text: "\nWhen in Main Hand:",
			effect: "10 Attack Damage\n1 Attack Speed",
			color: "00a800",
			shadow: "002900"
		}
	},
	"Netherite Shovel": {
		pos: 7,
		description: {
			text: "\nWhen in Main Hand:",
			effect: "6.5 Attack Damage\n1 Attack Speed",
			color: "00a800",
			shadow: "002900"
		}
	},
	"Netherite Hoe": {
		pos: 8,
		description: {
			text: "\nWhen in Main Hand:",
			effect: "1 Attack Damage\n4 Attack Speed",
			color: "00a800",
			shadow: "002900"
		}
	},
	"Fishing Rod": {
		pos: 9
	},
	"Carrot on a Stick": {
		pos: 10
	},
	"Warped Fungus on a Stick": {
		pos: 11
	},
	"Bow": {
		pos: 12
	},
	"Crossbow": {
		pos: 13
	},
	"Flint and Steel": {
		pos: 14
	},
	"Shears": {
		pos: 15
	},
	"Elytra": {
		pos: 16,
		rarity: "uncommon"
	},
	"Trident": {
		pos: 17,
		description: {
			text: "\nWhen in Main Hand:",
			effect: "9 Attack Damage\n1.1 Attack Speed",
			color: "00a800",
			shadow: "002900"
		}
	},
	"Enchanted Book": {
		pos: 18,
		rarity: "uncommon"
	},
	"Shield": {
		pos: 19
	},
}
