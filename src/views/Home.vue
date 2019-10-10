<template>
  <div class="home">
    <!-- 头部按钮 -->
    <div class="homeTop">
      <input type="text" v-model="Search">
      <button @click='changeState' v-if="state == 1">开始采集</button>
      <button @click='changeState' v-if="state == 0" class='redButton'>结束采集</button>
    </div>
    
    <!-- 内容列表 -->
    <div class="homeContent">
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
    
    private Search =  null;
    private state = 1 // 状态
    private List = []  // 列表
    private timer = null
    private timerEned = null
    private flag = false

    created(){
      
    }

    mounted () {

      axios.post("api/status").then(res => {
        // console.log(res)
        if(res.code == '200'){

          this.state = res.data.statusId
          if(res.data.statusId == '1' && res.data.status == 'false'){

            // this.init()
            // this.state = 1
            //等待开启

          }else{
            // 开启了,开启定时器，进行持续查询
            // this.state = 0
            // this.init()
            // this.timer = setInterval(()=>{
            //   this.init()
            // },1100)

          }

        }
      })

      // 最新关注的提示
      // this.timerEned = setInterval(()=>{
      //     axios.post("api/status").then(res => {
      //     // console.log(res)
      //     if(res.code == '200'){
      //       this.playSound()
      //       this.state = res.data.statusId
      //       if(res.data.statusId == '1'){
      //         // 有消息
      //         this.playSound()
      //       }else{
      //         clearInterval(this.timerEned)
      //       }
      //     }
      //   })
      // },5000)
    }

    init(){
      // 查询是否在30秒内
      axios.post("api/status").then(res => {
        // console.log(res)
        if(res.code == '200'){
          if(res.data.statusId == '1'){
            // 不再30秒内
            this.flag = false;
          }else{
            if(this.flag == false){
              this.List = []
              this.flag = true;
            }
            // 在
            axios.post("api/now",{
              minNumber:this.Search
            }).then(res => {
              // console.log(res)
              if(res.code == '200'){
                this.List = this.List.concat(res.data);
              }
            })
          }

        }
      })
        // console.log("111")
    }


    changeState(){
      if(this.state == 1){
        // 开始采集
        axios.post("/api/collection",{
          state:this.state
        }).then(res => {
          if(res.code == '200'){
            this.state = 0;
            this.timer = setInterval(()=>{
              this.init()
            },1500)
            this.$message({
              showClose: true,
              message: '启动成功',
              type: 'success'
            });
          }else{
            this.$message({
              showClose: true,
              message: '启动失败',
              type: 'error'
            });
          }
        })
      }else{
        //结束采集
        axios.post("/api/collection",{
          state:this.state
        }).then(res => {
          if(res.code == '200'){
            this.state = 1;
            clearInterval(this.timer)
            this.$message({
              showClose: true,
              message: '关闭成功',
              type: 'success'
            });
          }else{
            this.$message({
              showClose: true,
              message: '关闭失败',
              type: 'error'
            });
          }
        })
      }
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

    playSound(){
      var borswer = window.navigator.userAgent.toLowerCase();
      if ( borswer.indexOf( "ie" ) >= 0 )
      {
        //IE内核浏览器
        var strEmbed = '<embed name="embedPlay" src="https://img.tukuppt.com/newpreview_music/08/99/16/5c88e76d71b5711967.mp3" autostart="true" hidden="true" loop="false"></embed>';
        if ( $( "body" ).find( "embed" ).length <= 0 )
          $( "body" ).append( strEmbed );
        var embed = document.embedPlay;

        //浏览器不支持 audion，则使用 embed 播放
        embed.volume = 100;
        embed.play();
      } else
      {
        //非IE内核浏览器
        var strAudio = "<audio id='audioPlay' src='https://img.tukuppt.com/newpreview_music/08/99/16/5c88e76d71b5711967.mp3' hidden='true'>";
        if ( $( "body" ).find( "audio" ).length <= 0 )
          $( "body" ).append( strAudio );
        var audio = document.getElementById( "audioPlay" );

        //浏览器支持 audion
        audio.play();
      }
    }
}
</script>

<style lang="scss" scoped>
.homeTop{
  padding: 22px 60px;
  height: 42px;
  display: flex;
  justify-content: space-between;
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
    cursor:pointer;
  }
  .redButton{
    background-color: rgb(157, 21, 26);
    // margin-right: 35px;
  }
}
.homeContent{
  padding: 0 60px 0 30px;
  span{
    display: inline-block;
    width: calc(100% / 7);
  }
  span:last-child{
    cursor:pointer;
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
    }
  }
}
  .fontRed{
    color:red !important;
  }
</style>