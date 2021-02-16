// 两种编程风格 - 面向过程与面向对象
// 面向过程的实现方式: 一个函数解决一个功能
// 面向对象:
// 将需求(功能)抽象成对象 然后针对其分析特征(属性)和动作(方法)对象称之为类
// 主要特点: 封装 把需要的功能放在一个对象里

// 私有属性 私有方法 对象共有属性和对象共有方法, 构造器
var Book = function(id, name, price) {
  // 私有属性
  var num = 1;
  // 私有方法
  function checkId() {}
  // 特权方法
  this.getName = function() {}
  this.getPrice = function() {}
  this.setName = function() {}
  this.setPrice = function() {}
  // 对象共有属性
  this.id = id;
  this.copy = function() {};
  // 构造器
  this.setName(name);
  this.setPrice(price);
}
// 通过 JS函数作用域的特征来实现在函数内部创建外部访问不到的私有化变量和方法
// 通过 new关键字实例化对象时 由于对类执行一次 所以类内部this定义的属性方法就自然可以复制到创建的新对象上

// 类静态公有属性 (对象不能访问)
Book.isChinese = true;
// 类静态公有方法 (对象不能访问)
Book.restTime = function() {
  console.log('new Time');
}
Book.prototype = {
  // 公有属性
  isJSBook: false,
  // 公有方法
  display: function() {}
}
// new 关键字创建的对象实质是对新对象this的不断赋值 并将prototype指向类的prototype所指向的对象
// 类构造函数外面通过点语法定义的属性方法是不会添加到新创建的对象上去的
console.log(Book.isChinese);
Book.restTime();

// 闭包 - 有权限访问另外一个函数作用域中变量的函数
// 即在一个函数内部创建另外一个函数 将这个函数作为创建对象的构造函数 这样它即是闭包又是可实例对象的函数
// 将类的静态变量通过闭包实现
var Book = (function() {
  // 静态私有变量
  var bookNum = 0;
  // 静态私有变量
  function checkBook(name) {}
  // 创建类
  function _book(newId, newName, newPrice) {
    // 私有变量
    var name, price;
    // 私有方法
    function checkID(id) {}
    // 特权方法
    this.getName = function() {}
    this.getPrice = function() {}
    this.setName = function() {}
    this.setPrice = function() {}
    // 共有属性
    this.id = newId;
    // 公有方法
    this.copy = function() {}
    bookNum++
    if(bookNum > 100) {
      throw new Error('仅出100本')
    }
    this.setName(name);
    this.setPrice(price);
  }
  // 构造原型
  _book.prototype = {
    // 静态公有方法
    isJSBook: false,
    display: function() {}
  }
  // 返回类
  return _book();
})();

// 创建对象的安全模式

var Book = function(title, time, type) {
  this.title = title;
  this.time = time;
  this.type = type;
}

// 实例化一本书
// 未使用 new 关键字实例化
var book = Book('JavaScript', '2014', 'js')
console.log(book) // undefined
console.log(window.title);
console.log(window.time);
console.log(window.type);
// new 关键字作用是对当前对象的 this 不停的赋值 例子中没使用 new 所以会直接执行这个函数
// 当前函数处于全局作用域 全局指向 window 所以属性就会被添加到 window 上
// 解决: 使用安全模式
// 安全类
var Book = function(title, name, type) {
  if(this instanceof Book) {
    this.title = title;
    this.name = name;
    this.type = type;
  }
  else {
    return new Book(title, name, type);
  }
}

// 继承 原型链继承
// 声明父类
function SuperClass() {
  this.superValue = true;
}
// 为父类添加共有方法
SuperClass.prototype.getSuperValue = function() {
  return this.superValue;
}
// 声明子类
function subClass() {
  this.subValue = false;
}

// 继承父类
subClass.prototype = new SuperClass();
// 为子类添加共有方法
subClass.prototype.getSubValue = function() {
  return this.subValue;
}

let instance = new subClass();

console.log(instance.superValue());
console.log(instance.getSubValue());

