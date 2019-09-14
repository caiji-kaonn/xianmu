export const state=()=>{
    return{
    name:''
    }
}

export const mutations={
    ofname(state,data){
        state.name=data
    }
}

export const actions={
    setnameaciton({commit},data){
    commit('ofname',data)
    }
}