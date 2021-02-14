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
// 通过 new 关键字创建的对象实质是对新对象 this的不断赋值并将prototype 指向类的prototype所指向的对象
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
// 由于call 方法可以改变函数的作用环境, 在子类中对 SuperClass 调用这个方法就是将子类中的变量在父类中执行一遍
// 由于父类中是给 this 绑定属性的 因此子类自然也就继承了父类的共有属性 由于这种类型继承没有设计原型 prototype
// 所以父类的原型方法自然不会被子类继承, 而如果想要被子类继承就必须要放在构造函数中 这样创建出来的 每个实例都会单独拥有一份而不能公用
// 这样就违背了代码复用的原则, 为了综合两点就有了 组合式继承

// 优点为我所用 - 组合继承
