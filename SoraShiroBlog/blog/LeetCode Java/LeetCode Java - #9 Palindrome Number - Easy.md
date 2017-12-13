# 问题 
Determine whether an integer is a palindrome. Do this without extra space.

判断给定数是否是回文数。

# 自己的解决方案

有些想当然，以为又是一道水题，其实就是直接拿之前的回文字符串来用了……

```
public class Solution {
	private int len;

	public boolean isPalindrome(int x) {
		String s = x + "";
		len = s.length();
		if (len < 2)
			return true;

		return extendPalindrome(s, s.length() / 2, s.length() / 2)
				|| extendPalindrome(s, s.length() / 2 - 1, s.length() / 2);
	}

	private boolean extendPalindrome(String s, int j, int k) {
		while (j >= 0 && k < s.length() && s.charAt(j) == s.charAt(k)) {
			j--;
			k++;
		}
		if (len == k - j - 1) {
			return true;
		}
		return false;
	}
}
```

# 别人的解决方案 ***[1]***

```
public boolean isPalindrome_better(int x) {
	    if (x<0 || (x!=0 && x%10==0)) return false;
	    int rev = 0;
	    while (x>rev){
	    	rev = rev*10 + x%10;
	    	x = x/10;
	    }
	    return (x==rev || x==rev/10);
	}
```

万万没想到可以这么写，前面的条件判断直接把负数和最后一位是0的情况排除了，不用遍历。运行速度平均比我快10ms左右。

>Compare half of the digits in x, so don't need to deal with overflow.

人家还说只比较一半就行了orz

# 学到的知识点

无。

# 相关引用
> [1] : https://discuss.leetcode.com/topic/8090/9-line-accepted-java-code-without-the-need-of-handling-overflow