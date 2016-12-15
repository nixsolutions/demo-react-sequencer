export let mapObject = (obj, fn) => {
    for(let key in obj){
        fn(key, obj[key]);
    }
}

export let copyDeepObject = (obj) => JSON.parse(JSON.stringify(obj));