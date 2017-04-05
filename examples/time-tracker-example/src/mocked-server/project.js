import db from './db';

export function getProjects(userId){
    return db.projects.where({users:userId}).toArray();
}
export function getProject(projectId){
    return db.projects.get(projectId);
}
export function addProject(project){
    return db.projects.add(project).then(id=>{
        return {
            ...project,
            id
        }
    });
}

export function handleGetMyProjects(user){
    return getProjects(user.id);
}
export function handleAddProject(user,data){
    return addProject({
        ...data,
        users:[user.id]
    })
}
export function handleGetProject(user,projectId){
    return getProject(parseInt(projectId,10));
}