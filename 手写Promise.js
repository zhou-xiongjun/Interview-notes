//声明构造函数
function Promise(executor){
    // 设置 Promise 默认状态
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    // 设置 Promise 默认值
    this.callbacks = [];
    // 保存 this 指向
    const self = this;
	
    //resolve 函数
    function resolve(data){
        // 实现 Promise 状态只能改变一次
        if(self.PromiseState !== 'pending') return;
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = 'fulfilled';// resolved
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
        //调用成功的回调函数
        setTimeout(() => {
			// 判断否是是以异步任务时调用的 then 方法
            // 处理多个 then 方法调用
            self.callbacks.forEach(item => {
                item.onResolved(data);
            });
        });
    }
    //reject 函数
    function reject(data){
        // 实现 Promise 状态只能改变一次
        if(self.PromiseState !== 'pending') return;
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = 'rejected';// rejected
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
        //执行失败的回调
        setTimeout(() => {
			// 判断否是是以异步任务时调用的 then 方法
            // 处理多个 then 方法调用
            self.callbacks.forEach(item => {
                item.onRejected(data);
            });
        });
    }
	
	// try,catch 主要用于 Promise 抛出错误时处理
    try{
        //同步调用『执行器函数』
        executor(resolve, reject);  // 传递给 new Promise 函数时的两个参数
    }catch(e){
        //修改 promise 对象状态为『失败』
        reject(e);
    }
}

//添加 then 方法
Promise.prototype.then = function(onResolved, onRejected){
	// 保存 this 指向
    const self = this;
	
	// 判断 then 方法是否传递成功的回调函数
    if(typeof onResolved !== 'function'){
        onResolved = value => value;  // 没有传递时，则 value 为 undefined 的即为成功的 Promise
    }
	
	// 判断 then 方法是否传递失败的回调函数，即就是判断第二个参数是否传递，用于处理异常穿透问题
    if(typeof onRejected !== 'function'){
        onRejected = reason => {
            throw reason;
        }
    }
	
    return new Promise((resolve, reject) => {
        //封装函数
        function callback(type){
            try{
                //获取回调函数的执行结果
                let result = type(self.PromiseResult);
                //判断
                if(result instanceof Promise){
                    //如果是 Promise 类型的对象
                    result.then(v => {
                        resolve(v);
                    }, r=>{
                        reject(r);
                    })
                }else{
                    //结果的对象状态为『成功』
                    resolve(result);
                }
            }catch(e){
                reject(e);
            }
        }
        //调用回调函数  PromiseState
        if(this.PromiseState === 'fulfilled'){
            setTimeout(() => {
                callback(onResolved);
            });
        }
        if(this.PromiseState === 'rejected'){
            setTimeout(() => {
                callback(onRejected);
            });
        }
        //判断 pending 状态
        if(this.PromiseState === 'pending'){
            //保存回调函数
            this.callbacks.push({
                onResolved: function(){
                    callback(onResolved);
                },
                onRejected: function(){
                    callback(onRejected);
                }
            });
        }
    })
}

//添加 catch 方法
Promise.prototype.catch = function(onRejected){
    return this.then(undefined, onRejected);
}

//添加 resolve 方法
Promise.resolve = function(value){
    //返回promise对象
    return new Promise((resolve, reject) => {
        if(value instanceof Promise){
            value.then(v=>{
                resolve(v);
            }, r=>{
                reject(r);
            })
        }else{
            //状态设置为成功
            resolve(value);
        }
    });
}

//添加 reject 方法
Promise.reject = function(reason){
    return new Promise((resolve, reject)=>{
        reject(reason);
    });
}

//添加 all 方法
Promise.all = function(promises){
    //返回结果为promise对象
    return new Promise((resolve, reject) => {
        //声明变量
        let count = 0;
        let arr = [];
        //遍历
        for(let i=0;i<promises.length;i++){
            //
            promises[i].then(v => {
                //得知对象的状态是成功
                //每个promise对象 都成功
                count++;
                //将当前promise对象成功的结果存入到数组中
                arr[i] = v;
                //判断
                if(count === promises.length){
                    //修改状态
                    resolve(arr);
                }
            }, r => {
                reject(r);
            });
        }
    });
}

//添加 race 方法
Promise.race = function(promises){
    return new Promise((resolve, reject) => {
        for(let i=0;i<promises.length;i++){
            promises[i].then(v => {
                //修改返回对象的状态为 『成功』
                resolve(v);
            },r=>{
                //修改返回对象的状态为 『失败』
                reject(r);
            })
        }
    });
}

function mian(){
	let p = new Promise((resolve,reject)=>{
		resolve("ok")
	})
	p.then(value=>{
		console.log(value)
	},reason=>{
		console.log(reason)
	})
}

mian()