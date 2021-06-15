var dialogInner = document.getElementById("dialog-inner")
var anvilUi = document.getElementById("anvil-ui")
var experienceDiv = document.getElementById("experience")
var menuButtons = document.getElementById("menu-buttons")
var fontAscii
var itemGrid
var costDiv
var textInput
var randomCheckbox
var lastTarget
var regexEnchant = /^(.*?)(?: (\d)$|$)/
var experience = {
	spent: 0,
	goal: 0
}

function fontDraw(text, x, y){
	var div = document.createElement("div")
	div.textContent = text
	div.classList.add("text")
	div.style.left = x + "px"
	div.style.top = y + "px"
}
class ItemGrid{
	constructor(parent){
		this.parent = parent
		this.grid = []
		this.outer = new WeakSet()
		for(var i = 0; i < 9 * 4 + 3; i++){
			var outer = document.createElement("div")
			outer.dataset.index = i
			outer.dataset.item = ""
			outer.classList.add("grid")
			if(i === 36){
				outer.style.left = "52px"
				outer.style.top = "92px"
			}else if(i === 37){
				outer.style.left = "150px"
				outer.style.top = "92px"
			}else if(i === 38){
				outer.style.left = "266px"
				outer.style.top = "92px"
			}else{
				var x = i % 9
				var y = Math.floor(i / 9)
				outer.style.left = (x * 36 + 14) + "px"
				outer.style.top = (y * 36 + 166 + (y > 2 ? 8 : 0)) + "px"
			}
			var inner = document.createElement("div")
			inner.classList.add("inner")
			outer.appendChild(inner)
			this.parent.appendChild(outer)
			this.grid.push({
				inner: inner,
				outer: outer,
				item: null
			})
			this.outer.add(outer)
		}
		this.tooltip = {
			box: document.createElement("div"),
			title: document.createElement("span"),
			description: document.createElement("span")
		}
		this.tooltip.box.classList.add("tooltip")
		this.tooltip.title.classList.add("title")
		this.tooltip.description.classList.add("description")
		this.tooltip.box.appendChild(this.tooltip.title)
		this.tooltip.box.appendChild(this.tooltip.description)
		document.body.appendChild(this.tooltip.box)
		addEventListener("mousedown", this.click.bind(this))
		addEventListener("contextmenu", this.click.bind(this))
		addEventListener("mousemove", this.mousemove.bind(this))
		document.body.addEventListener("keydown", this.keydown.bind(this))
	}
	replaceItem(index, item, enchants, repairCost=0){
		var inner = this.grid[index].inner
		if(item){
			if(!(item in items)){
				return this.replaceItem(index)
			}
			var pos = items[item].pos
			if(item === "Shield"){
				inner.style.backgroundPosition = "-84 0"
				inner.style.backgroundSize = "auto"
			}else{
				var posX = Math.floor(pos / 4) * -34
				var posY = (pos % 4) * -34
				inner.style.backgroundPosition = posX + " " + posY
				inner.style.backgroundSize = ""
			}
			var enchanted = item === "Enchanted Book" || enchants
			inner.classList[enchanted ? "add" : "remove"]("enchanted")
			inner.classList.add("item")
			this.grid[index].outer.dataset.item = item
			this.grid[index].enchants = enchants
			this.grid[index].repairCost = repairCost
		}else{
			inner.style.backgroundPosition = ""
			inner.style.backgroundSize = ""
			inner.classList.remove("enchanted", "item")
			this.grid[index].outer.dataset.item = ""
			this.grid[index].enchants = null
			this.grid[index].repairCost = 0
		}
		this.grid[index].item = item ? item : null
	}
	clearItems(){
		for(var i = 0; i < this.grid.length; i++){
			this.replaceItem(i)
		}
		if(this.movedItem){
			this.movedItem.element.remove()
			this.movedItem = null
		}
		this.creative = false
		experience = {
			spent: 0,
			goal: 0
		}
		this.update()
	}
	mousemove(event){
		var tooltip = this.tooltip.box
		if(this.movedItem){
			this.movedItem.element.style.transform = "translate(" + Math.floor(event.clientX / 2 - 8) * 2 + "px, " + Math.floor(event.clientY / 2 - 8) * 2 + "px)"
		}else{
			if(this.outer.has(event.target)){
				lastTarget = event.target
				var index = event.target.dataset.index
				if(this.grid[index].item){
					this.tooltip.shown = true
					this.setTooltip(this.grid[index])
					tooltip.style.visibility = "visible"
					return
				}
			}else{
				lastTarget = null
				if(!this.tooltip.shown){
					return
				}
			}
		}
		this.tooltip.shown = false
		tooltip.style.visibility = ""
	}
	keydown(event){
		if(!event.repeat && lastTarget && event.key >= 1 && event.key <= 9){
			var source = lastTarget.dataset.index
			var dest = 26 + parseInt(event.key)
			var destObj = {
				item: this.grid[dest].item,
				enchants: this.grid[dest].enchants,
				repairCost: this.grid[dest].repairCost
			}
			if(source == 38){
				if(destObj.item){
					return
				}
				experience.spent += this.getCost()
				this.replaceItem(36)
				this.replaceItem(37)
			}
			this.replaceItem(dest, this.grid[source].item, this.grid[source].enchants, this.grid[source].repairCost)
			this.replaceItem(+source, destObj.item, destObj.enchants, destObj.repairCost)
			this.update()
		}
	}
	setTooltip(grid){
		var item = grid.item
		this.tooltip.title.textContent = item
		this.tooltip.title.style.color = items[item].rarity === "uncommon" ? "#fcfc54" : ""
		this.tooltip.title.style.textShadow = items[item].rarity === "uncommon" ? "0.125em 0.125em 0 #3e3e15;" : ""
		this.tooltip.description.innerText = ""
		if(items[item].description || grid.enchants){
			var description = []
			if(grid.enchants){
				for(var i in grid.enchants){
					var level = grid.enchants[i].level
					if(level && level < romanNumerals.length){
						level = romanNumerals[level]
					}
					var enchantName = grid.enchants[i].name + (level ? (" " + level) : "")
					if(enchantName.startsWith("Curse")){
						var span = document.createElement("span")
						span.textContent = enchantName
						span.style.color = "#fc5454"
						span.style.textShadow = "0.125em 0.125em 0 #3e1515"
						description.push(span)
					}else{
						description.push(document.createTextNode(enchantName))
					}
				}
			}
			if(items[item].description){
				description.push(document.createTextNode(items[item].description.text))
			}
			for(var i = description.length; --i > 0;){
				description.splice(i, 0, document.createElement("br"))
			}
			description.forEach(element => this.tooltip.description.appendChild(element))
			if(items[item].description && items[item].description.effect){
				var div = document.createElement("div")
				div.style.color = "#" + items[item].description.color
				div.style.textShadow = "0.125em 0.125em 0 #" + items[item].description.shadow
				div.textContent = items[item].description.effect
				this.tooltip.description.appendChild(div)
			}
		}
		var x = Math.floor(event.clientX / 2 + 8) * 2
		var y = Math.floor(event.clientY / 2 - 16) * 2
		var h = this.tooltip.box.offsetHeight
		if(y + h > innerHeight - 6){
			y = Math.max(6, innerHeight - 6 - h)
		}
		this.tooltip.box.style.transform = "translate(" + x + "px, " + y + "px)"
	}
	click(event){
		var movedItem = this.movedItem
		var startedMoving = false
		if(this.outer.has(event.target)){
			var index = event.target.dataset.index
			if(movedItem && index == 38){
				return
			}
			if(this.grid[index].item){
				if(event.shiftKey){
					if(index == 38){
						for(var i = this.grid.length; i--;){
							if(!this.grid[i].item){
								this.replaceItem(i, this.grid[index].item, this.grid[index].enchants, this.grid[index].repairCost)
								this.replaceItem(index)
								experience.spent += this.getCost()
								break
							}
						}
					}else if(index == 36 || index == 37){
						for(var i = 0; i < this.grid.length; i++){
							if(!this.grid[i].item){
								this.replaceItem(i, this.grid[index].item, this.grid[index].enchants, this.grid[index].repairCost)
								this.replaceItem(index)
								break
							}
						}
					}else{
						for(var i = 36; i <= 37; i++){
							if(!this.grid[i].item){
								this.replaceItem(i, this.grid[index].item, this.grid[index].enchants, this.grid[index].repairCost)
								this.replaceItem(index)
								break
							}
						}
					}
					this.mousemove(event)
				}else{
					if(index == 38){
						experience.spent += this.getCost()
					}
					var targetInner = this.grid[index].inner
					this.movedItem = {
						element: document.createElement("div"),
						item: this.grid[index].item,
						enchants: this.grid[index].enchants,
						repairCost: this.grid[index].repairCost
					}
					var element = this.movedItem.element
					var inner = document.createElement("div")
					inner.className = targetInner.className
					element.dataset.item = this.grid[index].outer.dataset.item
					inner.style.backgroundPosition = targetInner.style.backgroundPosition
					inner.style.backgroundSize = targetInner.style.backgroundSize
					element.appendChild(inner)
					element.classList.add("grid", "moved-item")
					document.body.appendChild(element)
					this.mousemove(event)
					this.replaceItem(index)
					startedMoving = true
				}
				if(index == 38){
					this.replaceItem(36)
					this.replaceItem(37)
				}
				event.preventDefault()
			}
		}
		if(movedItem && this.outer.has(event.target) && !event.shiftKey){
			var index = event.target.dataset.index
			if(index == 38){
				return this.update()
			}
			this.replaceItem(index, movedItem.item, movedItem.enchants, movedItem.repairCost)
			movedItem.element.remove()
			if(!startedMoving){
				this.movedItem = null
				this.mousemove(event)
				event.preventDefault()
			}
		}
		this.update()
	}
	getCost(){
		var cost = this.grid[36].repairCost + this.grid[37].repairCost
		var enchants = this.grid[37].enchants || []
		for(var i in enchants){
			cost += bookCost[enchants[i].name] * (enchants[i].level || 1)
		}
		return cost
	}
	getGoal(enchants, onlyBooks){
		var books = []
		for(var j in enchants){
			books.push({
				enchants: [enchants[j]],
				repairCost: 0
			})
		}
		var cost = 0
		var finalEnchants = []
		var toolRepairCost = 0
		if(onlyBooks){
			finalEnchants = finalEnchants.concat(books[0].enchants)
			books.shift()
		}
		while(books.length){
			var length = books.length
			var otherIndex = 0
			for(var j = 0; j < length - otherIndex; j++){
				var otherBook = books[j]
				var currentCost = 0
				if(j === 0 || j === 1 && length % 2 === 0 || length <= 3){
					currentCost += toolRepairCost + books[j].repairCost
					toolRepairCost = (toolRepairCost << 1) + 1
					finalEnchants = finalEnchants.concat(books[j].enchants)
				}else{
					var currentBook = books[j]
					if(length <= 8){
						otherBook = books[length - ++otherIndex]
					}else{
						otherBook = books[++j]
					}
					books.push({
						enchants: currentBook.enchants.concat(otherBook.enchants),
						repairCost: (Math.max(currentBook.repairCost, otherBook.repairCosts) << 1) + 1
					})
					currentCost += currentBook.repairCost + otherBook.repairCost
				}
				for(var k in otherBook.enchants){
					currentCost += bookCost[otherBook.enchants[k].name] * (otherBook.enchants[k].level || 1)
				}
				if(currentCost > 39 && !this.creative){
					cost += Infinity
					books = []
					length = 0
					break
				}else{
					cost += currentCost
				}
			}
			for(var j = 0; j < length; j++){
				books.shift()
			}
		}
		return cost
	}
	update(){
		experienceDiv.textContent = ""
		experienceDiv.appendChild(document.createTextNode("XP Spent: "))
		var span = document.createElement("span")
		span.textContent = experience.spent
		experienceDiv.appendChild(span)
		experienceDiv.appendChild(document.createTextNode(", XP Goal: "))
		var span = document.createElement("span")
		span.textContent = experience.goal === Infinity ? "Too Expensive!" : experience.goal
		experienceDiv.appendChild(span)
		this.parent.classList[this.grid[36].item ? "add" : "remove"]("rename")
		var enchanting = this.grid[36].item && this.grid[37].item === "Enchanted Book"
		this.parent.classList[!this.grid[36].item && !this.grid[37].item || enchanting ? "remove" : "add"]("cross")
		var itemName = this.grid[36].item || ""
		if(textInput.textContent !== itemName){
			textInput.textContent = itemName
		}
		var expensive = this.grid[36].repairCost > 39 || enchanting && this.getCost() > 39
		if(!this.creative && expensive){
			this.replaceItem(38)
			this.parent.classList.add("cross")
			var costText = "Too Expensive!"
			if(costDiv.textContent !== costText){
				costDiv.textContent = costText
			}
			costDiv.classList.add("expensive")
			costDiv.style.display = "block"
		}else if(enchanting){
			var enchants = (this.grid[36].enchants || []).concat(this.grid[37].enchants || [])
			var repairCost = Math.max(this.grid[36].repairCost, this.grid[37].repairCost)
			this.replaceItem(38, this.grid[36].item, enchants, (repairCost << 1) + 1)
			var costText = "Enchantment Cost: " + this.getCost()
			if(costDiv.textContent !== costText){
				costDiv.textContent = costText
			}
			costDiv.classList[expensive ? "add" : "remove"]("expensive")
			costDiv.style.display = "block"
		}else{
			this.replaceItem(38)
			costDiv.style.display = ""
		}
	}
}

