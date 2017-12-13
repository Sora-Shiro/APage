# 问题 
The string ```"PAYPALISHIRING"``` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
```
P   A   H   N
A P L S I I G
Y   I   R
```
And then read line by line: ```"PAHNAPLSIIGYIR"```
Write the code that will take a string and make this conversion given a number of rows:
```
string convert(string text, int nRows);
convert("PAYPALISHIRING", 3)
```
should return ```"PAHNAPLSIIGYIR"```.

（以下翻译有些误导思路，建议自行翻译原文）
给定一个字符串 text 和一个行值 nRows ，以 N 字形逐个排列它们，最后每行从左到右输出。

# 自己的解决方案

想了两种，虽然 AC 了，但是耗时比较多。

第一种方法：

```
public String convert(String s, int numRows) {
        if (numRows == 1 || numRows >= s.length()) {
			return s;
		}

		String[] save = new String[numRows];
		for (int i = 0; i < numRows; i++) {
			save[i] = "";
		}

		int cycle = numRows * 2 - 2;
		for (int i = 0; i < s.length(); i++) {
			int base = i % cycle;
			if (base > numRows - 1) {
				base = numRows - (base - numRows) - 2;
			}
			save[base] += s.charAt(i);
		}

		String result = "";
		for (int i = 0; i < numRows; i++) {
			result += save[i];
		}
		return result;
    }
```

首先判断 row 是否等于 1 或者大于等于给定字符串 s 的长度，如果是直接返回原字符串，很好理解。
接着是新建了 row 个 String 数组，然后在核心算法处往这些数组里添加字符。
核心算法处使用了 cycle 变量，代表周期，也就是走一次 N 字需要的数值，它用来处理 base ，后者决定往哪个 String 数组里添加当前字符。

第二种方法：

```
public String convert_new(String s, int numRows) {
        if (numRows == 1 || numRows >= s.length()) {
			return s;
		}

		String save = "";

		int first = 2 * numRows - 2;
		int second = 0;
		for (int j = 0; j < numRows; j++) {
			for (int i = j; i < s.length();) {
				save += s.charAt(i) + "";
				if (j == 0 || j == numRows - 1) {
					i += 2 * numRows - 2;
				} else {
					i += first;
					if(i < s.length()){
						save += s.charAt(i) + "";
					}
					i += second;
				}
			}
			first -= 2;
			second += 2;
		}

		return save;
    }
```

画图排列后，观察同一行的元素之间在原字符串的下标距离，不难理解我为什么这么写核心算法。
可惜两个算法速度都不快。

# 别人的解决方案 ***[1]***

```
public String convert_better(String s, int nRows) {
	    char[] c = s.toCharArray();
	    int len = c.length;
	    StringBuffer[] sb = new StringBuffer[nRows];
	    for (int i = 0; i < sb.length; i++) sb[i] = new StringBuffer();
	    
	    int i = 0;
	    while (i < len) {
	        for (int idx = 0; idx < nRows && i < len; idx++) // vertically down
	            sb[idx].append(c[i++]);
	        for (int idx = nRows-2; idx >= 1 && i < len; idx--) // obliquely up
	            sb[idx].append(c[i++]);
	    }
	    for (int idx = 1; idx < sb.length; idx++)
	        sb[0].append(sb[idx]);
	    return sb[0].toString();
	}
```

很厉害（我都不知道说了多少次了），在核心算法里，虽然他跟我的方法一一样是用数组存储排列的（他没有用到 cycle ），但是！他用了 StringBuffer ！而且还机智地把 String 转成了 char 数组！这对 Java 来讲速度其实快了很多！
亲测过如果不这么转换（如下），速度平均慢了50ms左右！
当然，即使不转换模仿他的算法，比起方法一也是平均快了40ms（可能是求余运算太费时间了），不得不说即使我不想通过转换类型来提高效率，也得承认他的核心算法比我强很多。

```
public String convert_new2(String s, int numRows) {
        if (numRows == 1 || numRows >= s.length()) {
			return s;
		}

		String[] save = new String[numRows];
		for (int i = 0; i < numRows; i++) {
			save[i] = "";
		}

		int j = 0;
		int len = s.length();
		while (j < len) {
	        for (int idx = 0; idx < numRows && j < len; idx++) // vertically down
	            save[idx] += (s.charAt(j++));
	        for (int idx = numRows-2; idx >= 1 && j < len; idx--) // obliquely up
	        	save[idx] += (s.charAt(j++));
	    }

		String result = "";
		for (int i = 0; i < numRows; i++) {
			result += save[i];
		}
		return result;
    }
```

#新的发现（发布后的半小时）

我在方法二上修改了一下：
```
public String convert_new2_afterBetter(String s, int numRows) {
       if (numRows == 1 || numRows >= s.length()) {
            return s;
        }

        char[] c = s.toCharArray();
        StringBuffer sb = new StringBuffer();

        int first = 2 * numRows - 2;
        int second = 0;
        for (int j = 0; j < numRows; j++) {
            for (int i = j; i < s.length();) {
            	sb.append(c[i]);
                if (j == 0 || j == numRows - 1) {
                    i += 2 * numRows - 2;
                } else {
                    i += first;
                    if(i < s.length()){
                    	sb.append(c[i]);
                    }
                    i += second;
                }
            }
            first -= 2;
            second += 2;
        }

        return sb.toString();
    }
```

这个代码的速度可以和他的代码一样快！
而且这个算法没有用到求余运算，说明我上面的假设可能是正确的，但还需要路过的大佬们提出意见 : ) （之后在 LeetCode 上发布了相关话题 ***[2]*** ）

# 学到的知识点

- 尝试少用求余运算
- 提高性能可以试试 StringBuffer

# 相关引用
> [1] : https://discuss.leetcode.com/topic/3162/easy-to-understand-java-solution
[2] : https://discuss.leetcode.com/topic/74776/java-solution-maybe-easy-and-clear