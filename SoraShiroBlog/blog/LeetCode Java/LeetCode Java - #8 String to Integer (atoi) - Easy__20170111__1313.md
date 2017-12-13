# 问题 
Implement atoi to convert a string to an integer.
**Hint:** Carefully consider all possible input cases. If you want a challenge, please do not see below and ask yourself what are the possible input cases.
**Notes:** It is intended for this problem to be specified vaguely (ie, no given input specs). You are responsible to gather all the input requirements up front.

将给定的字符串转换成数字（atoi）。


# 自己的解决方案

```
public int myAtoi(String str) {
        str = str.trim();
		char[] c = str.toCharArray();
		long result = 0;
		int i = 0;
		boolean positive = false;
		boolean negative = false;
		int pPosition = -2;
		int nPosition = -2;
		for (; i < c.length && i < 12; i++) {
			if ((c[i] > '9' || c[i] < '0') && c[i] != '-' && c[i] != '+') {
				break;
			}
			if (c[i] == '+') {
				if (i + 1 < c.length && (c[i + 1] <= '9' || c[i + 1] >= '0')
						&& !positive) {
					positive = true;
					pPosition = i;
					if (Math.abs(pPosition - nPosition) == 1) {
						return 0;
					}
					continue;
				} else {
					break;
				}
			}
			if (c[i] == '-') {
				if (!negative) {
					negative = true;
					nPosition = i;
					if (Math.abs(pPosition - nPosition) == 1) {
						return 0;
					}
					continue;
				} else {
					break;
				}
			}

			result = result * 10 + (c[i] - '0');
		}
		if (negative) {
			result = -result;
		}
		if (result > Integer.MAX_VALUE || result < Integer.MIN_VALUE) {
			if (result > 0) {
				return 2147483647;
			}
			if (result < 0) {
				return -2147483648;
			}
		}
		return (int) result;
    }
```

其实 pPosition 和 nPosition 只是拿来判断 -+是否连接在一起，看了别人的方法后感觉太多此一举了，关于 -+ 的处理完全可以在循环之外。

# 别人的解决方案 ***[1]***

```
public int myAtoi_better(String str) {
        if (str == null || str.length() == 0)
			return 0;
		str = str.trim();
		char firstChar = str.charAt(0);
		int sign = 1, start = 0, len = str.length();
		long sum = 0;
		if (firstChar == '+') {
			sign = 1;
			start++;
		} else if (firstChar == '-') {
			sign = -1;
			start++;
		}
		for (int i = start; i < len; i++) {
			if (!Character.isDigit(str.charAt(i)))
				return (int) sum * sign;
			sum = sum * 10 + str.charAt(i) - '0';
			if (sign == 1 && sum > Integer.MAX_VALUE)
				return Integer.MAX_VALUE;
			if (sign == -1 && (-1) * sum < Integer.MIN_VALUE)
				return Integer.MIN_VALUE;
		}

		return (int) sum * sign;
    }
```

比我的简洁，也更容易理解。奇怪的是运行速度差不多。
总之是道挺水的题目。

# 学到的知识点

无。

# 相关引用
> [1] : https://discuss.leetcode.com/topic/33142/java-easy-version-to-understand