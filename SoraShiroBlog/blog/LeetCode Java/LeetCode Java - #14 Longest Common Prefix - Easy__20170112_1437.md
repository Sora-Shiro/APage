# 问题 

Write a function to find the longest common prefix string amongst an array of strings.

# 自己的解决方案

```
public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0 || strs[0].length() == 0)
            return "";

        String save = strs[0];
        int len = save.length();
        int confirm;

        for (int i = 1; i < strs.length; i++) {
            confirm = 0;
            for (int j = 0; j < strs[i].length() && j < save.length()
                    && confirm < len && save.charAt(j) == strs[i].charAt(j); j++) {
                confirm++;
            }
            len = confirm;
        }

        String result = save.substring(0, len);
        return result;
    }
```

比较简单，检查每个字符串跟第一个字符串的前缀有多少个相等，用 confirm 记录当前相等值， len 记录最高相等值。

# 别人的解决方案 ***[1]***

```
public String longestCommonPrefix(String[] strs) {
        if(strs == null || strs.length == 0)    return "";
	    String pre = strs[0];
	    int i = 1;
	    while(i < strs.length){
	        while(strs[i].indexOf(pre) != 0)
	            pre = pre.substring(0,pre.length()-1);
	        i++;
	    }
	    return pre;
    }
```

代码比我简单了很多，他直接用了 ```indexOf``` 函数。首先定义 pre ，并初始化为第一个字符串；对于每个字符串，如果不为 0 ，说明没有这个 pre 所代表的前缀，那么 pre 去掉最后的字母，再检测，直到存在 pre 所代表的前缀为止（注意包含了 pre 为 ```""``` 的情况）


# 学到的知识点

无

# 相关引用
> [1] : https://discuss.leetcode.com/topic/6987/java-code-with-13-lines