(() => {
	costDiv = document.createElement("div")
	costDiv.classList.add("cost")
	anvilUi.appendChild(costDiv)
	textInput = document.createElement("div")
	textInput.classList.add("text-input")
	anvilUi.appendChild(textInput)
	itemGrid = new ItemGrid(anvilUi)
	var label = document.createElement("label")
	randomCheckbox = document.createElement("input")
	randomCheckbox.type = "checkbox"
	label.appendChild(randomCheckbox)
	label.appendChild(document.createTextNode("Randomize"))
	menuButtons.appendChild(label)
	var buttons = []
	for(let i in bestEnchants){
		var btn = {
			name: i,
			callback: event => {
				itemGrid.clearItems()
				itemGrid.creative = i === "Enchanted Book"
				if(bestEnchants[i][0] === null){
					var index = 0
				}else{
					itemGrid.replaceItem(0, bestEnchants[i][0])
					var index = 1
				}
				var enchants = []
				for(var j = 1; j < bestEnchants[i].length; j++){
					var enchantText = bestEnchants[i][j]
					if(Array.isArray(enchantText)){
						// Todo: Let the user choose which incompatible enchants they want to have
						enchantText = enchantText[0]
					}
					var enchantObj = {
						name: enchantText.match(regexEnchant)[1]
					}
					var level = parseInt(enchantText.match(regexEnchant)[2])
					if(level){
						enchantObj.level = level
					}
					enchants.push(enchantObj)
				}
				enchants = enchants.sort((a, b) => bookCost[a.name] * (a.level || 1) < bookCost[b.name] * (b.level || 1) ? 1 : -1)
				experience.goal = itemGrid.getGoal(enchants, index === 0)
				itemGrid.update()
				if(randomCheckbox.checked){
					enchants = enchants.sort(() => Math.random() < 0.5 ? 1 : -1)
				}
				for(var j in enchants){
					itemGrid.replaceItem(index++, "Enchanted Book", [enchants[j]])
				}
			}
		}
		buttons.push(btn)
	}
	for(var i in buttons){
		var btn = document.createElement("button")
		btn.textContent = buttons[i].name
		btn.onclick = buttons[i].callback
		menuButtons.appendChild(btn)
	}
	if(buttons.length){
		buttons[0].callback()
	}
	dialogInner.appendChild(menuButtons)
})()
