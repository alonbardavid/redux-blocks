import Dexie from 'dexie';
const db = new Dexie("time_tracker");
window.db = db;
db.version(1).stores({
    users:'++id,&username,token',
    projects:'++id,*users',
    tasks:'++id,project,user',
    activities:'++id,task,project,startDate'
});

export default db;