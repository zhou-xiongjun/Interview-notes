
// 原型链继承
    // 不能向构造函数传参

// function Chlid() {
//     this.a = 'a'
//  }

// function Parent() {
//     this.sex = '男'
// }
// Parent.prototype.eat = function () {
//     console.log('父类')
// }

// // 先继承
// Chlid.prototype = new Parent();   // 将 Chlid 继承自 Parent
// Chlid.prototype.constructor = Chlid;

// let chlid = new Chlid()
// console.log(chlid.a)
// console.log(chlid.sex)
// chlid.eat()


// ------------------- 分割线 -------------------------------

// 借用构造函数继承
    // 不能继承 原型链上的 属性和方法
// function Parent(name) {
//     this.name = name
//     this.arr = [1]
//     this.say = function () {
//         console.log('hello')
//     }
// }


// function Chlid(name, like) {
//     Parent.call(this, name)
//     this.like = like
// }

// let boy1 = new Chlid('小红', 'apple')
// let boy2 = new Chlid('小明', 'orange')

// console.log(boy1.name, boy2.name)
// console.log(boy1.like, boy2.like)

// boy1.arr.push(2)
// console.log(boy1.arr, boy2.arr)

// 报错   不能继承 原型链上的 属性和方法
// Parent.prototype.walk = function(){
//     console.log('我会走路')
// }
// boy1.walk()



// ------------------- 分割线 -------------------------------


// 组合继承
// function Parent(name){
//     this.name = name
//     this.arr = [1]
// }
// Parent.prototype.say = function(){
//     console.log('hello')
// }

// function Chlid(name,like){
//     Parent.call(this,name)
//     this.like = like
// }

// Chlid.prototype = new Parent()
// Chlid.prototype.constructor = Chlid

// let boy1 = new Chlid('小红', 'apple')
// let boy2 = new Chlid('小明', 'orange')

// console.log(boy1.name, boy1.like)
// console.log(boy1.say == boy2.say)
// boy1.arr.push(2)
// console.log(boy1.arr)
// console.log(boy2.arr)



// ------------------- 分割线 -------------------------------
// 组合组合继承  用的较多
function Parent(name){
    this.name = name;
    this.arr = [1]
}
Parent.prototype.say = function(){
    console.log('hello')
}

function Chlid(name,like){
    Parent.call(this,name)
    this.like = like
}

Chlid.prototype = Object.create(Parent.prototype)  // 核心
Chlid.prototype.constructor = Chlid

let boy1 = new Chlid('小红', 'apple')
let boy2 = new Chlid('小明', 'orange')
let parent = new Parent('张三')

console.log(boy1.say == boy2.say)
console.log(boy1.name)
console.log(boy2.name)
console.log(parent.name)