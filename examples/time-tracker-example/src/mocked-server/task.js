import db from './db';

export function getTask(taskId){
    return db.tasks.get(taskId);
}
export function getTasks(projectId){
    return db.tasks.where({project:projectId}).toArray();
}
export function addTask(task){
    return db.tasks.add(task).then(id=>{
        return {
            ...task,
            id
        }
    });
}

export function handleGetTasks(user, projectId){
    return getTasks(parseInt(projectId,10));
}
export function handleAddTask(user, data){
    return addTask(data)
}