import db from './db';
import {getTask} from './task';

export function addActivity(activity){
    return getTask(activity.task).then(task=>{
        activity.project = task.project;
        return db.activities.add(activity).then(id=>{
            return {
                ...activity,
                id
            }
        });
    })
}
export function handleGetActivitiesForProject(user, projectId){
    return db.activities.where({project:parseInt(projectId,10)}).reverse().sortBy('startDate');
}
export function handleAddActivity(user,data){
    return addActivity(data);
}