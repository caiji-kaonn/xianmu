<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option v-for="(item,index) in data.options.airport" :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(item,index) in data.options.flightTimes" :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item,index) in data.options.company" :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item,index) in sizeOptions" :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
   props:{
       data:{
           type:Object,
           default:{}
       }
   },
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
            sizeOptions:[{
                name:'大',size:'L'
            },{
                name:'中',size:'M'
            },
            {name:'小',size:'S'}
            ]
            
        }
    },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            // console.log(value)
            const arr=this.data.flights.filter(v=>{
            return v.org_airport_name===value
        })
        this.$emit('filterclick',arr)
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
        //    console.log(value)
        const [from,to]=value.split(',')
         const arr=this.data.flights.filter(v=>{
             const current = v.dep_time.split(":")[0];
            return +current >= +from && +current < +to;
        })
        this.$emit('filterclick',arr)
        },

         // 选择航空公司时候触发
        handleCompany(value){
             const arr=this.data.flights.filter(v=>{
                return v.airline_name===value
            })
            this.$emit('filterclick',arr)
        },

         // 选择机型时候触发
        handleAirSize(value){
        //    console.log(value)
        // this.airSize=value
        // 先筛选后再传过去
       const arr=this.data.flights.filter(v=>{
            return v.plane_size===value
        })
        this.$emit('filterclick',arr)
        },
        
       
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport="",        // 机场
             this.flightTimes= "",    // 出发时间
             this.company= "",        // 航空公司
             this.airSize= "",        // 机型大小
             this.pageIndex = 1
              this.$emit("filterclick", this.data.flights);
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>