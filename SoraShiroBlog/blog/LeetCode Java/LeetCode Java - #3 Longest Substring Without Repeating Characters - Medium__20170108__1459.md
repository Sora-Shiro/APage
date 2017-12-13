# 问题
Given a string, find the length of the **longest substring** without repeating characters.
**Examples:**
Given "abcabcbb", the answer is "abc", which the length is 3.
Given "bbbbb", the answer is "b", with the length of 1.
Given "pwwkew", the answer is "wke", with the length of 3. 
Note that the answer must be a **substring**, "pwke" is a *subsequence* and not a substring.

给定一个字符串，求出该字符串的**最长子字符串**的长度，该子字符串不包括重复字符。子字符串必须连续。

# 自己的解决方案

```
public int lengthOfLongestSubstring(String s) {
        int size = s.length();
		String result = new String();
    	int resultNum = 0;
        for (int i = 0; i < size; i++) {
       		if (result.contains(s.charAt(i)+"")) {
       			resultNum = result.length() > resultNum ? result.length() : resultNum ;
       			result = result.substring(result.indexOf(s.charAt(i)) + 1);
       		}
       		result = result + s.charAt(i);
        }
        resultNum = result.length() > resultNum ? result.length() : resultNum ;
        return resultNum;
    }
```

# 别人的解决方案

```
public int lengthOfLongestSubstring(String s) {
        if (s.length() == 0) return 0;
        HashMap<Character, Integer> map = new HashMap<Character, Integer>();
        int max = 0;
        for (int i=0, j=0; i<s.length(); ++i) {
            if (map.containsKey(s.charAt(i))) {
                j = Math.max(j, map.get(s.charAt(i)) + 1);
            }
            map.put(s.charAt(i),i);
            max = Math.max(max, i-j+1);
        }
        return max;
    }
```
他对该算法的解释 ***[1]***：
>The basic idea is, keep a hashmap which stores the characters in string as keys and their positions as values, and keep two pointers which define the max substring. Move the right pointer to scan through the string , and meanwhile update the hashmap. If the character is already in the hashmap, then move the left pointer to the right of the same character last found. 
Note that the two pointers can only move forward.

很厉害，通过使用 HashMap 和两个游标处理字符串，速度平均比我快了15ms左右。
我们的算法有个根本上不同的地方：
在我的算法里，我把子字符串和子字符串的最大值紧密关联了起来（通过处理```result```和比较```result.length()```和```resultNum```的大小）；
而在他的算法里，他把这两者用 HashMap 和两个游标分离了；而且特别巧妙的是，由于遇到重复字符，重复字符以前的子字符串都可以抛弃，而这些他通过向前移动游标和**覆盖重复字符的 value **实现了（注意 for 里的 if 里的 max 函数是必需的，例如考虑```"abba"```，如果没有 max 那么会出现游标回退的现象）。

# 学到的知识点

这期间其实查了很多资料，一开始用的是LinkedList，之后改成了String，误打误撞学了一些关于LinkedList、ArrayList的知识。
- ArrayList 和 Vector 都是使用数组方式存储数据，此数组元素数大于实际
存储的数据以便增加和插入元素，它们都允许直接按序号索引元素，但是插入元素要涉及数组元素移动等内存操作，所以索引数据快而插入数据慢，Vector 由于使用了 synchronized 方法（线程安全），通常性能上较 ArrayList 差，而LinkedList 使用双向链表实现存储，按序号索引数据需要进行前向或后向遍历，但是插入数据时只需要记录本项的前后项即可，所以插入速度较快。 ***[2]***

# 相关引用
> [1] : https://discuss.leetcode.com/topic/8232/11-line-simple-java-solution-o-n-with-explanation
[2] : http://blog.csdn.net/uniquewonderq/article/details/46426583