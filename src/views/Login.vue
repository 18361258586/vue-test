<template>
  <div class="login">
    <div class="loginBox">
      <strong>登陆</strong>
      <p>
        账号：<input type="text" v-model='name' placeholder="请输入账号">
      </p>
      <p> 
        密码：<input type="password" v-model='pass' placeholder="请输入密码">
      </p>
      <button @click="login">登陆</button>
      <div class="line"> 
        WELCOME ！
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import axios from '@/utils/request.ts';

@Component({})
export default class extends Vue {
    
    private name = ''  
    private pass = ''

    login(){
        axios.post("api/login",{
          username:this.name,
          password:this.pass
        }).then(res => {
          // console.log(res)
          if(res.code == '200'){
            // this.data = res.data;
            localStorage.setItem("token",res.data.token);
            this.$router.push("/home");
          }else{
            this.$message({
              showClose: true,
              message: '账号或密码不正确',
              type: 'error'
            });
          }
        })
    }

}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100vh;
  background: rgb(79, 0, 3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginBox{
    text-align: left;
    width: 580px;
    height: 400px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
    position: relative;
    .line{
      position: absolute;
      top: -20px;
      right: -10px;
      width: 260px;
      height: 450px;
      text-align: right;
      padding-right: 20px;
      line-height: 450px;
      box-sizing: border-box;
      font-size: 24px;
      border-radius: 10px;
      background-color: rgb(157, 21, 26);
      box-shadow: 0 0 4px #ccc;
      border-bottom-left-radius: 60%;
    }
    strong{
      padding-top: 50px;
      display: block;
      padding-left: 100px;
      text-align: left;
      color: rgb(157, 21, 26);
      font-size: 24px;
    }
    input{
      width: 210px;
      margin-top: 30px;
      line-height: 40px;
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #666;
      /* placeholder字体大小  */
      font-size: 16px;
      /* placeholder位置  */
      // text-align: right;
    }
    button{
      margin-top: 50px;
      margin-left: 50px;
      width: 120px;
      background-color: rgb(157, 21, 26);
      color: white;
      line-height: 40px;
      outline: none;
      border: 0;
      border-radius: 40px;
      cursor: pointer;
    }
  }
}
</style>
