<template>
  <div class="home">
    <!-- 头部按钮 -->
    <!-- <div class="homeTop">
      <button>开始采集</button>
      <button>结束采集</button>
    </div> -->
    
    <!-- 内容列表 -->
    <div class="homeContent">
      <p>
        <span>时间</span>
        <span>区名</span>
        <span>游戏名</span>
        <span>押注</span>
        <span>下注金额</span>
        <span>关注</span>
      </p>
      <ul>
        <li v-for="item in data" :key="item.id">
          <span>{{item.startTime}}</span>
          <span>{{item.gameId}}</span>
          <span>{{item.gameName}}</span>
          <span>{{item.status}}</span>
          <span>{{item.statusSun}}</span>
          <span>关注</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import axios from '@/utils/request.ts';
// import axios from '@/plugin/https.ts';
@Component({
  // components: {
  //   HelloWorld,
  // },
})
export default class extends Vue {
    
    private state = 1 // 状态
    private List = null  // 列表
    private data = []

    created(){

    }

    mounted () {
      axios.post("api/status").then(res => {
        // console.log(res)
        if(res.code == '200'){
          if(res.data.statusId == 0){
            setInterval(()=>{
              this.init()
            },1500)
          }else{
            this.init()
          }
        }
      })
      
    }

    init(){
        this.List = null;
        axios.post("api/now").then(res => {
          // console.log(res)
          if(res.code == '200'){
            this.data = res.data;
          }
        })
        // console.log("111")
    }

}
</script>

<style lang="scss" scoped>
.homeTop{
  padding: 22px;
  height: 42px;
  button{
    width: 175px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    float: right;
    border: 0;
    outline: none;
    color: white;
    background-color: rgb(0, 108, 255);
    border-radius: 5px;
  }
  button:last-child{
    background-color: rgb(157, 21, 26);
    margin-right: 35px;
  }
}
.homeContent{
  padding: 0 60px 0 30px;
  span{
    display: inline-block;
    width: calc(100% / 6);
  }
  p{
    line-height: 70px;
    color: #000;
    background: rgb(224, 224, 224);
  }
  ul{
    width: 100%;
    padding: 0;
    list-style: none;
    li{
      line-height: 60px;
      color: #000;
      border-bottom: 1px solid #ccc;
      // span:nth-of-type(1){
      //   width: calc(100% / 6);
      // }
    }
  }
}
</style>