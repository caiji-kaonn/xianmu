export const state=()=>({
    userInfo:{
        token:'',
        user:{}
    }
})

export const mutations={
    setUserInfo(state,data){
    // 要把从请求获取到数据，设置给state
    state.userInfo=data
    },
    // 清除数据--只要设置为空即可
    clearUserInfo(state){
        state.userInfo={
            token:'',
            user:{}
        }
    }
};

export const actions={};