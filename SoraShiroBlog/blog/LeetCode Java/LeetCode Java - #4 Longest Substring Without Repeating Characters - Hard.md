# 问题
There are two sorted arrays **nums1** and **nums2** of size m and n respectively.
Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
**Example 1:**
nums1 = [1, 3]
nums2 = [2]
The median is 2.0
**Example 2:**
nums1 = [1, 2]
nums2 = [3, 4]
The median is (2 + 3)/2 = 2.5

给定两个已升序排序的数组，找出他们的中位数。时间复杂度应该是O(log (m+n))。


# 自己的解决方案

想了很久，一开始是粗暴地直接将所有元素放进一个 ArrayList 里然后用```Collections.sort(l)```排序，最后采用了时间复杂度 O(max(n, m)) 的方法。

```
public double findMedianSortedArrays_new(int[] nums1, int[] nums2) {
        ArrayList<Integer> l = new ArrayList<Integer>();
		int i = 0, j = 0;

		for (; i < nums1.length && j < nums2.length;) {
			if (nums1[i] < nums2[j]) {
				l.add(nums1[i]);
				i++;
				continue;
			} else {
				l.add(nums2[j]);
				j++;
				continue;
			}
		}
		while (i < nums1.length) {
			l.add(nums1[i]);
			i++;
		}
		while (j < nums2.length) {
			l.add(nums2[j]);
			j++;
		}

		if (l.size() % 2 == 0) {
			return (double) (l.get(l.size() / 2 - 1) + l.get(l.size() / 2)) / 2;
		} else {
			return (double) l.get(l.size() / 2);
		}
    }
```

每次比较当前游标指向的两个数的大小，然后放进去，移动游标……
虽然很想得出对数复杂度的算法，但最后还是做不到orz

# 别人的解决方案

```
public double findMedianSortedArrays(int[] A, int[] B) {
	    int m = A.length, n = B.length;
	    int l = (m + n + 1) / 2;
	    int r = (m + n + 2) / 2;
	    return (getkth(A, 0, B, 0, l) + getkth(A, 0, B, 0, r)) / 2.0;
	}

    public double getkth(int[] A, int aStart, int[] B, int bStart, int k) {
    	if (aStart > A.length - 1) return B[bStart + k - 1];            
    	if (bStart > B.length - 1) return A[aStart + k - 1];                
    	if (k == 1) return Math.min(A[aStart], B[bStart]);
    	
    	int aMid = Integer.MAX_VALUE, bMid = Integer.MAX_VALUE;
    	if (aStart + k/2 - 1 < A.length) aMid = A[aStart + k/2 - 1]; 
    	if (bStart + k/2 - 1 < B.length) bMid = B[bStart + k/2 - 1];        
    	
    	if (aMid < bMid) 
    	    return getkth(A, aStart + k/2, B, bStart, k - k/2);// Check: aRight + bLeft 
    	else 
    		return getkth(A, aStart, B, bStart + k/2, k - k/2);// Check: bRight + aLeft
    }
```
他对该算法的解释 ***[1]***：
>The key point of this problem is to ignore half part of A and B each step recursively by comparing the median of remaining A and B:
```
if (aMid < bMid) Keep [aRight + bLeft] 
else Keep [bRight + aLeft]
```

依旧献上膝盖……用递归实现了二分法搜索……由于我完全不懂怎么回事，所以先贴上代码，以后再细细研究吧。

# 学到的知识点

无

# 相关引用
> [1] : https://discuss.leetcode.com/topic/28602/concise-java-solution-based-on-binary-search