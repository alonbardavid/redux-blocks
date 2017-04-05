import {fetch} from '../mocked-server';

function post(path,data, token){
    return fetch(path,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        },
        body: JSON.stringify(data)
    }).then(res=>{
        if (res.ok){
            return res.json();
        } else {
            throw new Error(res.json().reason)
        }
    })
}
function get(path,token){
    return fetch(path,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        }
    }).then(res=>{
        if (res.ok){
            return res.json();
        } else {
            throw new Error(res.json().reason)
        }
    })
}
export function register(user) {
    return post("/register",user)
}
export function login(credentials) {
    return post("/login",credentials)
}
export function getProject(auth,projectId){
    return get(`/project/${projectId}`,auth.token)
}
export function getMyProjects(auth){
    return get("/me/projects",auth.token);
}
export function addProject(auth, project){
    return post("/project",project,auth.token);
}
export function getTasks(auth,projectId){
    return get(`/project/${projectId}/tasks`,auth.token);
}
export function addTask(auth, task){
    return post("/tasks",task,auth.token);
}
export function getActivities(auth,projectId){
    return get(`/project/${projectId}/activities`,auth.token);
}
export function addActivity(auth, activity){
    return post("/activities",activity,auth.token);
}