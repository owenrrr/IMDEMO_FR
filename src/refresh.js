export function setObj (key, obj){
    obj = JSON.stringify(obj);
    localStorage.setItem(key, obj);
    return obj;
}

export function getObj (key) {
    var obj = JSON.parse(localStorage.getItem(key));
    return obj;
}