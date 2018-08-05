<template>
    <div>
         <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <span>GoodsCar</span>
            </nav>
        </div>
        </div>
        <div class="container">
  <div class="cart">
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>My Cart</span></h2>
    </div>
    <div class="item-list-wrap">
      <div class="cart-item">
        <div class="cart-item-head">
          <ul>
            <li>Items</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Subtotal</li>
            <li>Edit</li>
          </ul>
        </div>
        <ul class="cart-item-list">
          <li v-for='(item,index) in shopcarlist' :key=index>
            <div class="cart-tab-1">
              <div class="cart-item-check">
                <a href="javascript:void(0)" 
                :class="['checkbox-btn','item-check-btn',{'check':item.checked=='1'}]"
                @click="editCar('check',item)"
                >
                  <svg class="icon icon-ok">
                    <use xlink:href="#icon-ok"></use>
                  </svg>
                </a>
              </div>
              <div class="cart-item-pic">
                <img v-lazy="'/static/img/'+item.prodcutImg">
              </div>
              <div class="cart-item-title">
                <div class="item-name">{{item.productName}}</div>
              </div>
            </div>
            <div class="cart-tab-2">
              <div class="item-price">{{item.prodcutPrice | currency("$")}}</div>
            </div>
            <div class="cart-tab-3">
              <div class="item-quantity">
                <div class="select-self select-self-open">
                  <div class="select-self-area">
                    <a class="input-sub" @click="editCar('minu',item)">-</a>
                    <span class="select-ipt">{{item.productNum}}</span>
                    <a class="input-add" @click="editCar('add',item)">+</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-tab-4">
              <div class="item-price-total">{{(item.productNum*item.prodcutPrice)|currency('$')}}</div>
            </div>
            <div class="cart-tab-5">
              <div class="cart-item-opration">
                <a href="javascript:void(0)" class="item-edit-btn" @click="delshopcur(item.productId)">
                  删除
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-foot-wrap">
      <div class="cart-foot-inner">
        <div class="cart-foot-l">
          <div class="item-all-check">
            <a href="javascript:void(0)">
                  <span 
                  :class="['checkbox-btn', 'item-check-btn',{'check':flagcheckedAll}]" @click='checkAll'
                  >
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
                  </span>
              <span>Select all</span>
            </a>
          </div>
        </div>
        <div class="cart-foot-r">
          <div class="item-total">
            Item total: <span class="total-price">{{totalPirce | currency("$")}}</span>
          </div>
          <div class="btn-wrap">
            <a :class="['btn','btn--red',{'btn--dis':totalPirce==0}]" @click='address'>Checkout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    <my-dialog :isShow='delshop' @on-close='delcurshop'>
        <div class="dellog">
            <h3>你确认删除这条商品吗？</h3>
            <a href="javascript:void(0)">取消</a>
            <a href="javascript:void(0)" @click='delok'>确认</a>
        </div>
    </my-dialog>
    </div>
</template>
<script>
import myDialog from '../dialog'
// import {currency} from '../../util/currentcy.js'
import {mapState,mapMutations} from 'vuex'
    export default{
        data(){
            return{
                productId:'',
                delproductId:'',
                shopcarlist:[],
                flag:'',
                delshop:false,
                
                
            }
        },
        // filters:{
        //   currency:currency
        // },
        created(){
            this.productId = this.$route.params.productId
            this.getinit()
        },
        computed:{
            // 通过计算属性来判断每一项是否都选中
            flagcheckedAll(){
                return this.shopcarlist.every(item=>{
                    return item.checked=='1'
                })
            },
            // 计算总价
            totalPirce(){
                let money = 0;
                this.shopcarlist.forEach(item=>{
                    if(item.checked=='1'){
                        money+=parseInt(item.productNum)*parseInt(item.prodcutPrice)
                    }
                })
                return money
            },
            ...mapState(['car'])
           
        },
        methods:{
            ...mapMutations(['updatecar','delFromCart','allcheck']),
            getinit(){
                console.log(this.car)
                this.shopcarlist = this.car
                // this.$http.get('/goods').then(res=>{
                //     console.log(res)
                //     if(res.status==200){
                //         this.shopcarlist = res.data
                //     }
                // })
            },
            // 修改当前商品的状态
            //包括：数量的加减，选中状态
            editCar(flag,item){
                if(flag=='minu'){
                    if(item.productNum<=1){
                        return
                    }
                    item.productNum--
                }else if(flag=='add'){
                    item.productNum++
                }else if(flag=='check'){
                    item.checked = item.checked=='1'?'0':'1'
                   
                }
                this.updatecar(item)
                //addcar(item)
                // 发请求
                // 将当前商品的id，改变的数量，选中状态
                // this.$http.post("/users/cartEdit",{
                //   productId:item.productId,
                //   productNum:item.productNum,
                //   checked:item.checked
                // })
                
            },
            delcurshop(){
                this.delshop = false
            },
            // 页面的删除按钮
            delshopcur(productId){
                this.delshop = true
                this.delproductId = productId
            },
            // 弹窗的删除按钮
            delok(){
                this.delshop = false
                console.log(this.delproductId)
                // this.shopcarlist.map((item, i) => {
                //     if (item.productId == this.delproductId) {
                //         console.log(22232)
                //         this.shopcarlist.splice(i, 1);
                        
                //     }
                // });
                this.delFromCart(this.delproductId)
                this.getinit()
                //传入当前商品的id
                // this.$http.post('/user/car/dele',{productId:this.delproductId})
                // .then(res=>{
                //     // 删除数据
                //     // 重新渲染
                //     this.getinit()
                // })
            },
            // 全选
            checkAll(){ 
                console.log(111)
                // 通过变量将当前的是否选中存起来
                let checkAllflag = !this.flagcheckedAll
                this.allcheck(checkAllflag)
                // this.shopcarlist.map(item=>{
                //     item.checked = checkAllflag?'1':'0'
                // })
                // 发起请求
                //将是否全选this.flagcheckedAll的状态值传入
                // this.$http.post('/user/editall',{checkall:this.flagcheckedAll})
                // .then(res=>{

                // })
            },
            address(){
                if(this.totalPirce>0){
                    this.$router.push({path:'/address'})
                }
            }
        },
        components:{
            myDialog
        }
    }
</script>
<style scoped>
.input-sub,.input-add{
      min-width: 40px;
      height: 100%;
      border: 0;
      color: #605F5F;
      text-align: center;
      font-size: 16px;
      overflow: hidden;
      display: inline-block;
      background: #f0f0f0;
    }
    .item-quantity .select-self-area{
      background:none;
      border: 1px solid #f0f0f0;
    }
    .item-quantity .select-self-area .select-ipt{
      display: inline-block;
      padding:0 3px;
      width: 30px;
      min-width: 30px;
      text-align: center;
    }
    .dellog a{
        width: 300px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 10px;
        display: inline-block;
        border:1px solid #f30;
        margin:40px auto 0;
        color:#f30;
    }
</style>


