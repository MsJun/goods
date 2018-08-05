<template>
 <header class="header">
  <symbol id="icon-cart" viewBox="0 0 38 32">
    <title>cart</title>
    <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
    <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
    <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
  </symbol>
  <div class="navbar">
    <div class="navbar-left-container">
      <a href="/">
        <img class="navbar-brand-logo" src="../assets/logo.png"></a>
    </div>
    <div class="navbar-right-container" style="display: flex;">
      <div class="navbar-menu-container">
        <!--<a href="/" class="navbar-link">我的账户</a>-->
        <span class="navbar-link"></span>
        <span v-show="flagUsername">{{params.username}}</span>
        <a href="javascript:void(0)" class="navbar-link" @click='loginbtn' v-show="!flagUsername">Login</a>
        <a href="javascript:void(0)" class="navbar-link" v-show="flagUsername" @click='logoOut'>Logout</a>
        <div class="navbar-cart-container">
          <span class="navbar-cart-count"></span>
          <a class="navbar-link navbar-cart-link" href="/#/cart">
          <span class="shopcarnum">{{shopcarNum}}</span>
            <svg class="navbar-cart-logo">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
  <my-dialog :isShow='loginlog' @on-close='closelogin'>
    <div class="logindialog">
      <div class="nav">
        <a href="javascript:;" :class="{'act':toggleflag==1}" @click="toggleflag=1">登录</a>
        <a href="javascript:;" :class="{'act':toggleflag==2}" @click="toggleflag=2">注册</a>
      </div>
      <div v-show="toggleflag==1">
         <ul>
          <li>
            <label><span>用户名：</span><input type="text" v-model="params.username"></label>
            <span>{{errorusername.errortext}}</span>
          </li>
          <li>
            <label><span>密码：</span><input type="password" v-model="params.userpw"></label>
            <span>{{errorpw.errortext}}</span>
          </li>
        </ul>
        <p>{{errortext}}</p>
        <a href="javascript:;" class="submitlogin" @click='submitbtn'>登录</a>
      </div>
      <div v-show="toggleflag==2">
        注册组件
      </div>
     
    </div>
  </my-dialog>
</header>
</template>

<script>
import '../assets/css/product.css'
import myDialog from './dialog'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      toggleflag:1,
      loginlog:false,
      flagUsername:false,
      params:{
        username:'',
        userpw:''
      },
      errortext:''
    }
  },
  created(){
    this.logintoggle()
  },
  methods:{
    loginbtn(){
      console.log(1111)
      this.loginlog = true
    },
    closelogin(data){
      this.loginlog = false
    },
    submitbtn(){
      if(!this.params.username||!this.params.userpw){
        this.errortext = '用户名和密码不能为空'
        return
      }
      if(!this.errorusername.state||!this.errorpw.state){
        this.errortext = '用户名或密码不符合'
        return
      }
      this.loginlog = false
      localStorage.setItem('mytoken','shoptoken')
      localStorage.setItem('user',JSON.stringify(this.params))
      this.logintoggle()
    },
    logoOut(){
      this.flagUsername = false
      localStorage.removeItem('mytoken')
    },
    logintoggle(){
      var mytoken = localStorage.getItem('mytoken')
      console.log(mytoken)
      this.flagUsername = mytoken?true:false
      if(this.flagUsernam){
        var cur = JSON.parse(localStorage.getItem('user'))
        this.params = cur
      }
     
    }
    
  },
  computed:{
    ...mapGetters(['shopcarNum']),
    errorusername(){
      let errortext,state
      if(!/^[a-zA-Z0-9_-]{4,16}$/.test(this.params.username)){
          errortext = '请输入4-6位字母,数字,下划线'
          state = false
      }else{
          errortext = ''
          state = true
      }
      if (!this.userFlag) {
          errortext = ''
          this.userFlag = true
      }
      return{
        errortext,
        state
      }
    },
    errorpw(){
      let errortext,state
      if(!/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(this.params.userpw)){
        errortext = '最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'
        state = false
      }else{
        errortext = ''
        state = true
      }
      if(!this.userpw){
        errortext = ''
        this.userpw = true
      }
      return{
        errortext,
        state
      }
    }
  },
 components:{
   myDialog
 }
}
</script>
<style scoped>
.navbar-cart-link{
  position: relative;
}
.shopcarnum{
  position: absolute;
  top:-22px;
  left:9px;
  padding:0 2px;
  height: 20px;
  line-height: 20px;
  border-radius:10px;
  background: red;
  color:#fff
}
.nav{
  width:420px;
  margin: 0 auto 30px; 
  overflow: hidden;
}
.nav a{
  width: 200px;
  height: 40px;
  float: left;
  margin-right:10px;
  text-align: center;
  line-height: 40px;
  border:1px solid #ccc;
}
.nav .act{
  background:#d1434a;
  color:#fff;
  border:none;
}
header{
  padding:0 20px;
  height: 72px;
  line-height: 72px;
  overflow: hidden;
}
.navbar{
  height: 72px;
}
  .navbar-left-container{
    width: 140px;
    height: 70px;
    float: left;
  }
  .navbar-left-container img{
    max-width: 140px;
    height: 70px;
  }
  .navbar-right-container{
    float: right;
  }
  .navbar-cart-container{
    width: 16px;
    height: 16px;
    float: left;
  }
   .navbar-cart-container a{
     width: 16px;
     height: 16px;
   }
    .navbar-cart-container a svg{
     width: 16px;
     height: 16px;
   }
   .logindialog li {
     margin:8px 0;
   }
   .logindialog li label{
     height: 30px;
     line-height: 30px;
   }
   .logindialog li label span{
     width: 100px;
     float: left;
     text-align: right;
   }
   .logindialog li input{
     height: 30px;
     width: 300px;
     line-height: 30px;
   }
   .submitlogin{
     width: 200px;
     height: 40px;
     text-align: center;
     line-height: 40px;
     background:#f40;
     margin:20px auto 0;
     display: block;
     color:#fff;

   }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->

