const mutations = {
	addcar(state,goods){
		let flag = false
		state.car.some(item=>{
			if(item.productId==goods.productId){
				item.productNum = parseInt(item.productNum)+parseInt(goods.productNum)
				flag = true
				return true
			}
			
		})
		if (!flag) {
			state.car.push(goods)
		}
		localStorage.setItem('shopcar', window.JSON.stringify(state.car))
	},
	updatecar(state,goods){
		state.car.some(item=>{
			if(item.productId==goods.productId){
				console.log(22)
				item.productNum = parseInt(goods.productNum)
				item.checked = goods.checked
				return true
			}
		})
		localStorage.setItem('shopcar', window.JSON.stringify(state.car))
	},
	delFromCart(state,cargoodId){
		state.car.some((item,index)=>{
			if(item.productId==cargoodId){
				console.log('索引'+index)
				var carIndex = state.car.indexOf(item)
				console.log('下标'+carIndex)
				state.car.splice(index, 1)
				return true
			}
		})
		localStorage.setItem('shopcar', window.JSON.stringify(state.car))
	},
	allcheck(state,allflag){
		state.car.forEach(item=>{
			item.checked = allflag?'1':'0'
		})
		localStorage.setItem('shopcar', window.JSON.stringify(state.car))
	}
}
export default mutations