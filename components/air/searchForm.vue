<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <el-autocomplete
                v-model="form.departCity"
                :fetch-suggestions="querydepartCity"
                placeholder="请搜索出发城市"
                @select="searchdepartCity"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                v-model="form.destCity"
                :fetch-suggestions="querydestCity"
                placeholder="请搜索到达城市"
                @select="searchdestCity"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
                <el-date-picker type="date" 
                v-model="form.departDate"
                placeholder="请选择日期" 
                @change="handletime"
                style="width: 100%;">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="searchsubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="reserve">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            form:{
              departCity:'',
              departCode:'',
              destCity:'',
              destCode:'',
              departDate:'',
            }
        }
    },
    methods: {
      // 切换tab栏
        handleSearchTab(index){
            if(index===1){
              this.$alert('暂时没有返回票程','提示')
              return
            }
        },
        // 输入出发城市的事件--这里只是从服务器那里获取到下拉菜单的数据，并返回展现数据
        querydepartCity(value,callback){
          if(!value){
            callback([])
            return
          }
          // 发送请求获取菜单
          this.$axios({
            url:'/airs/city',
            params:{
              name:value
            }
          }).then(res=>{
            // console.log(res)
            const {data}=res.data
            // 返回这些数据到菜单中，但是要的是value
            const tem=[]
            data.forEach(v=>{
              v.value=v.name.replace('市','')
              tem.push(v)
            })
            this.form.departCity=tem[0].value
            this.form.departCode=tem[0].sort
            callback(tem)
            // console.log(tem,111)
          })
          
        },
        // 选择下拉菜单中的事件---出发城市--item对应的是菜单项目---上面obj
        // 这里就能获取到客户选择的数据
        searchdepartCity(item){
          // 返回的是对象，里面有对应的值
        //  console.log(item,1111)
         this.form.departCity=item.value
         this.form.departCode=item.sort
        },
        // 输入到达城市的事件
        querydestCity(value,callback){
          if(!value){
            callback([])
            return
          }
          this.$axios({
            url:'/airs/city',
            params:{
              name:value
            }
          }).then(res=>{
            // console.log(res,222)
            const {data}=res.data
            const tem1=[]
            data.forEach(v=>{
              v.value=v.name.replace('市','')
              tem1.push(v)
            })
            // console.log(tem1,3333)
            this.form.destCity=tem1[0].value
            this.form.destCode=tem1[0].sort
            callback(tem1)
          })
        },
         // 选择下拉菜单中的事件---到达城市
        searchdestCity(item){
          console.log(item,444)
          this.form.destCity=item.value
          this.form.destCode=item.sort
        },
        handletime(time){
          // console.log(time,555)
        this.form.departDate=moment(time).format('YYYY-MM-DD')
        // console.log(this.form.departDate,999)
        },
        // 搜索跳转--机票页
        searchsubmit(){
          const {departCity,destCity,departDate}=this.form 
          if(!departCity){
            this.$alert('出发城市不能为空','提示')
            return
          }
          if(!destCity){
            this.$alert('目标城市不能为空','提示')
            return
          }
          if(!departDate){
            this.$alert('出发时间不能为空','提示')
            return
          }
          this.$message({
              message:'查询成功，跳转中',
              type:'success'
            })
            const air=JSON.parse(localStorage.getItem('airs') || `[]`)
            air.push(this.form)
            localStorage.setItem('airs',JSON.stringify(air))
            setTimeout(()=>{
            this.$router.push({
              path:'/air/flights',
              query:this.form
            })
            },500)
        },
        reserve(){
          // console.log(888)
          const {departCode,destCode,departCity,destCity}=this.form
          this.form.departCity=destCity
          this.form.departCode=destCode
          this.form.destCity=departCity
          this.form.destCode=departCode
        }
}
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