// 判断对象与类之间的关系: 通过 instanceof 检测某个对象是否是某个类的实例 或者 某个对象继承了某个类
// instanceof 通过判断对象的 prototype 链来确定对象是否是某个累的实例 而不关系对象与类的自身结构
console.log(subClass instanceof SuperClass) // false
// 判断前面对象是否是后面对象的实例
// 实现 subClass 继承 SuperClass 事通过将 SuperClass 的是实例赋值给 subClass 类的原型 prototype
// 所以 subClass.prototype 继承了 SuperClass
console.log(subClass.prototype instanceof SuperClass) // true
// 类式继承的2个缺点
// 1. 子类通过其原型的 prototype 对父类实例化, 继承父类 如果父类中共有的属性有引用类型 就会被子类所有实例共用
// 如果子类实例可以直接改从父类构造函数中继承来的共有属性就会收到影响
function SuperClass() {
  this.books = ['JavaScript', 'HTML', 'CSS'];
}

function SubClass() {}
subClass.prototype = new SuperClass();
var instance1 = new SubClass()
var instance2 = new SubClass()
console.log(instance1.books) // 'JavaScript', 'HTML', 'CSS'
instance.books.push('???')
console.log(instance2.books) // 'JavaScript', 'HTML', 'CSS', '???'

// 2. 由于子类实现的继承是靠其原型的 prototype 对父类的实例化实现的 因此在创建父类的时候 是无法向父类传递参数的
// 因此实例化父类的时候也无法对父类构造函数内的属性进行初始化

// 解决: 构造函数继承 (创造即继承)
// 声明父类
function SuperClass(id) {
  // 引用类型共有属性
  this.books = ['JavaScript', 'HTML', 'CSS'];
  // 值类型共有属性
  this.id = id;
}

// 父类声明原型方法
SuperClass.prototype.showBooks = function() {
  console.log(this.books);
}

// 声明子类
function subClass(id) {
  SuperClass.call(this, id);
}

// 创建第一个子类的实例
var instance1 = new subClass(10);

// 创建第二个子类的实例
var instance2 = new subClass(11);

instance1.books.push('设计模式');
console.log(instance1.books);
console.log(instance1.books) // 'JavaScript', 'HTML', 'CSS', '设计模式'
console.log(instance1.id) // 10
console.log(instance2.books) // 'JavaScript', 'HTML', 'CSS'
console.log(instance1.id) // 11

instance1.showBooks() // TypeError
// SuperClass.call(this, id); 构造函数式继承的精华
// 由于call 方法可以改变函数的作用环境, 在子类中对 SuperClass调用这个方法 就是将子类中的变量在父类中执行一遍
// 由于父类中是给 this 绑定属性的 因此子类自然也就继承了父类的共有属性 由于这种类型继承没有设计原型 prototype
// 所以父类的原型方法自然不会被子类继承, 而如果想要被子类继承就必须要放在构造函数中 这样创建出来的
// 每个实例都会单独拥有一份而不能公用
// 这样就违背了代码复用的原则, 为了综合两点就有了 组合式继承

// 优点为我所用 - 组合继承
function SuperClass(name) {
  this.books = ['JavaScript', 'HTML', 'CSS'];
  this.name = name
}

SuperClass.prototype.getName = function() {
  console.log(this.name)
}

function SubClass(name, time) {
  // 构造函数式继承父类 name 属性
  SuperClass.call(this, name);
  // 子类中新增共有属性
  this.time = time;
}
// 类式继承 子类原型继承父类
SubClass.prototype = new SuperClass();
// 子类原型方法
Subclass.prototype.getTime = function() {
  console.log(this.time);
}
// 在子类的构造函数中继承父类构造函数 在子类的原型上实例化父类就是组合式继承
// 缺点: 多次调用 在使用构造函数时执行了一遍父类的构造函数 子类原型的类式继承又调用了一遍父类构造函数

// 原型式继承
// 道格拉斯.克罗福 <JavaScript 中原型式继承> 借助原型的prototype 可以根据已有的对象创建一个新的对象 同时不必创建自定义对象

function inheritBoject(o) {
  // 声明一个过渡函数对象
  function F() {}
  F.prototype = o;
  return new F();
}

var book = {
  name: 'JavaScript',
  alikeBook: ['css', 'html']
}

var newBook = inheritBoject(book);
newBook.name = 'ajax';
newBook.alikeBook.push('?')

// 如虎添翼 - 寄生式继承
// 生命基对象
var book = {
  name: 'ja book',
  alikeBook: ['css book', 'html book']
}

function createBook() {
  // 通过原型继承方式创建新对象
  var o = new inheritBoject(obj);
  // 拓展新对象
  o.getName = function() {
    console.log(name);
  }
  // 返回拓展后的新对象
  return o;
}
// 对原型继承的二次封装

