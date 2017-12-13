# 问题 
Given a roman numeral, convert it to an integer.

Input is guaranteed to be within the range from 1 to 3999.

将给定的罗马数字转换成阿拉伯数字。

# 自己的解决方案

水题……

```
public int romanToInt(String s) {
        HashMap<String, Integer> m = new HashMap<>();
		m.put("I", 1);
		m.put("V", 5);
		m.put("X", 10);
		m.put("L", 50);
		m.put("C", 100);
		m.put("D", 500);
		m.put("M", 1000);
		int max = 0;
		int result = 0;

		for (int i = s.length() - 1; i >= 0; i--) {
			int value = m.get(s.charAt(i) + "");
			max = max > value ? max : value;
			if(value < max){
				value = -value;
			}
			result += value;
		}
		
		return result;
    }
```

如果遇到比当前值小的罗马字符就让 result 减去它。


# 学到的知识点

无