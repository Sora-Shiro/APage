# 问题 
Reverse digits of an integer.

**Example1:** x = 123, return 321

**Example2:** x = -123, return -321

倒转 int 型数字。


# 自己的解决方案

这次也想了两种方法，后者更简短美观一些。

第一种：

```
public int reverse(int x) {
        long xl = x;
		if (x < 0) {
			xl = -xl;
		}

		char[] c = new Long(xl).toString().toCharArray();
		StringBuffer sb = new StringBuffer();
		
		for (int i = c.length - 1; i >= 0; i--) {
			sb.append(c[i]);
		}
		
		Long l = new Long(sb.toString());
		if (l.longValue() > Integer.MAX_VALUE) {
			return 0;
		}
		
		int buff = l.intValue();
		if (x < 0) {
			buff = -buff;
		}
		return buff;
    }
```

第二种：

```
public int reverse_new(int x) {
        long result = 0;
		int digit = 0;

		while (x != 0) {
			digit = x % 10;
			result = (result * 10 + digit);
			x /= 10;
		}

		if (result > Integer.MAX_VALUE || result < Integer.MIN_VALUE) {
			return 0;
		}

		return (int) result;
    }
```

两种方法都是用更大存储的类型来判断倒转后是否溢出，最终测试速度也几乎一样，不同的是前者是将给定数字 x 化成字符串后倒转实现，后者是直接用求余和 while 循环实现。

# 别人的解决方案 ***[1]***

```
public int reverse_better(int x) {
	    int result = 0;

	    while (x != 0)
	    {
	        int tail = x % 10;
	        int newResult = result * 10 + tail;
	        if ((newResult - tail) / 10 != result)
	        { return 0; }
	        result = newResult;
	        x = x / 10;
	    }

	    return result;
	}
```

运行速度和核心算法的一部分虽然跟我的方法二一样，但是他没有用到任何 flag ，更没有用更大存储的类型来处理，而是直接通过计算来判断是否溢出：
>If overflow exists, the new result will not equal previous one.

服气。

# 学到的知识点

- 判断是否溢出除了用更大存储的类型来判断，也可以尝试使用逆推法。

# 相关引用
> [1] : https://discuss.leetcode.com/topic/6104/my-accepted-15-lines-of-code-for-java