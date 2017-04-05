import db from './db';

export function generateToken(){
    return new Date().getTime()  + "" + Math.random() * 10000;
}

export function getUser(user){
    return db.users.get(user).then(stripPassword);
}
function getUserWithPassword({username}){
    return db.users.get({username});
}
export function verifyPassword(credentials,user){
    if (!user){
        throw new Error('user does not exist');
    }
    if (user.password === credentials.password){
        return user;
    } else {
        throw new Error(`password for user ${credentials.username} is incorrect`);
    }
}
function addToken(user){
    const token = generateToken();
    return db.users.update(user.id,{
        token
    }).then(()=>({
        ...stripPassword(user),
        token
    }))
}
 function stripPassword(user){
    return {
        ...user,
        password:undefined
    }
}
export function login(credentials){
    return getUserWithPassword(credentials)
        .then(verifyPassword.bind(this,credentials))
        .then(addToken)
}
export function register({username,password,name}) {
    return db.users.add({
        username,
        password,
        name
    }).then(login.bind(this,{username,password}));
}