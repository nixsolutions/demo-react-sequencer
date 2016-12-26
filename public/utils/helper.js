export let mapObject = (obj, fn) => {
    for(let key in obj){
        fn(key, obj[key]);
    }
}

export const copyDeepObject = (obj) => JSON.parse(JSON.stringify(obj));
export const generateId = () => Date.now() + Math.random();