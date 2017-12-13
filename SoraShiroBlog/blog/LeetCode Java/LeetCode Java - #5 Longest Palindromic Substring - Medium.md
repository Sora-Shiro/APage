# 问题 
Given a string **s**, find the longest palindromic substring in **s**. You may assume that the maximum length of **s** is 1000.

**Example:**
**Input:** "babad"
**Output:** "bab"
**Note:** "aba" is also a valid answer.

**Example:**
**Input:** "cbbd"
**Output:** "bb"

给定一个最长为1000的字符串，求出最长回文子字符串。


# 自己的解决方案

其实没有AC，但是水平有限只想出了这个方法：

```
public String longestPalindrome(String s) {
        char mid;
		int repair = 0;
		boolean check;
		String buff = "";
		buff += s.charAt(0);
		String result = s.charAt(0) + "";
		String l;

		for (int i = 1; i < s.length(); i++) {
			l = "";
			check = false;
			int lenBuff = buff.length();
			if (buff.charAt(lenBuff - 1) == s.charAt(i)) {
				mid = buff.charAt(lenBuff - 1);
				repair = 1;
				check = true;
			}
			if (check) {
				mid = buff.charAt(lenBuff - 1);
				for (int x = 1; (lenBuff - 1) - x + repair >= 0
						&& (lenBuff - 1) + x < s.length(); x++) {
					if (buff.charAt(lenBuff - 1 - x + repair) == 
                           s.charAt(lenBuff - 1 + x)) {
						String save = buff.charAt(lenBuff - 1 - x + repair) + "";
						save += l;
						save += buff.charAt(lenBuff - 1 - x + repair) + "";
						l = save;
					} else {
						break;
					}
				}
				if (result.length() < l.length()) {
					result = l;
				}
			}

			l = "";
			check = false;
			if (buff.length() > 1 && buff.charAt(lenBuff - 2) == s.charAt(i)) {
				mid = buff.charAt(lenBuff - 1);
				l += mid;
				repair = 0;
				check = true;
			}
			if (check) {
				mid = buff.charAt(lenBuff - 1);
				for (int x = 1; (lenBuff - 1) - x + repair >= 0
						&& (lenBuff - 1) + x < s.length(); x++) {
					if (buff.charAt(lenBuff - 1 - x + repair) == 
                           s.charAt(lenBuff - 1 + x)) {
						String save = buff.charAt(lenBuff - 1 - x + repair) + "";
						save += l;
						save += buff.charAt(lenBuff - 1 - x + repair) + "";
						l = save;
					} else {
						break;
					}
				}
				if (result.length() < l.length()) {
					result = l;
				}
			}

			buff += s.charAt(i);
		}

		return result;
    }
```

（这代码渣到我自己以后可能都不敢看……）
核心思路是，设当前遍历到的字符的下标值为 N ，当 N-1 和 N 对应的值相等或 N-2 和 N 对应的值相等时开始以 N 为中心向两边检测。
但是由于时间复杂度太高（可能是n²？大量创建字符串可能是主要原因），提交的时候超过了限定时间，于是没有AC。

# 别人的解决方案 ***[1]***

```
public class Solution {
	private int lo, maxLen;

	public String longestPalindrome(String s) {
		int len = s.length();
		if (len < 2)
			return s;

		for (int i = 0; i < len - 1; i++) {
			extendPalindrome(s, i, i); // assume odd length, try to extend Palindrome as possible
			extendPalindrome(s, i, i + 1); // assume even length.
		}
		return s.substring(lo, lo + maxLen);
	}

	private void extendPalindrome(String s, int j, int k) {
		while (j >= 0 && k < s.length() && s.charAt(j) == s.charAt(k)) {
			j--;
			k++;
		}
		if (maxLen < k - j - 1) {
			lo = j + 1;
			maxLen = k - j - 1;
		}
	}
}
```

清晰易懂，没有像我一样大量创建字符串浪费了很多时间，直接用游标在原字符串上动刀，速度相当快。
虽然自己的核心想法跟他一样，但是游标真没想出来，跟这位的解决方案在实现上可以说只差一步，好气啊，得继续加油才行。

# 学到的知识点

- 以后要多考虑用***游标***方式解题！

# 相关引用
> [1] : https://discuss.leetcode.com/topic/23498/very-simple-clean-java-solution