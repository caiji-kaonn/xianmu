<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <FlightsFilters :data="cacheList" @filterclick="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        </div>
        <div class="block">
          <!-- siz-change=点击选择XX多少条/页 -->
          <!-- current-change=点击一页一页 -->
          <!-- current-page=动态当前设置多少条/页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="Pageindex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside/>
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";
export default {
  data() {
    return {
      // 缓存一份大数据用于筛选
      cacheList: {
        info: {},
        options: {}
      },
      flightsDate: {
        flights: [],
        info: {},
        options: {}
      },
      dataList: [],
      total: 0,
      // 当前页码
      Pageindex: 1,
      // 显示当前多少条
      pageSize: 5
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  mounted() {
    this.getdata();
  },
  watch:{
    $route(){
    this.getdata()
    }
  },
  methods: {
    getdata() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res.data, 555);
        // res.data(flights , info ,options)
        // 总数据
        this.flightsDate = res.data;
        // 缓存一份用于筛选
        this.cacheList = { ...res.data };
        // console.log(this.Pageindex)
        // 改一下总数total
        this.total = this.flightsDate.total;
        // 一加载，显示5条一页--放到新的数组
        this.dataList = this.flightsDate.flights.slice(0, this.pageSize);
      });
    },
    // 过滤列表
    setDataList(arr) {
      this.flightsDate.flights = arr;
      this.Pageindex=1
      this.dataList = this.flightsDate.flights.slice(
        (this.Pageindex - 1) * this.pageSize,
        this.Pageindex * this.pageSize
      );
      this.total=arr.length
    },
    // 点击选择XX多少条/页 方法
    handleSizeChange(val) {
      // console.log(val)
      this.pageSize = val;
      this.dataList = this.flightsDate.flights.slice(0, val);
    },
    // 点击一页一页 显示当前点击的是哪一页
    handleCurrentChange(val) {
      this.Pageindex = val;
      this.dataList = this.flightsDate.flights.slice(
        (this.Pageindex - 1) * this.pageSize,
        this.Pageindex * this.pageSize
      );
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>