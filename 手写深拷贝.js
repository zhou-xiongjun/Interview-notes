const oldObj = {
    name: "周老头",
    age: 21,
    obj: {
        color: "red"
    },
    fn: function () {
        console.log(1)
    }
}

// 第一种
var newObj = JSON.parse(JSON.stringify(oldObj))

// 第二种
function deepClone(newObj) {
    // 对象和数组的 typeof 都是 object
    if (typeof newObj !== 'object' || newObj == null) {
        return newObj
    }

    let result;

    // 判断类型
    if (newObj instanceof Array) {
        result = []
    } else {
        result = {}
    }

    for (let key in newObj) {
        // 避免拷贝对象原型上的属性，不是对象原型上的属性则为 true
        if (newObj.hasOwnProperty(key)) {
            // 使用递归拷贝对象中的对象
            result[key] = deepClone(newObj[key])
        }
    }

    return result

}

var newObj = deepClone(oldObj)

newObj.name = "周大爷"

console.log(oldObj)
console.log(newObj)