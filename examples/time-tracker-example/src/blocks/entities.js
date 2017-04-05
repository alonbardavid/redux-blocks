import ActivitiesBlock from './activities';
import TasksBlock from './tasks';

const selectors = {
    activitiesWithTasks: (state, params)=> {
        return ActivitiesBlock.selectors.list(state, params)
            .map(act => ({...act, task: TasksBlock.selectors.get(state, act.task)}))
    }
};


export default {
    selectors
}
