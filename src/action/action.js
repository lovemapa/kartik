import * as types from './actionTypes'


export const login = (isLogin) =>{
return {type:types.User_Login,isLogin}
}


export const contestPost = (detail) =>{
    return {type:types.get_posts,contest:detail}
}

export const saveEmail = (email)=>{
    return {type:types.save_email,email}
}

export const controlSidebar = (value) =>{
    return {type:types.expandSidebar,value}
}