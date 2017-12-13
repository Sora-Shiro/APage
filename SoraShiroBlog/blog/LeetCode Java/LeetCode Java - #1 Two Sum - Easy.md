>测试文章

# 问题
Given an array of integers, return **indices** of the two numbers such that they add up to a specific target.
You may assume that each input would have ***exactly*** one solution.
**Example:**
```
Given nums = [2, 7, 11, 15], target = 9,
Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```
给定一个数组和一个目标值，寻找数组的两个下标，使得下标对应的值的和，恰好等于目标值。该题的所有输入**有且仅有唯一解**。

# 自己（别人）的解决方案
由于没细想（遍历两次数组）直接看了别人的答案，然后想再自己解决的时候已经被别人的思路限制了。
最后在别人的代码的基础上修改了一下。
```
public int[] twoSum(int[] nums, int target) {
    	HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
    	int[] result = new int[2];

        for (int i = 0; i < nums.length; i++) {
        	if (map.containsKey(target - nums[i])) {
        		result[0] = map.get(target - nums[i]);
        		result[1] = i;
        		return result;
        	} else {

        	}
        	map.put(nums[i], i);
        }

        return result;
    }
```
这个思路很厉害，每次首先判断***目标值-当前下标对应值（设为N）***是否在map的keys里，如果没有则将***当前下标对应值，当前下标值***存入map中。
如果在map的keys里存在N，那么就以N为key（下标对应值）在map里找对应的value（下标值），最后将***该value***和***当前下标值***赋值给一开始就定义好的result数组，最后返回result即可。

由于在Java HashMap的实现中，查找和存储平均花费O(1)，而又因为只有一个for循环，故该算法的平均花费是O(n)（最坏情况是O(n²)）*[1]* 。相比要花费O(n²)的两次遍历数组，这个算法实在好太多。

# 学到的知识点
- Java 的 HashMap 查找和插入算法平均花费O(1)，最坏情况是O(n²)，但后者发生的概率很小。

# 相关引用
> [1] : https://discuss.leetcode.com/topic/16687/my-short-java-solution-o-n-hashmap/7

#心得
最近对数据结构和算法分析兴趣正浓，加上自己的Java基础确实不怎么样（只是***会用***却不知道***为什么能这么用***），所以决定从刷题开始，慢慢提升自己的相关能力。
第一次在LeetCode上刷题，为了想清楚HashMap的查找插入花费，究竟是不是常数时间，看了很长时间的讨论区，最终得出了上面的结果。
话说回来，这是我的第一篇简书文章，坚持下去的话也能逐渐提高自己的文字表达能力吧。
今后相关文章的基本格式会和这篇保持统一，与此同时欢迎理性交流。
祝自己好运:)