import axios from 'axios'
import { reject } from 'q';

//'http://192.168.1.11:4000/
/* "http://13.232.208.65:3003/ */
export const url = 'http://13.232.208.65:3002/'



export const userList = (limit,page)=>{
    return new Promise((done,reject)=>{
        axios.get(`${url}admin/user?page=${page}&limit=${limit}`)
.then((response)=>{
    console.log(response)
    done(response.data)
}).catch((err)=>{
    console.log(err.response)
    reject(err)
})
    })

}

export const forgetPassword  = (email) =>{
    return new Promise((done,reject)=>{
        axios.put(`${url}v1/admin/forgetPassword?email=${email}`)
        .then((response)=>{
            console.log(response)
            done(response.data.data)
        }).catch((err)=>{
            console.log(err.response)
            reject(err.response.data)
        })
    })
}

export const count = (type) =>{
    return new Promise((done,reject)=>{
        axios.get(`${url}admin/`,{params:{type}}).then((result)=>{
            done(result.data.data)
        }).catch((err)=>{
            console.log(err.response)
            reject(err.response.err)
        })
    })
}

export const countGraph = (type) =>{
    return new Promise((done,reject)=>{
        axios.get(`${url}admin/map`,{type}).then((result)=>{
            done(result.data.data)
        }).catch((err)=>{
            console.log(err.response)
            reject(err.response.err)
        })
    })
}



export const loginApi =(data) =>{
    return new Promise((done,reject)=>{
        axios.post(`${url}admin/login`,data).then((response)=>{
            done(response.data.data)
        }).catch((err)=>{
            console.log(err.response.data)
            
            reject(err.response.data)
        })
    })
}

export const spotliteList = (page,limit)=>{
    return new Promise((done,reject)=>{
        axios.get(`${url}v1/admin/spotlite?page=${page}&limit=${limit}`).then((response)=>{
            console.log(response)
            done(response.data.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const contest = () =>{
    return new Promise ((done,reject)=>{
        axios.get(`${url}v1/rule/event?type=contest`).then((response)=>{
            done(response.data.data)
        }).catch((err)=>{
            console.log(err.response)
            reject(err.response)
        })
    })
}


export const createContest = (data) =>{
    return new Promise((done,reject)=>{
        axios.post(`${url}v1/upload/contest`,data).then((response)=>{
            done((response.data.data))
        }).catch((err)=>{ console.log(err.response)
                reject(err.reponse)})
    })
}
export const getcontest = ({page,limit})=>{
    return new Promise((done,reject)=>{
        axios.get(`${url}admin/book?page=${page}&limit=${limit}`).then((response)=>{
            console.log(response)

            done(response.data)
        }).catch((err)=>{
            console.log(err.response)
            reject(err)
        })
    })
}

export const getPosts =(data) =>{
    return new Promise((done,reject)=>{
        let {limit,page ,eventId} = data
        axios.put(`${url}v1/admin/contest?page=${page}&&limit=${limit}`,{eventId}).then((response)=>{
            console.log(response.data.data,"psot")
            done(response.data.data)
        }).catch((err)=>{
            console.log(err.response)
            reject(err.response.err)
        })
    })
}

export const changePost = (data) =>{
    return new Promise((done,reject)=>{
        
        axios.post(`${url}v1/admin/changePassword`,data).then((result)=>{
            done(result.data.data)
        }).catch(err=>reject(err.response.data.err))

    })
}


export const deletePost = (postId) =>{
    return new Promise((done,reject)=>{
        axios.delete(`${url}v1/admin/post?postId=${postId}`).then((result)=>{
            done(result.data)
        }).catch(err=>{
            reject(err.response.data.err)
        })
    })
}


export const deleteContest = (contestId) =>{
    return new Promise((done,reject)=>{
        axios.delete(`${url}v1/admin/contest?contestId=${contestId}`).then((result)=>{
            done(result.data)
        }).catch(err=>{
            reject(err.response.data.err)
        })
    })
}

export const getChallangeList = (page,limit,sort) =>{
    return new Promise((done,reject)=>{
        axios.get(`${url}v1/admin/challange?page=${page}&limit=${limit}&sort=${sort}`).then((result)=>{
            done(result.data.data)
        }).catch(err=>{
            reject(err.response.data.err)
        })
    })
}

export const getNicheList = ({page,limit}) =>{
    return new Promise((done,reject)=>{
        axios.get(`${url}v1/admin/niche?page=${page}&limit=${limit}`).then((result)=>{
            done(result.data.data)
        }).catch(err=>{
            reject(err.response.data.err)
        })
    })
}

export const addNiche= (niche,file) =>{
    return new Promise((done,reject)=>{
        let formdata = new FormData()
        formdata.append('file',file)
        formdata.append('niche',niche)

        axios.post(`${url}v1/admin/niche`,formdata).then((result)=>{
            done(result.data.data)
        }).catch((err)=>{
            console.log(err.response)
            reject(err.response.data.err)
        })  
    })
}

export const NicheDelete = (id) =>{
    return new Promise((done,reject)=>{
        axios.delete(`${url}v1/admin/niche?nicheId=${id}`).then((result)=>{
           return  done(result.data.message)
        }).catch((err)=>{
            return reject(err.response.data.err)
        })  
    })
}

export const AddSubNiche = (data)=>{
    return new Promise((done,reject)=>{
        axios.patch(`${url}v1/admin/niche`,data).then((result)=>{
            
           return done(result.data.message)
        }).catch((err)=>{
            return reject(err.response.data.err)
        })
    })
}

export const uploadSubNicheImg = (data)=>{
    return new Promise((done,reject)=>{
        axios.post(`${url}v1/upload/subNiche`,data).then((result)=>{
           return done(result.data)
        }).catch((err)=>{
            return reject(err.response.data.err)
        })
    })
}


export const changeUserStatus = (data)=>{
    return new Promise((done,reject)=>{
        axios.put(`${url}admin/status`,data).then((result)=>{
           return done(result.data)
        }).catch((err)=>{
            return reject(err.response.data.err)
        })
    })
}

export const changeUserType = (data)=>{
    return new Promise((done,reject)=>{
        axios.put(`${url}admin/type`,data).then((result)=>{
           return done(result.data)
        }).catch((err)=>{
            return reject(err.response.data.err)
        })
    })
}