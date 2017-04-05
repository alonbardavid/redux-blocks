
import {login,register, getUser} from './user';
import {handleGetMyProjects, handleAddProject, handleGetProject} from './project';
import {handleGetTasks, handleAddTask} from './task';
import {handleAddActivity,handleGetActivitiesForProject,} from './activity';

function handleRegister(user){
    return register(user);
}
function handleLogin(credentials){
    return login(credentials);
}

function getAuth(opts){
    if (opts.headers && opts.headers["X-Auth-Token"]) {
        return getUser({token:opts.headers["X-Auth-Token"]});
    } else {
        return createError(401, "resource requires authentication");
    }
}
function getParamsFromRoute(route,path,opts){
    const groups = path.match(route.regex).slice(1);
    const data = JSON.parse(opts.body || null);
    if (route.authOnly){
        return getAuth(opts).then(user=>[user].concat(groups).concat(data));
    }
    return Promise.resolve(groups.concat(data))
}
function handleRoute(route,path,opts){
    return getParamsFromRoute(route,path,opts)
        .then(args=>route.handler(...args))
        .then(res=>({
            ok:true,
            json: ()=>res
        }))
}
const ROUTES = [
    {regex:/\/register$/, method:"POST", handler:handleRegister},
    {regex:/\/login$/, method:"POST", handler:handleLogin},
    {regex:/\/me\/projects$/, method:"GET", handler:handleGetMyProjects, authOnly:true},
    {regex:/\/project$/, method:"POST", handler: handleAddProject, authOnly:true},
    {regex:/\/project\/(\d+)$/, method:"GET", handler: handleGetProject, authOnly:true},
    {regex:/\/project\/(\d+)\/tasks$/, method:"GET", handler:handleGetTasks, authOnly:true},
    {regex:/\/project\/(\d+)\/activities$/, method:"GET", handler:handleGetActivitiesForProject, authOnly:true},
    {regex:/\/tasks$/, method:"POST", handler: handleAddTask, authOnly:true},
    {regex:/\/activities$/, method:"POST", handler: handleAddActivity, authOnly:true}

];
function createError(status,message){
    return Promise.reject({
        status,
        message
    })
}
export function fetch(path, opts){
    const method = opts.method || 'GET';
    return window.fetch(`/api/${method}?path=${encodeURIComponent(path)}`)
        .then(()=>{
            const route = ROUTES.find(m=>{
                return m.method === method && m.regex.test(path)
            });
            if (route){
                return handleRoute(route,path,opts);
            }
            return createError(404,`can't match path for request - method ${method} , path ${path}`)
        })
        .catch((err)=>{
            return Promise.resolve({
                ok:false,
                status: err.status || 500,
                json:()=>({reason:err.message})
            })
        })
}