// 终极继承者 - 寄生组合式继承
function inheriPrototype(subClass, superClass) {
  // 复制一份父类的原型保存在变量中
  var p = inheritBoject(superClass.prototype);
  // 修正因为重写子类原型导致子类的 constructor 属性被修改
  p.constructor = subClass;
  // 设置子类的原型
  subClass.prototype = p;
}

// 测试用例
function SuperClass(name) {
  this.name = name;
  this.colors = ['green', 'red', 'blue'];
}
SuperClass.prototype.getName = function() {
  console.log(this.name);
}

function SubClass(name, time) {
  // 构造函数式继承
  SuperClass.call(this, name);
  // 子类新增属性
  this.tiem = time;
}
// 寄生式继承 父类原型
inheriPrototype(SubClass, SuperClass);
// 子类新增原型方法
SubClass.prototype.getTime = function() {
  console.log(this.time)
}
let instance1 = new SubClass('js book', 2014);
let instance2 = new SubClass('css book', 2013);
instance1.colors.push('black');
instance2.colors.push('yellow');
instance2.getName();
instance2.getTime();

// 多继承
// JavaScript中继承是依赖于原型 prototype 链实现的 只有一条原型链 通过技巧方法 可以继承多个对象的属性实现类似的多继承
// 单继承
const extend = function(target, source) {
  // 遍历源对象属性
  for (const prototype in source) {
    // 将源对象属性复制到目标对象中
    target[prototype] = source[prototype];
  }
  // 返回目标对象
  return target;
}
// extend 方法是对 对象中属性的一个复制过程

let book = {
  name: 'JS Book',
  alikeBook: ['js', 'html', 'css']
}

let anotherBook = {
  color: 'red'
}

extend(anotherBook, book);

// 多继承 复制属性
const mix = function() {
  let i = 1,                  // 从第二个参数起被为被继承的对象
      len = arguments.length,
      target = arguments[0],
      arg;                    // 缓存参数对象

    // 遍历被继承的对象
    for(; i < len; i++) {
      // 缓存当前属性
      arg = arguments[i];
      // 遍历被继承对象的属性
      for (const prototype in arg) {
        // 将被继承对象的属性复制到目标对象
        target[prototype]  = arg[prototype]
      }
    }
    // 返回目标对象
    return target;
}
// 将传入的多个对象的属性复制到源对象中 即可实现对多个对象的属性继承
// 缺点: 使用时需要传入目标对象(参数一需要继承的对象)

// 绑定到原生对象Object上
Object.prototype.mix = function() {
  var i = 0,
      len = arguments.length,
      arg;

  // 遍历被继承的对象
  for(; i < len; i++) {
    // 缓存当前对象
    arg = arguments[i];
    // 遍历被继承对象中的属性
    for (const prototype in arg) {
      this[prototype] = arg[prototype]
    }
  }
}

// 多态 - 多种调用方式
function add() {
  // 获取参数
  let arg = arguments,
  len = arguments.length;
  switch(len) {
    // 如果没有参数
    case 0:
      return 10;
    // 如果有一个参数
    case 1:
      return 10 + arg[0];
    case 2:
      return arg[0] + arg[1]
  }
}

// 另一种写法
function Add() {
  // 无参数算法
  function zero() {
    return 10;
  }
  // 一个参数算法
  function one(num) {
    return 10 + num;
  }
  // 两个参数算法
  function two(num1, num2) {
    return num1 + num2;
  }
  // 相加共有方法
  this.add = function() {
    let arg = arguments,
        len = arguments.length;
    switch(len) {
      // 无参
      case 0:
        return zero();
      case 1:
        return one(arg[0]);
      case 2:
        return two(arg[0], arg[1]);
    }
  }
}

let A = new Add();
console.log(A.add());
console.log(A.add(5));
console.log(A.add(5, 7));

// 多继承中通过对对象的属性与方法 浅复制实现继承 如何实现深复制?
// 在深复制中把对象的引用类型属性细化成值类型 拷贝到目标对象中
function keepCloning(objectpassed) {
  if (objectpassed === null || typeof objectpassed !== 'object') {
     return objectpassed;
  }
  // 递归
  var temporary_storage = objectpassed.constructor(); // {}
  for (const key in objectpassed) {
    temporary_storage[key] = keepCloning(objectpassed[key]);
  }
  return temporary_storage;
}
