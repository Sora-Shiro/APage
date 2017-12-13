# 问题
You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
**Input:** (2 -> 4 -> 3) + (5 -> 6 -> 4)
**Output:** 7 -> 0 -> 8

给定两个**非空**链表，它们各自倒序放入一个数的各个位，计算它们的和并以链表形式倒序输出。两个链表代表的数不包含前导零，除了0本身。

# 自己的解决方案
这道题要解决的主要问题是：

1. 进位问题
2. 链表长度不等问题
3. 链表遍历完后还有一个进位需要处理的问题

我的想法是：

1. 定义`carry`布尔值，每次计算检查并设置`carry`值
2. 每次分别检查链表是否为`null`，如果不为`null`则取出它的当前值
3. 在最后进行`carry`处理
4. 此外，我还定义了`bothNull`布尔值，用来跳出遍历循环

最终代码如下：

```
public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
		ListNode buff = new ListNode(0);
		ListNode result = buff;
		boolean carry = false;
		boolean bothNull;

		while (true) {
			bothNull = true;
			if (l1 != null) {
				buff.val += l1.val;
				l1 = l1.next;
				bothNull = false;
			}
			if (l2 != null) {
				buff.val += l2.val;
				l2 = l2.next;
				bothNull = false;
			}
			if (bothNull) {
				break;
			}

			if (carry) {
				buff.val++;
			}
			if (buff.val >= 10) {
				carry = true;
				buff.val -= 10;
			} else {
				carry = false;
			}

			if (l1 != null || l2 != null) {
				buff.next = new ListNode(0);
				buff = buff.next;
			}
		}

		if (carry) {
			buff.next = new ListNode(1);
		}

		return result;
	}
```

# 别人的解决方案

```
public ListNode addTwoNumbers_better(ListNode l1, ListNode l2) {
        ListNode prev = new ListNode(0);
        ListNode head = prev;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            ListNode cur = new ListNode(0);
            int sum = ((l2 == null) ? 0 : l2.val) + ((l1 == null) ? 0 : l1.val) + carry;
            cur.val = sum % 10;
            carry = sum / 10;
            prev.next = cur;
            prev = prev.next; //这一句本来是 prev = cur; ，为了方便理解我修改了一下
            
            l1 = (l1 == null) ? l1 : l1.next;
            l2 = (l2 == null) ? l2 : l2.next;
        }
        return head.next;
    }
```
他对该算法的解释 ***[1]***：
>Two things to make the code simple:
1. Whenever one of the two ListNode is null, replace it with 0.
如果链表当前的 element 为`null`，用** 0 **替代它进行运算。
2. Keep the while loop going when at least one of the three conditions is met.
当两个链表至少有一个不为`null`，或者还有进位需要处理时，while循环不终止。

无论是跳出循环，还是进位处理和长度处理，甚至是返回结果时的```head.next```，对我来说都是亮点。尽管时间复杂度两者几乎相同，但是他的代码更为简洁易懂。
不得不服，这就是人与人之间的差距orz

# 学到的知识点
- 学会使用**等效代换法**，时刻寻找对结果没影响且更方便的解决方案。

# 相关引用
> [1] : https://discuss.leetcode.com/topic/6220/my-accepted-java-solution