<template>
    <div>
        <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <span >Goods</span>
            </nav>
        </div>
        </div>
        <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click='pricetoggle'>Price 
                <i :class="[{'icon-arrow-down2':iconflag},{'icon-arrow-up2':!iconflag}]"></i>
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="togglepic">Filter by</a>
            </div>
            <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':toggleslide}">
                <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" :class="{'cur':flag=='all'}" @click="piccur('all')">All</a></dd>
                <dd v-for='(item,index) in priceFilter' :key='index' >
                    <a href="javascript:void(0)" 
                    :class="{'cur':index==flag}"
                    @click='piccur(index)'
                    >
                    {{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
                </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
                <div class="accessory-list col-4">
                <ul>
                    <li v-for='(item,index) in goodlist' :key='index'>
                    <div class="pic">
                        <a href="javascript:;"><img v-lazy="'static/img/'+item.prodcutImg" alt=""></a>
                    </div>
                    <div class="main">
                        <div class="name">{{item.productName}}</div>
                        <div class="price">{{item.prodcutPrice}}</div>
                        <div class="btn-area">
                        <div class="btn btn--m" 
                        @click="addcarbtn(item)"
                        >
                            加入购物车
                        </div>
                        <!-- <router-link
                        to='/shopcar'
                        class="btn btn--m" 
                        @click="addcarbtn(item)" 
                        >
                        加入购物车
                        </router-link> -->
                        </div>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
    </div>
</template>
<script>
import '../../assets/css/product.css'
import '../../assets/css/font.css'
import {mapMutations} from 'vuex'
    export default{
        data(){
            return{
                goodlist:[],
                flag:'all',
                toggleslide:false,
                overLayFlag:false,
                iconflag:true,
                pricedownup:1,
                priceFilter:[
                  {
                      startPrice:'0.00',
                      endPrice:'100.00'
                  },
                  {
                    startPrice:'100.00',
                    endPrice:'500.00'
                  },
                  {
                    startPrice:'500.00',
                    endPrice:'1000.00'
                  },
                  {
                    startPrice:'1000.00',
                    endPrice:'5000.00'
                  }
                ],
            }
        },
        created(){
            this.getList()
        },
        methods:{
            getList(){
                this.$http.get('/goods').then(res=>{
                    console.log(res)
                    if(res.status==200){
                        this.goodlist = res.data
                    }
                })
            },
            // 价格筛选
            piccur(index){
                this.flag = index
                this.toggleslide = false
                this.overLayFlag = false
            },
            pricetoggle(){
                this.iconflag = !this.iconflag
                // 价格升降序
                this.pricedownup = this.iconflag==true?1:2
                console.log(this.pricedownup)
            },
            togglepic(){
                this.toggleslide = true
                this.overLayFlag = true
            },
            closePop(){
                this.toggleslide = false
                this.overLayFlag = false
            },
            //加入购物车
            addcarbtn(item){
                console.log(123)
                this.addcar(item)   
                this.$router.push('/shopcar')

                
            },
            ...mapMutations(['addcar'])
        }
    }
</script>
