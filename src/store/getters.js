const getters = {
	shopcarNum(state){
		let total = 0;
		state.car.forEach(item=>{
			if(item.checked=='1'){
				total+=parseInt(item.productNum)
			}
		})
		return total
	}
}
export default getters