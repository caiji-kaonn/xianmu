export const state=()=>{
    return{
        infoData:{
            seat_infos: {}
        },
        allprice:0
    }
}
export const mutations={
    setInfoData(state,data){
        state.infoData=data
    },
    getallprice(state,price){
    state.allprice=price
    }
}