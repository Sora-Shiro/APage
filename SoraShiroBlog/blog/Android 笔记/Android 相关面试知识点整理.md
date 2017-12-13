# 前言

本文是根据[**柴泽建_Jack**](http://www.jianshu.com/u/dd5f6394457d)前辈的《[**Android面试知识点总结**](http://www.jianshu.com/p/fce8d5f72485)》思路来进行撰写的，真的是十分感谢。

# Java 相关

##### 1. 基本类型和引用类型是什么？每种基本类型都占多少位多少字节？String是基本类型还是引用类型？

* 基本类型有byte, short, int, long, float, double, boolean, char
引用类型有 对象(包括String)、数组

|基本类型|位|字节|
|:-------------:|:-------------:|:-------------:|
|byte|8|1|
|short|16|2|
|int|32|4|
|long|64|8|
|float|32|4|
|double|64|8|
|boolean|1|/|
|char|16(Unicode)|2|

* 一个字有两个字节，一个字节有8位。
* 在Java语言中基本类型变量声明时，系统直接给该变量分配空间，因此程序中可以直接操作。
* 引用类型（或称为引用型）变量声明时，只是给该变量分配引用空间，数据空间未分配。因此引用型变量声明后不能直接引用。引用类型变量在声明后必须通过实例化开辟数据空间，才能对变量所指向的对象进行访问。
Java中引用型变量之间的赋值是引用赋值。

##### 2. Java什么时候是值传递什么时候是引用传递？
基本类型值传递，引用类型引用传递。

##### 3. String相关的。String常量池，StringBuffer，StringBuilder，运算符“+”与“+=”重载。String不可变的理解。String的intern方法不同版本的实现原理的区别。
* String：字符串常量
StringBuffer：字符串变量，线程安全
StringBuilder：字符串变量，线程非安全
速度：StringBuilder > StringBuffer > String

* 如果要操作少量的数据用 = String
单线程操作字符串缓冲区下，操作大量数据 = StringBuilder
多线程操作字符串缓冲区下，操作大量数据 = StringBuffer

* 关于运算符重载：JDK到现在8为止并没有提供运算符重载功能，表面上重载实际上是JVM在编译时，对字符串拼接的情况new了一个StringBuilder对象，然后用append方法拼接。

* 关于String不可变：String是一个不可变类，它实际上在内部用了一个final char数组来存储字符串，也就是说String二重引用了字符串值，虽然可以用反射修改这个final char 数组，但并不推荐这么做。此外，JDK6和7之间subString方法处理上有较大差异，但与其他方法一样，它实际上在最后也new了一个String对象来让自己看起来是可变的。

*  关于intern方法：
JDK6和7的重大区别是：
将String常量池从 Perm 区移动到了Java Heap区；
执行intern方法时，如果存在堆中的对象，会直接保存对象的引用，而不会重新创建对象。
 
  还需要注意的是intern方法版本之间的相同功能：
直接使用双引号声明出来的String对象会直接存储在常量池中；
如果不是用双引号声明的String对象，可以使用String提供的intern方法。intern方法会从字符串常量池中查询当前字符串是否存在，若不存在就会将当前字符串放入常量池中。

  在JDK6中不推荐使用intern方法，因为使用了固定的内存大小；JDK7和8的字符串池内存限制等于应用程序的内存限制，但也应当注意它的适当使用。

##### 4. 什么是自动拆装包？
* 自动拆装箱：JDK5开始提供这个功能，比如 ```Integer I = 10;``` 其实是 ```Integer I = new Integer(10);``` ，而 ```int j = I;``` 此时就是 ```int j = I.intValue(); ```。
* 需要注意的是，Integer 在装箱时会使用缓存的 -128 至 127 的数据，所以会有：

 ```
public class TestBoxing {
		public static void main(String[] args) {
			Integer t1 = new Integer(127);
			Integer t2 = new Integer(127);
			System.out.println(t1 == t2); // false
			Integer t3 = 127;
			Integer t4 = 127;
			System.out.println(t3 == t4); // true
			System.out.println(t1 == t4); // false
			Integer t5 = 128;
			Integer t6 = 128;
			System.out.println(t5 == t6); // false
		}
	}
 ```

##### 5. Java的作用域修饰词有哪些？它们的作用是什么？
* Java的作用域修饰词

|作用域|当前类|同一package|子孙类|其他package|
|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
|public|√|√|√|√|
|protected|√|√|√|×|
|default|√|√|×|×|
|private|√|×|×|×|

* Java变量的作用域

 在Java中，变量的作用域分为四个级别：类级、对象实例级、方法级、块级。

 * 类级变量又称全局级变量或静态变量，需要使用 ```static``` 关键字修饰。类级变量在类定义后就已经存在，占用内存空间，可以通过类名来访问，不需要实例化。
 * 对象实例级变量就是成员变量，实例化后才会分配内存空间，才能访问。
 * 方法级变量就是在方法内部定义的变量，就是局部变量。
 * 块级变量就是定义在一个块内部的变量，变量的生存周期就是这个块，出了这个块就消失了，比如 ```if```、```for``` 语句的块。

##### 6. Java的容器框架结构。它们对应的数据结构都是什么？它们有什么优缺点？哪些是RandomAccess的（这个和遍历的时候是使用迭代器的方式还是i的方式有很大关系）？（有时间最好把HashMap，ArrayList，LinkedList，HashTable，HashSet，搞安卓的同学最好把LinkedHashMap的源码也看了，因为这个和我们常用的一个内存缓存LruCache有很大关系）

Collection 
├List 
│├LinkedList 
│├ArrayList 
│└Vector 
│　└Stack 
└Set 
│├TreeSet
│├LinkedHashSet
│└HashSet 
└Queue
　├LinkedList
　└PriorityQueue
Map 
├Hashtable 
├HashMap 
├TreeMap 
├WeakHashMap
└LinkedHashMap
**其中的Vector和Stack类现在已经极少使用**
* **LinkedList**：其数据结构采用的是链表，此种结构的优势是删除和添加的效率很高，但随机访问元素时效率较 ```ArrayList``` 类低。
**ArrayList**：其数据结构采用的是线性表，此种结构的优势是访问和查询十分方便，但添加和删除的时候效率很低。
**Vector**：`Vector`是线程同步的，所以它也是线程安全的，而 ```ArraAylist``` 是线程异步的，是不安全的。如果不考虑到线程的安全因素，一般用 `Arraylist` 效率比较高。如果集合中的元素的数目大于目前集合数组的长度时， `Vector` 增长率为目前数组长度的100%，而 `Arraylist` 增长率为目前数组长度的50%，如果在集合中使用数据量比较大的数据，用vector有一定的优势。
**HashSet**：Set类不允许其中存在重复的元素（集），无法添加一个重复的元素（Set中已经存在）。 `HashSet` 利用 Hash 函数进行了查询效率上的优化，其 contain() 方法经常被使用，以用于判断相关元素是否已经被添加过。
**HashMap**：提供了 key-value 的键值对数据存储机制，可以十分方便的通过键值查找相应的元素，而且通过 Hash 散列机制，查找十分的方便。
**TreeMap**：`HashMap` 通过 hashcode 对其内容进行快速查找，而 `TreeMap` 中所有的元素都保持着某种固定的顺序。
**HashTable**：历史原因， `Hashtable` 是基于陈旧的 `Dictionary` 类的， `HashMap` 是Java 1.2引进的 `Map` 接口的一个实现；同步性， `Hashtable` 是线程安全的，也就是说是同步的，而 `HashMap` 是线程序不安全的，不是同步的；值，只有 `HashMap` 可以将空值作为一个表的条目的 key 或 value 。
**WeakHashMap**：一种改进的 HashMap ，它对 key 实行“弱引用”，如果一个 key 不再被外部所引用，那么该 key 可以被 GC 回收。
**PriorityQueue**：通过二叉小顶堆实现，可以用一棵完全二叉树表示
* 根据Oracle公司的官方文档：
**1. Collection 是对 Iterable 接口的拓展**。**故所有的 Collection 对象都可以使用 foreach 方式**，对元素进行方便的遍历。
由于 Iterable 接口中定义了的唯一方法为：返回一个Iterator对象，故所有的 Collection 都可以用 **对象名.iterator()**的方式获取该 collection 的迭代器 iterator 对象（结合工厂方法和内部类的思想来理解，其作用十分大）
**2. Map中提供了产生 Collection 的方法，以支持方便的对键值对的值域进行操作。**
Collection<V> **values**() 
**Returns:**a collection view of the values contained in this map.
* 关于 **RandomAccess**：ArrayList 、Vector 、Stack 都是 RandomAccess ，而 LinkedList 则是 Sequence 。

##### 7. Java容器相关的辅助类Arrays和Collections了解一下。

* **Arrays**：
```
 //填充数组
Arrays.fill(array, 5); 
 
 //将数组的第2和第3个元素赋值为8
Arrays.fill(array, 2, 4, 8);
 
 //对整个数组进行排序
Arrays.sort(array1);

 //对数组的第2个到第6个进行排序进行排序
Arrays.sort(array1,2,7);

 //比较数组元素是否相等
System.out.println("比较数组元素是否相等:Arrays.equals(array, array1):"+"\n"+Arrays.equals(array, array1));
int[] array2 = array1.clone();
System.out.println("克隆后数组元素是否相等:Arrays.equals(array1, array2):"+"\n"+Arrays.equals(array1, array2));
比较数组元素是否相等:Arrays.equals(array, array1):
false
克隆后数组元素是否相等:Arrays.equals(array1, array2):
true
 
 //使用二分搜索算法查找指定元素所在的下标（必须是排序好的，否则结果不正确）
Arrays.binarySearch(array1);
```

* **Collections**：

```
// Reverse it
Collections.reverse(kids);
//使用默认随机源对指定列表进行置换，所有置换发生的可能性都是大致相等的。
Collections.shuffle(kids);
//还有一些和 Arrays 的静态方法类似
```

##### 8. Java虚拟机的内存模型。堆，方法区，JVM栈，本地方法栈，程序计数器都是什么？这些不同虚拟机的具体实现是不同的，我们经常讨论的是HotSpot中的实现。堆的什么新生代老生代？Eden？Survivor的Form和To？永久代。
一个Java虚拟机实例在运行过程中有三个子系统来保障它的正常运行，分别是类加载器子系统， 执行引擎子系统和垃圾收集子系统。[图1](http://img.blog.csdn.net/20140317235203656?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvemhhbmdqZ19ibG9n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
* 1. 虚拟机并不神秘，在操作系统的角度看来，它只是一个普通进程。
 2. 这个叫做虚拟机的进程比较特殊，它能够加载我们编写的class文件。如果把JVM比作一个人，那么class文件就是我们吃的食物。
 3. 加载class文件的是一个叫做类加载器的子系统。就好比我们的嘴巴，把食物吃到肚子里。
 4. 虚拟机中的执行引擎用来执行class文件中的字节码指令。就好比我们的肠胃，对吃进去的食物进行消化。
 5. 虚拟机在执行过程中，要分配内存创建对象。当这些对象过时无用了，必须要自动清理这些无用的对象。清理对象回收内存的任务由垃圾收集器负责。就好比人吃进去的食物，在消化之后，必须把废物排出体外，腾出空间可以在下次饿的时候吃饭并消化食物。
* 参考资料：
  [JVM —— Java虚拟机架构](http://blog.csdn.net/seu_calvin/article/details/51404589)（注意堆和栈的区别）
 [JVM —— 内存管理和垃圾回收](http://blog.csdn.net/seu_calvin/article/details/51892567)
 [深入理解Java虚拟机到底是什么](http://blog.csdn.net/zhangjg_blog/article/details/20380971)

##### 9. Java的GC机制？内存回收策略有哪些？HotSpot中具体策略是什么？两次回收是怎么回事（和finilize有关）？如果有时间最好再去了解哪些是GC Root？

关于两次回收：
[Java finalize 和垃圾回收](https://zhidao.baidu.com/question/1755287962889924228.html)

其他见8参考资料。

##### 10. final，finally和finalize都是干什么的？带有finally又有return的方法中，finally中的代码是什么时候执行的，finally中改变了return的值，什么情况下会起作用什么情况下不会起作用？

以下参考：[final，finally，finalize 的区别](https://zhidao.baidu.com/question/71304229.html)

final —— 修饰符（关键字）如果一个类被声明为final，意味着它不能再派生出新的子类，不能作为父类被继承。因此一个类不能既被声明为 abstract的，又被声明为final的。将变量或方法声明为final，可以保证它们在使用中不被改变。被声明为final的变量必须在声明时给定初值，而在以后的引用中只能读取，不可修改。被声明为final的方法也同样只能使用，不能重载。 

finalize —— 方法名。Java 技术允许使用 finalize() 方法在垃圾收集器将对象从内存中清除出去之前做必要的清理工作。这个方法是由垃圾收集器在确定这个对象没有被引用时对这个对象调用的。它是在 Object 类中定义的，因此所有的类都继承了它。子类覆盖 finalize() 方法以整理系统资源或者执行其他清理工作。finalize() 方法是在垃圾收集器删除对象之前对这个对象调用的。

以下参考：[Java finally 语句到底是在 return 之前还是之后执行？](http://www.cnblogs.com/lanxuezaipiao/p/3440471.html)

* finally 块的语句在 try 或 catch 中的return语句执行之后返回之前执行且**finally 里的修改语句不能影响 try 或 catch 中 return 已经确定的返回值**，若 finally 里也有 return 语句则覆盖 try 或 catch 中的 return 语句直接返回。

* 1. 执行时机问题。finally 总会执行（除非是 System.exit() ），正常情况下在 try 后执行，抛异常时在 catch 后面执行。
 2. 返回值问题。可以认为 try（或者 catch ）中的 return 语句的返回值放入线程栈的顶部：如果返回值是基本类型则顶部存放的就是值，如果返回值是引用类型，则顶部存放的是引用。finally 中的 return 语句可以修改引用所对应的对象，无法修改基本类型。但不管是基本类型还是引用类型，都可以被 finally 返回的“具体值”具体值覆盖。
 3. 不建议在 finally 中使用 return 语句，如果有，eclipse 会 warning “finally block does not complete normally”。

##### 11. Java 4种引用，强软弱虚引用都是什么？

见8参考资料。

##### 12. Java怎样开启一个线程？线程池是干什么的？有哪些常用的线程池？优缺点是什么？

* 开启线程有两种方式：
 1. 继承 Thread 类，扩展线程。
 2. 实现 Runnable 接口。

* 线程池是用来管理调度多个线程的，它使用实现了接口 Executor 的 ExecutorService ，常常用 Executors 的静态函数来创建线程池，ExecutorService 分四个类型：
 newCachedThreadPool 、newFixedThreadPool 、newSingleThreadExecutor 、newScheduleThreadPool
 详见：[线程、多线程与线程池总结](http://www.jianshu.com/p/b8197dd2934c) 和 [Java 常用的几种线程池比较](http://www.cnblogs.com/aaron911/p/6213808.html)

##### 13. Java中同步的方式有哪些？类锁和对象锁。共享锁和排斥锁。wait，notify，notifyAll。await和signal，signalAll。wait是在if中使用还是循环中使用？

* 实现同步的方式
 [Java 中线程同步的方法（7种）汇总](http://www.cnblogs.com/duanxz/p/3709608.html)

* 类锁和对象锁
[Java 类锁和对象锁实践](http://ifeve.com/java-locks/)

* wait 、notify 、notifyAll 在 synchronize 使用，await 、signal 、signalAll 在 lock 使用。前者用的情况较多。

* 推荐 wait() 在循环中使用。

##### 14. volidate关键字的作用？（提供可见性和顺序性，自己去找相关文章理解，不要忘记顺序性！！）

* volidate 关键字
[Java 理论与实践: 正确使用 Volatile 变量](http://www.ibm.com/developerworks/cn/java/j-jtp06197.html)

* 可见性、顺序性
[深入理解 Java 虚拟机笔记---原子性、可见性、有序性](http://www.tuicool.com/articles/ru6vUvn) 和 [Java 并发（共享，互斥，原子，可见，顺序性）](http://blog.csdn.net/svmachine/article/details/51427955)

##### 15. 面向对象的三大特征。Java多态的实现原理？动态绑定的理解？

* 三大特性是：封装、继承、多态。

* Java 多态实现原理参考：
 [Java 技术 —— 多态的实现原理](http://blog.csdn.net/sinat_34311901/article/details/52208124)
 * 如果子类改写了父类的方法，那么子类和父类的那些同名的方法共享一个方法表项。
  因此，方法表的偏移量总是固定的。所有继承父类的子类的方法表中，其父类所定义的方法的偏移量也总是一个定值。
  父类的任意一个方法，在它们的方法表和其子类的方法表中的位置 (index) 是一样的。这样 JVM 在调用实例方法其实只需要指定调用方法表中的第几个方法即可。
 * 接口方法的调用（搜索方法表）总是慢于类方法的调用

以下参考：[深入理解 Java 多态原理](http://www.cnblogs.com/startRuning/p/5673485.html)

* 动态绑定又称后期绑定、运行时绑定，它是在程序运行时根据对象的类型进行绑定，涉及到JVM管理下的一个重要的数据结构——方法表，方法表以数组的形式记录当前类及其所有父类的可见方法字节码在内存中的直接地址。
 
 动态绑定的具体调用过程：

 1. 首先会找到被调用方法所属类的全限定名
 2. 在此类的方法表中寻找被调用方法，如果找到，会将方法表中此方法的索引项记录到常量池中（这个过程叫常量池解析），如果没有，编译失败。 
 3. 根据具体实例化的对象找到方法区中此对象的方法表，再找到方法表中的被调用方法，最后通过直接地址找到字节码所在的内存空间。

##### 16. 成员内部类，静态内部类，匿名内部类，局部内部类。.this和.new。

[Java 内部类详解](http://www.cnblogs.com/dolphin0520/p/3811445.html) 
[Java 提高篇(八) —— 详解内部类](http://www.cnblogs.com/chenssy/p/3388487.html)

##### 17. Java Object中的基本方法有哪些？

[[Java] Object 有哪些公用方法？](http://www.cnblogs.com/zhousysu/p/5483795.html)

##### 18. Java clone()的使用。

以下参考：[详解 Java 中的 clone 方法 —— 原型模式](http://blog.csdn.net/zhangjg_blog/article/details/18369201)

> 如果想要深拷贝一个对象， 这个对象必须要实现 Cloneable 接口，实现 clone 方法，并且在 clone 方法内部，把该对象引用的其他对象也要 clone 一份 ， 这就要求这个被引用的对象必须也要实现 Cloneable 接口并且实现 clone 方法。

##### 19. Java hashCode 和 equals 方法。

以下参考： [浅谈 Java 中的 hashCode 方法](http://www.cnblogs.com/szlbm/p/5806226.html)

* hashCode 方法的存在提高了比较两个对象是否相等的效率。
* 在程序执行期间，只要 equals 方法的比较操作用到的信息没有被修改，那么对这同一个对象调用多次，hashCode 方法必须始终如一地返回同一个整数。
* 如果两个对象根据 equals 方法比较是相等的，那么调用两个对象的 hashCode 方法必须返回相同的整数结果。
* 如果两个对象根据 equals 方法比较是不等的，则 hashCode 方法不一定得返回不同的整数。

##### 20. equals 方法和 == 。

对于基本类型，没有 equals 方法，== 用来判断它们的值是否相等。
对于引用类型，== 用来判断他们的地址是否相等，而 equals 方法要看具体的实现，如 String 的就是比较它们存在 char 数组里的值是否相等。

##### 21. Java的Class对象。

Class类封装一个对象和接口运行时的状态，当装载类时，Class类型的对象自动创建。

参考资料：
[Java 中 Class 类是什么类](https://zhidao.baidu.com/question/386608758.html)
[Java 中 Class<?> 对象如何作为类来使用？](https://zhidao.baidu.com/question/1958715269973862300.html) 

##### 22. Java反射机制。

反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制。

参考资料：
[Java 反射机制详解](http://www.cnblogs.com/lzq198754/p/5780331.html)
[Java 反射机制](http://www.cnblogs.com/jqyp/archive/2012/03/29/2423112.html)
[Java 反射机制的学习](http://www.cnblogs.com/keis/archive/2011/03/29/1998736.html)

##### 23. Java的静态代理和动态代理。

InvocationHandler 接口、invoke 方法、newProxyInstance 方法

参考资料：
[Java 静态代理与动态代理](https://my.oschina.net/huhaoren/blog/288594)
[Java 动态代理作用是什么？ - 回答作者: Intopass](http://zhihu.com/question/20794107/answer/75164285)


##### 24. Java 注解相关。注解的生存期。注解的作用有哪些？（如果你用过 ButterKnife 这种注解框架，那么最好知道它是什么时候处理注解的，怎样处理的具体代码，有兴趣和时间可以自己研究。）

* @Target
@Retention
@Documented
@Inherited

 参考资料：
[深入理解Java ：注解（Annotation）--注解处理器](http://www.cnblogs.com/peida/archive/2013/04/26/3038503.html)
[深入理解Java ：注解（Annotation）自定义注解入门](http://www.cnblogs.com/peida/archive/2013/04/24/3036689.html)

* ButterknifeProcessor 的 process 方法
 
 参考资料：
[ButterKnife 源码解析(1)](https://zhuanlan.zhihu.com/p/20201755)
[ButterKnife 源码解析(2)](https://zhuanlan.zhihu.com/p/20231567)

##### 25. Java泛型。编译期擦除技术。擦除引发的问题。

泛型的本质是参数化类型，也就是说所操作的数据类型被指定为一个参数。
引入泛型的好处是在编译的时候检查类型安全，并且所有的强制转换都是自动和隐式的，以提高代码的重用率。
Java 中的泛型，只在编译阶段有效。在编译过程中，正确检验泛型结果后，会将泛型的相关信息擦除，并且在对象进入和离开方法的边界处添加类型检查和类型转换的方法。也就是说，成功编译过后的 class 文件中是不包含任何泛型信息的。泛型信息不会进入到运行时阶段。

参考资料：
[Java 技术 —— Java 泛型详解](http://www.cnblogs.com/lzq198754/p/5780426.html)
[Java 泛型的实现：原理与问题](http://blog.csdn.net/yi_afly/article/details/52002594)

##### 26. Java创建一个线程安全的单例。或者其他比较常见的设计模式。（这个一般他会问你你知道什么，然后让你写什么，或者说这个模式用来解决什么问题。）

* 饿汉式单例
* 懒汉式 synchronized 单例，双重检查，volatile

参考资料：[Java 中四种线程安全的单例模式实现方式](https://my.oschina.net/u/576554/blog/513454)

##### 27. Java枚举的理解。

* 枚举的本质是一个继承 java.lang.Enum 的类，枚举常量就是枚举的一个个的实例。枚举可以有属性和方法，来强化枚举的功能。

* 普通常量问题：
 1. 无法限制开发员继承/实现接口。
 2. 常量作为参数时，是 String 、int 等弱类型,开发员传入没有在常量接口里定义的值，这个问题无法通过编译器发现。
 3. 由于开发员可以直接写常量值，所以不能用 == 对比，只能用 equals 对比，不能优化性能。
 4. 编译时，是直接把常量的值编译到类的二进制代码里，常量的值在升级中变化后，需要重新编译所有引用常量的类，因为里面存的是旧值。

* 枚举相比于此：
 1. 私有构造函数，避免被继承和扩展。
 2. 定义方法的参数时，必须用枚举常量类类型，这样就转变成了强类型，不会出现弱类型引起的问题。
 3. 常量值地址唯一，可以用 == 直接对比，性能会有提高。
 4. 编译时，没有把常量值编译到代码里，即使常量的值发生变化也不会影 响引用常量的类。

参考资料：
[Java 枚举7常见种用法](http://jingyan.baidu.com/article/e4d08ffdcf664d0fd2f60dbf.html)
[Java 枚举的使用， 常量与枚举的区别](https://my.oschina.net/dyyweb/blog/617493)

##### 28. Java 操作文件的基本 API，RandomAccessFile。NIO。

* 基本API，RandomAccessFile 
[Java API 文件基本的输入输出流](http://blog.csdn.net/armandxu/article/details/45130537)
* NIO 与 IO 对比
[Java 对比 IO 和 NIO 的文件读写性能测试](http://www.zuidaima.com/share/1550463508466688.htm)
* **NIO 教程**
[Java NIO 系列教程](http://ifeve.com/java-nio-all/)

##### 29. Java 访问网络的基本 API。Socket ，DatagramSocket ，URLConnection。

* TCP  &  Socket & HttpURLConnection & HttpClient
[Android 学习笔记（十一）Android 网络编程之 Socket & Http ](http://www.cnblogs.com/cxcco/archive/2012/02/09/2344455.html)
[Java 与 Http 协议( HttpURLConnection 和 HttpClient )](http://blog.csdn.net/jzhf2012/article/details/8886633)
* UDP & DatagramSocket
[使用 DatagramSocket 与 DatagramPacket 传输数据](http://blog.csdn.net/jediael_lu/article/details/12650153)

##### 30. Java异常有几种？什么是运行时异常，有什么特点？

* **运行时异常**（RuntimeException）和**非运行时异常**也称之为**不检查异常**（Unchecked Exception）和**检查异常**（Checked Exception）
* 在 Java 的标准包 java.**lang**、java.**util** 和 java.**net** 中定义的异常都是非运行异常。
* 运行时异常，程序中可以选择捕获处理，也可以不处理。这些异常一般是由程序逻辑错误引起的，程序应该从逻辑角度尽可能避免这类异常的发生。
* 运行时异常的**特点**是 Java 编译器不会检查它，也就是说，当程序中可能出现这类异常，即使没有用 try-catch 语句捕获它，也没有用 throws 子句声明抛出它，也会编译通过。
* 常见异常种类：[Java 常见异常种类](http://www.cnblogs.com/cvst/p/5822373.html)
* 更多参考资料：[深入理解 Java 异常处理机制](http://blog.csdn.net/hguisu/article/details/6155636)

---

# Android 相关

##### 1. Activity的生命周期。启动模式。

* 生命周期
[Android Activity / Fragment lifecycle](https://github.com/xxv/android-lifecycle)
* 启动模式（standard ，singleTop ，singleTask ，singleInstance）
[深入讲解 Android 中 Activity launchMode](http://droidyue.com/blog/2015/08/16/dive-into-android-activity-launchmode/)

##### 2. Service的生命周期，和两种启动方式。

* 生命周期
[Service 生命周期及使用](http://blog.csdn.net/wangkuifeng0118/article/details/7016201)
* 启动方式
startService() 和 bindService()
[Android Service 完全解析，关于服务你所需知道的一切](http://blog.csdn.net/guolin_blog/article/details/11952435)

##### 3. Fragemnt的生命周期和使用场景。（使用场景结合自己用过的讲就好了，不过一般有：实现手机平板适配，Fragment + FragmentAdapter + ViewPager 实现分页滑动效果，实现快速的页面切换，和封装相同的 UI 逻辑提高代码重用性）Fragment 要注意的问题。（主要Fragment嵌套出现的问题）

* 生命周期
[Android Activity / Fragment lifecycle](https://github.com/xxv/android-lifecycle)
* 使用注意
[Fragment 全解析系列（一）：那些年踩过的坑](http://www.jianshu.com/p/d9143a92ad94)

##### 4. BoardCastReciever 的两种注册方法。

* 静态注册和动态注册、Normal broadcasts 和 Ordered broadcasts
 [Android 开发之 BroadcastReceiver 详解](http://blog.csdn.net/fengyuzhengfan/article/details/38414625)

##### 5. ContentProvider 的基本使用方法和作用。ContentValue 的使用方法，它和 HashMap 的区别是什么？

* ContentProvider & ContentValues & ContentResolver
看了一圈后发现还不如看官方文档……
[ContentProvider](http://www.android-doc.com/reference/android/content/ContentProvider.html)
[ContentValues](http://www.android-doc.com/reference/android/content/ContentValues.html)
[ContentResolver](http://www.android-doc.com/reference/android/content/ContentResolver.html)
[UriMatcher](http://www.android-doc.com/reference/android/content/UriMatcher.html)
[额外参考](http://www.jianshu.com/p/f5ec75a9cfea)
[你知道 URL、URI 和 URN 三者之间的区别吗？](http://www.chinaz.com/web/2015/0923/450202.shtml)
* ContentValue 和 HashMap 的区别
ContentValues 和 HashMap 相似都是一种可用于存储的类，但是两者最大的区别就在于，ContentValues 只能存储基本类型的数据，而 HashMap 却可以存储对象。

##### 6. SharedPreferences 三种获得方法和区别，commit 和 apply 的区别。

[Android 获取 SharedPreferences 的三种方法的区别](http://www.cnblogs.com/u3shadow/p/4299662.html)

* commit 和 apply 的区别 （ [参考资料](http://www.jianshu.com/p/c8d10357c939) ）
 1. commit 和 apply 虽然都是原子性操作，但是原子的操作不同，commit 是提交到数据库，所以从提交数据到存在 Disk 中都是同步过程，中间不可打断；而 apply 方法的操作是提交到内存中，而非数据库，所以在提交到内存中时不可打断，之后再异步提交数据到数据库中，因此也不会有相应的返回值。
 2. 所有 commit 提交是同步过程，效率会比 apply 异步提交的速度慢，但是 apply 没有返回值，永远无法知道存储是否失败。
 3. 在不关心提交结果是否成功的情况下，优先考虑 apply 方法。


##### 7. SQLite 数据库的基本操作 API（最好要会写 SQL 语句，不过之后实际应用的时候都用封装好的 CRUD 方法，不过有时候面试官会考。尤其注意创建表，数据库升级时更新升级表的 SQL 语句的写法，这个是要我们写原生 SQL 语句的，不过之后工作中会使用一些数据库的框架，这些也不会用了。但是为了应付面试，注意准备一下吧。）

参考郭霖的[**博客**](http://blog.csdn.net/guolin_blog/article/details/38461239)

##### 8. Android 基本网络库 okHttp 的使用方法和优缺点。（优缺点很重要）

* 使用方法
[Android okHttp 网络请求之 Get / Post 请求](http://www.cnblogs.com/whoislcj/p/5526431.html)
* 优点
okHttp 是高性能的 http 库，支持同步、异步，而且实现了多种如spdy、http2、websocket 等协议，API 简洁易用，和 Volley 一样实现了 Http 协议的缓存。
* 缺点
第一是消息回来需要切到主线程，主线程方面要自己写；第二是传入调用比较复杂。

##### 9. Android 执行异步有哪些方法？线程间通讯的方式？

* 异步方法
Thread、Runnable
AsyncTask、Handler
RxJava
* 线程间通讯
Looper & Handler & Message
AsyncTask

##### 10. AsnycTask 的优缺点？串行or并行？内部线程池是怎样的？（有时间的话可以看看 AsyncTask 的源码，还是挺经典的，可以学习到不少东西的。不同版本，串行和并行有变化，最新的是既可以并行也可以串行。）

* 优点
拥有线程池，避免了频繁创建销毁线程的开销；执行完后台任务后可以很方便的更新UI。
* 缺点
[Android 中糟糕的 AsyncTask ](http://droidyue.com/blog/2014/11/08/bad-smell-of-asynctask-in-android/)
* 源码分析
[深入理解 AsyncTask 的工作原理](http://www.cnblogs.com/absfree/p/5357678.html)
[Android AsyncTask 完全解析，带你从源码的角度彻底理解](http://blog.csdn.net/guolin_blog/article/details/11711405)

##### 11. 常用的布局有哪些？

LinearLayout、RelativeLayout、TableLayout、FrameLayout、GridLayout、ConstraintLayout

##### 12. View 的绘制流程？

onMeasure，onLayout，onDraw

**更多资料见**
[安卓自定义 View 进阶-分类与流程](http://www.gcssloop.com/customview/CustomViewProcess)

##### 13. View ，SurfaceView ，GLSurfaceView 有什么区别？

[Android View SurfaceView GLSurfaceView 的关系和区别](http://blog.csdn.net/zcmain/article/details/14454953)
[Android 5.0 (Lollipop) 中的 SurfaceTexture，TextureView, SurfaceView 和 GLSurfaceView](http://blog.csdn.net/jinzhuojun/article/details/44062175)

##### 14. ListView 的优化。

convertView、ViewHolder、分批加载
[Android 中 ListView 的几种常见的优化方法](http://blog.csdn.net/cyp331203/article/details/39533399)

##### 15. RecyclerView 与 ListView 的区别。RecyclerView 的优缺点。（这个如果你主动提到了 RecyclerView ，面试官很有可能跟进这样问。再次强调：尤其注意缺点，这个是我们不太容易注意的。）

* 优点
强制实现 ViewHolder；
多种 LayoutManager 实现常用业务效果；
ItemAnimator 列表动画实现；
* 缺点
间隔符必须自己使用 RecyclerView.ItemDecoration 类来实现；
RecyclerView 通过 RecyclerView.OnItemTouchListener 接口来探测触摸事件，虽然增加了实现的难度。
* 参考资料
[Android 控件 RecyclerView 和 ListView 的异同](http://www.tuicool.com/articles/aeeaQ3J)
[RecyclerView 优秀文集](https://github.com/CymChad/CymChad.github.io)

##### 16. WebView 的基本使用方法。WebViewClient 和 WebChromeClient。

* WebView 的基本使用方法
[Android WebView 使用深入浅出](http://www.cnblogs.com/soaringEveryday/p/4495221.html)
[Android WebView 开发详解](http://blog.csdn.net/typename/article/details/39030091)
* WebViewClient 和 WebChromeClient
WebViewClient主要帮助WebView处理各种通知、请求事件；
WebChromeClient主要辅助WebView处理JavaScript的对话框、网站图标、网站title、加载进度等。
[WebViewClient 与 WebChromeClient 的区别](http://blog.csdn.net/linghu_java/article/details/6927439)

##### 17. Android 和 H5 通信。（基本上就是 JS 和 Android 原生互调）

参考资料： 
[好好和 H5 沟通！几种常见的 Hybrid 通信方式](http://zjutkz.net/2016/04/17/%E5%A5%BD%E5%A5%BD%E5%92%8Ch5%E6%B2%9F%E9%80%9A%EF%BC%81%E5%87%A0%E7%A7%8D%E5%B8%B8%E8%A7%81%E7%9A%84hybrid%E9%80%9A%E4%BF%A1%E6%96%B9%E5%BC%8F/)

##### 18. Intent 的作用。

* 基本概念
Intent 封装了 Android 应用程序需要启动某个组件的“意图”，Intent 类的对象是组件间的通信载体，一个 Intent 对象就是一组信息，其包含接收 Intent 组件所关心的信息（如 Action 和 Data）和 Android 系统关心的信息（如 Category 等）。也就是说，发送“意图”的组件通过 Intent 对象所包含的内容，来启动指定的（即 Component 属性)或通过筛选（即 Action & Category 属性）的某（些）组件，然后实施相应的动作（即 Action 属性）并传递相应的数据（即 Data 属性）以便完成相应的动作。
* 具体体现：
 * 激活一个Activity
 * 开启服务
 * 发送广播
 * 访问ContentProvider

[Android 笔记：深入理解 Intent 和 IntentFilters (一)](http://blog.csdn.net/u012637501/article/details/41080891)
[PenddingIntent 官方文档](http://www.android-doc.com/reference/android/app/PendingIntent.html)

##### 19. Android 的屏幕适配方法有哪些？

[Android 屏幕适配方案](http://blog.csdn.net/lmj623565791/article/details/45460089)
[Android 百分比布局库（percent-support-lib）解析与扩展](http://blog.csdn.net/lmj623565791/article/details/46695347)
[安卓约束控件（ConstraintLayout）扁平化布局入门](http://www.jianshu.com/p/792d2682c538)

##### 20. XML 加载的几种方式，各自的原理。都有什么优缺点？

DOM：检索和更新效率高；对于特别大的文档，解析和加载整个文档将会很耗资源。
SAX：解析速度快，占用内存少；代码量大，不能倒退。
PULL：小巧轻便，解析速度快，简单易用，可随时停止解析，适用于 XML 文档较大但只需要文档的一部分时。
Android.util.Xml：类似 SAX 但比 SAX 简单。

DOM 的工作原理：使用 DOM 对 XML 文件进行操作时，首先要解析文件，将文件分为独立的元素、属性和注释等，然后以节点树的形式在内存中对 XML 文件进行表示，就可以通过节点树访问文档的内容，并根据需要修改文档——这就是 DOM 的工作原理。
SAX 的工作原理：SAX的工作原理简单地说就是对文档进行顺序扫描，当扫描到文档(document)开始与结束、元素(element)开始与结束、文档(document)结束等地方时通知事件处理函数，由事件处理函数做相应动作，然后继续同样的扫描，直至文档结束。
PULL 的工作原理：XML PULL 提供了开始元素和结束元素。当某个元素开始时，我们可以调用 parser，nextText 从 XML 文档中提取所有字符数据。当解释到一个文档结束时，自动生成 EndDocument 事件。

[Android 实现 XML 解析的几种技术](http://www.cnblogs.com/weixing/p/3243366.html)

##### 21. Android 中动画的分类，各自的优缺点。（基本上讲了帧动画， Tween 动画，属性动画就 OK 了，至于 Transition Framework 可讲可不讲。）

[Android 应用开发之所有动画使用详解](http://blog.csdn.net/yanbober/article/details/46481171)
[Android 中的 AnimationSet 使用](http://blog.csdn.net/yuzhiboyi/article/details/7731826)

##### 22. Android 中图片加载和缓存怎么做？（一般原生的话加载使用 BitmapFactory ，缓存使用 LruCache 就可以了。LruCache 的原理再讲讲基本差不多了。如果你使用过这方面的第三方库，自己翻过源码的话再讲，没有的话千万不要讲。因为你只要提了第三方库，面试官紧跟着的就是为什么使用这个库，这个库的优缺点是什么？他的原理是什么？所以如果你看过源码，大胆的讲，让面试官知道你知识的深度。）

* [详细解读 LruCache 类](http://www.cnblogs.com/tianzhijiexian/p/4248677.html)
* [Google 推荐的图片加载库 Glide 介绍 —— 与 Picasso 对比](http://jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0327/2650.html)
Picasso 加载图片质量更高，库大小和方法数较少，但加载速度慢。
Glide 加载速度快、支持GIF（较耗费内存）、支持thumbnail、可以配置图片显示的动画（Picasso 只有一个淡入动画），但图片质量不高、库大小和方法数较多。
推荐使用 Glide，但是将 Bitmap 格式换成 ARGB_8888、让 Glide 缓存同时缓存全尺寸和改变尺寸两种。
* [Fresco & Glide & Picasso对比分析](http://www.jianshu.com/p/ca5ce4444c37)
Fresco：简单配置即可使用、3级缓存设计、用很多种方式来自定义图片加载过程、支持WebP解码、动图加载、图片的渐进式呈现，但包大小很大，所以 Fresco 在图片较多的应用中更能凸显其价值，如果应用没有太多图片需求，还是不推荐使用 Fresco。

##### 23. JSON 相关。

[Android 之 JSON 格式数据解析](http://blog.csdn.net/hantangsongming/article/details/42234293)

##### 24. Android 中方法数 65535 问题的原因和解决办法。

[彻底解决 Android 应用方法数不能超过65K的问题](http://blog.csdn.net/yuanzeyao/article/details/41809423)
[Android 工程方法数超过65535，解决办法](http://www.jianshu.com/p/f046b3f49e49)

##### 25. Android 中的消息传递机制。（ Message ，Handler ，MessageQueue ，Looper 那个玩意）

参考资料：
[Android 消息机制原理博文参考](http://www.jianshu.com/p/d9c42d08a3ca)
[Android 线程,线程池使用及原理博文参考](http://www.jianshu.com/p/a79b8765f729)

##### 26. 有哪些容易造成内存泄漏的原因？

[Android 性能优化之常见的内存泄漏](http://blog.csdn.net/u010687392/article/details/49909477)

##### 27. MVC ，MVP 。（ MVVM 一般不会问，以及相关的 DataBinding 呀随便了解一下就OK，不要把重点放在这个上面）

[深入浅出 MVC、MVVM、MVP](http://www.jianshu.com/p/50131586a75c)
要多在项目里实践。

##### 28. 什么是 ANR ？什么原因？怎么解决？

* ANR：Application Not Responding 程序无响应。
* 原因：在Android里，应用程序的响应性是由 Activity Manager 和 WindowManager 系统服务监视的 。
当它监测到以下情况中的一个时，Android 就会针对特定的应用程序显示 ANR：
 * KeyDispatchTimeout (5 seconds) —— 主要类型
按键或触摸事件在特定时间内无响应
 * BroadcastTimeout (10 seconds)
BroadcastReceiver 在特定时间内无法处理完成
 * ServiceTimeout (20 seconds) —— 小概率类型
Service在特定的时间内无法处理完成
* 解决：查看 trace.txt

* 参考资料：[说说 Android 中的 ANR ](http://droidyue.com/blog/2015/07/18/anr-in-android/)

##### 29. 什么是 Force Close ？

Force Close：强制终止。
[Android 处理崩溃的一些实践](http://droidyue.com/blog/2015/12/06/practise-about-crash-in-android/)

##### 30. 什么是 OOM ？

OOM：Out Of Memory，内存耗尽。

---

#### 下面的实习生一般并不会遇到：
##### 1. Android 的 Touch 事件分发过程。

[安卓自定义 View 进阶 —— 事件分发机制原理](http://www.gcssloop.com/customview/dispatch-touchevent-theory)

##### \* 2. Android 应用从 Launcher 的启动过程。

Launcher 继承于 Activity，使用了隐式 Intent。
[Android 系统默认 Home 应用程序（Launcher）的启动过程源代码分析](http://blog.csdn.net/luoshengyang/article/details/6767736)

##### 3. Android 中进程保活的方法。

[关于 Android 进程保活，你所需要知道的一切](http://www.jianshu.com/p/63aafe3c12af)

##### \* 4. Android 中的 IPC Binder 是怎么回事？出于什么考虑？

[Android 深入浅出之 Binder 机制](http://www.cnblogs.com/innost/archive/2011/01/09/1931456.html)
[Android 进程间通信（IPC）机制 Binder 简要介绍和学习计划](http://blog.csdn.net/luoshengyang/article/details/6618363)
[为什么 Android 要采用 Binder 作为 IPC 机制？](https://www.zhihu.com/question/39440766)

##### \* 5. Android 中的 Zygote 是什么鬼？出于什么考虑？

[Android 系统进程 Zygote 启动过程的源代码分析](http://blog.csdn.net/luoshengyang/article/details/6768304)

##### 6. Android 中的 DVM 和 JVM 有什么区别？又加入的 Android Runtime 是出于什么考虑？有什么优势？

[JVM、DVM、ART及 Android 基本组件简介](http://www.07net01.com/program/2016/02/1228718.html)

##### \* 7. Android 中各个版本的功能特性？

[Android 各个版本代号及其特性](http://blog.csdn.net/qq_23547831/article/details/50370429)

##### 8. Android 中如何检测内存泄漏？

[Android 内存泄漏的简单检查与分析方法](http://dev.qq.com/topic/57d14047603a5bf1242ad01b)

##### 9. 进行过哪些性能优化。（这个就要据自己实际的例子）

暂无。

##### \* 10. AIDL 的使用。

 [Android ：学习 AIDL ，这一篇文章就够了(上)](http://blog.csdn.net/luoyanglizi/article/details/51980630)
 [Android ：学习 AIDL ，这一篇文章就够了(下)](http://blog.csdn.net/luoyanglizi/article/details/52029091)

##### 11. NDK 开发。

编译、基本 API 了解和使用。

##### 12. Android 中用过哪些第三方库？他们的工作原理是什么？优缺点？（这些要看个人了。自己没事可以去翻翻自己用的第三方库的源码。可以学习到不少东西。）

ButterKnife、MPAndroidChart。

##### \* 13. Android 的插件化技术和热修复技术。

略……高级知识。

##### 14. Android 混淆。

[5分钟搞定 Android 混淆](http://www.jianshu.com/p/f3455ecaa56e)
[为什么这么多商业 Android 开发者不混淆代码？](https://www.zhihu.com/question/37446729)

##### 15. Android 反编译。

Dex2Jar + Java Decompiler。

---

# 计算机网络相关

##### 1. TCP。

推荐阅读《计算机网络：自顶而下方法》一书。

##### 2. UDP。

同上。

##### \* 3. OSI 7层模型。

参考资料：
[TCP / IP 四层模型和 OSI 七层模型对应表](http://blog.csdn.net/petershina/article/details/8645289)
[OSI 七层模型、TCP / IP 四层模型](http://blog.csdn.net/qfikh/article/details/52661745)

##### \* 4. TCP/IP 4层模型。

同上。

##### 5. Http 和一些错误码代表的含义。

[常见 HTTP 错误代码大全](http://blog.csdn.net/xinxin19881112/article/details/6565823)

##### \* 6. SPDY 协议。（因为 OkHttp 里用这个协议，到时候扯扯淡说不定能加分）

[SPDY 和你想象的不一样](https://www.oschina.net/translate/not-as-spdy-as-you-thought) 

---

#后记

过几天就过年了，于是打算在此之前把[**柴泽建_Jack**](http://www.jianshu.com/u/dd5f6394457d)前辈整理的知识点自己吸收一下。最终花了半个月完成了整理，算是大致明白了一些明年需要努力的方向，目前为止小有收获 :) 。
如果有其他相关推荐博客和有趣的看法，欢迎在评论区提出 ;) 。

年后打算对下列知识点进行深入：

* NIO

* Fragment

* Android 中的消息传递机制

* **自定义View**（这个应该是我寒假和第二学期都会一直研究的方向）

* 内存泄漏检测

* RecyclerView

* 源码分析系列：

 * AsnycTask 源码分析
 * LitePal 源码分析
 * Picasso & Glide & Fresco 源码分析

如果研究得足够深入，应该会发一些实战相关的博客 :) 。

无论是对点了喜欢 / 收藏的各位，还是我来说，现在，还只是刚刚开始。
我一直觉得 Android 的涉及的知识面相当广泛（见 [Android App开发技能图谱](https://github.com/mingjunli/AndroidDevResources/blob/master/Android-App%E5%BC%80%E5%8F%91%E6%8A%80%E6%9C%AF%E5%9B%BE%E8%B0%B1.md) ， 我目前在右边还处于进阶懵逼阶段），所以在此希望所有对 Android 抱有热情的人，都能找到自己感兴趣的方向研究下去、坚持下去，并因此小有成就 ;) 。

最后祝自己今年暑假找到好工shi作xi :) 。