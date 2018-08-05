let car = JSON.parse(localStorage.getItem('shopcar')||'[]')
const state = {
	car:car
}
export default state