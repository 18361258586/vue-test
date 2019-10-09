<template>
  <div class="search">
    <!-- 头部按钮 -->
    <div class="searchTop">
      <input type="text" v-model="name" placeholder="游戏名搜索">
      <input type="text" v-model="area" placeholder="区号搜索">
      <input type="number" v-model="price" placeholder="下注金额搜索">
      <button @click="init">搜索</button>
    </div>
    
    <!-- 内容列表 -->
    <div class="searchContent">
      <p>
        <span>时间</span>
        <span>区名</span>
        <span>游戏名</span>
        <span>押注</span>
        <span>下注金额</span>
        <span>总金额</span>
        <span>关注</span>
      </p>
      <ul>
        <li v-for="item in List" :key="item.id" :class="{fontRed:item.zhiding == 2}">
          <span>{{item.startTime}}</span>
          <span>{{item.gameId}}</span>
          <span>{{item.gameName}}</span>
          <span>{{item.status}}</span>
          <span>{{item.statusSun}}</span>
          <span>{{item.zongshu}}</span>
          <span v-if="item.zhiding == 1" @click="follow(item.id)">关注</span>
          <span v-if="item.zhiding == 2" @click="followCancle(item.id)">取消关注</span>
        </li>
      </ul>
      <el-pagination
      v-if="paginationShow"
      background
        layout="total,prev, pager, next"
        :total.sync="TotalCount"
        :current-page.sync="currentPage"
        @current-change="page_change"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

import axios from '@/utils/request.ts';
@Component({
  // components: {
  //   HelloWorld,
  // },
})
export default class extends Vue {

    private area = '' 
    private name = '' 
    private price = ''
    private List = []  // 列表
    private TotalCount = null
    private currentPage = 1
    private paginationShow = true;

    created(){

    }

    mounted () {
        this.init();
    }

    init(){
      axios.post("/api/list",{
        pageindex:this.currentPage,
        pagesize:10,
        price:this.price == '' ? 0 : this.price,
        area:this.area,
        name:this.name
      }).then(res => {
        // console.log(res)
        if(res.code == '200'){
          this.List = res.data;
          this.TotalCount = res.total;
          this.currentPage = parseInt(res.pageindex);
          this.$nextTick(function() {
            this.paginationShow = true;
          });
        }
      })
    }

    follow(id){
      axios.post("/api/follow",{
        id:id
      }).then(res => {
        // console.log(res)
        if(res.code == '200'){
          this.init();
          this.$message({
              showClose: true,
              message: '关注成功',
              type: 'success'
          });
        }else{
          this.$message({
              showClose: true,
              message: '关注失败',
              type: 'error'
          });
        }
      })
    }

    followCancle(id){
      axios.post("/api/followCancle",{
        id:id
      }).then(res => {
        if(res.code == '200'){
          this.init();
          this.$message({
              showClose: true,
              message: '取消成功',
              type: 'success'
          });
        }else{
          this.$message({
              showClose: true,
              message: '取消失败',
              type: 'error'
          });
        }
      })
    }

    page_change(val) {
      // console.log(val)
      this.paginationShow = false;
      this.currentPage = val;
      this.init();
      this.$nextTick(function() {
        this.paginationShow = true;
      });
    }

}
</script>

<style lang="scss" scoped>
  .searchTop{
    padding: 22px;
    height: 42px;
    text-align: left;
    display: flex;
    align-items: center;
    input{
      padding: 0 10px;
      width: 175px;
      height: 42px;
      line-height: 42px;
      text-align: left;
      border: 0;
      outline: none;
      color: white;
      border-radius: 5px;
      background-color: rgb(204, 204, 204);
      margin-left: 30px;
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: white;
      /* placeholder字体大小  */
      font-size: 16px;
      /* placeholder位置  */
      // text-align: right;
    }
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    input::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
    button{
      width: 120px;
      line-height: 35px;
      background: #409EFF;
      border: none;
      outline: none;
      color: white;
      border-radius: 20px;
      font-size: 16px;
      margin-left: 40px;
      cursor:pointer;
    }
  }
  .searchContent{
    padding: 0 60px 0 30px;
    span{
      display: inline-block;
      width: calc(100% / 7);
    }
    span:last-child{
      cursor: pointer;
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
  .fontRed{
    color:red !important;
  }
</style>

<style>
.el-pagination{
  text-align: right;
  padding-bottom:20px;
}
</style>