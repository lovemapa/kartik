import * as types from './../action/actionTypes'
import {combineReducers} from 'redux'


let initiliseState = {
	isLogin:false,	
	isAuth:false,
	expanded:false
}
const dataReducer = (state=initiliseState,action)=>{

	switch(action.type){
		case types.User_Login:return {
			...state,
			isLogin:action.isLogin	
		}
		case types.get_posts:return {
			...state,
			contest:action.contest
		}
		case types.save_email:return {
			...state,
			email:action.email
		}
		case types.expandSidebar: return {
			...state,
			expanded:action.value
		}
		default : return state
	}
}



export default combineReducers({dataReducer})