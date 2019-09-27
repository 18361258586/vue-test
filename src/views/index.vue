<template>
  <div class="app">
    <h2>数据采集中</h2>
    <div class="appBox">
      <div id="nav">
        <router-link to="/">数据采集</router-link> 
        <router-link to="/about">查询</router-link>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2{
  margin: 0;
  line-height: 70px;
}
.appBox{
  display: flex;
  #nav {
    width: 160px;
    padding: 30px 0;
    a {
      text-align: left;
      padding-left: 25px;
      line-height: 50px;
      display: block;
      font-weight: bold;
      color: white;
      text-decoration: none;
      &.router-link-exact-active {
        color: white;
        background: rgb(157, 27, 26);
      }
    }
  }
  .content{
    width: calc(100% - 160px);
    min-height: calc(100vh - 70px);
    background: #f9f9f9;
  }
}

</style>
