// 小白的code
function checkName() {}
function checkEmail() {}
function checkPwd() {}

// 函数的另一种形式
var checkName = function() {}
var checkEmail = function() {}
var checkPwd = function() {}

// 优化为 - 对象收编变量
var CheckObject = {
  checkName: function() {},
  checkEmail: function() {},
  checkPwd: function() {},
}

// JavaScript函数式也是对象
var CheckObject = function() {}
CheckObject.checkName = function() {}
CheckObject.checkEmail = function() {}
CheckObject.checkPwd = function() {}

// 真假对象 code 复制 重用
// 满足基本的使用 但是对象类在用 new 关键字新创建的对象不能继承这些方法
// 简单复制 将方法放在一个函数对象中
var CheckObject = function() {
  return {
    checkName: function() {},
    checkEmail: function() {},
    checkPwd: function() {},
  }
}

// 类也可以
// 并不是真正意义上的类 返回的对象与 CheckObject 无关
var CheckObject = function() {
  this.checkName = function() {},
  this.checkEmail = function() {},
  this.checkPwd = function() {}
}

// 一个检测类
// 每个通过 new 关键字创建的新对象都会对类的 this 上的属性进行复制 (继承了所有变量及方法) 造成很多开销
// 解决: 创建出的对象方法就只是一个 它们都要依赖 prototype 原型依次寻找
var CheckObject = function() {}
CheckObject.prototype.checkName = function() {}
CheckObject.prototype.checkEmail = function() {}
CheckObject.prototype.checkPwd = function() {}

// 优化
var CheckObject = function() {}
CheckObject.prototype = {
  checkName: function() {},
  checkEmail: function() {},
  checkPwd: function() {},
}

// 以上2中方法不可混用

var a = new CheckObject();
a.checkEmail()
a.checkName()
a.checkPwd()
// 方法还可以这样用
// 其中 a 写了多次 这是可避免的 在声明的方法末尾将对象返回 this指向当前对象

var CheckObject = {
  checkName: function() {
    return this;
  },
  checkEmail: function() {
    return this;
  },
  checkPwd: function() {
    return this;
  },
}

CheckObject.checkName().checkEmail().checkPwd()

// 同样放到类的原型对象中
var CheckObject = function() {}
CheckObject.prototype = {
  checkName: function() {
    return this;
  },
  checkEmail: function() {
    return this;
  },
  checkPwd: function() {
    return this;
  },
}

var a = new CheckObject();
a.checkName().checkEmail().checkPwd()

// 函数的祖先
Function.prototype.checkEmail = function() {}
var f = function() {}
f.checkEmail()

// 污染了原生对象Function 所有创建的函数都会被污染
// 可以单独抽象出一个统一添加方法的功能方法
Function.prototype.addMethod = function(name, fn) {
  this[name] = fn;
}

// 需要添加方法时
var methods = function() {}
// or
var methods = new Function();

methods.addMethod('checkName', function() {})
methods.addMethod('checkEmail', function() {})
methods.checkName();
methods.checkEmail();

// 可以添加链式操作吗?
// 在 addMethod 中将 this 返回
Function.prototype.addMethod = function(name, fn) {
  this[name] = fn;
  return this;
}

let methods = new Function();

methods.addMethod('checkName', function() {
  return this;
}).addMethod('checkEmail', function() {
  return this;
})

methods.checkName().checkEmail()

// 换一种使用方式
// 改造成 类方式 调用
Function.prototype.addMethod(name, fn) {
  this.prototype[name] = fn;
  return this;
}

var Methods = function() {}
Methods.addMethod('checkName', function() {})
.addMethod('checkEmail', function() {})

// 需要使用 new 关键字创建新对象
var m = new Methods()
m.checkEmail()
