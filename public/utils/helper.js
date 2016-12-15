export let mapObject = (obj, fn) => {
    for(let key in obj){
        fn(key, obj[key]);
    }
}