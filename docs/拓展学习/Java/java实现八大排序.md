---
title: java实现八大排序
tags: 算法
categories: 算法
keywords: 排序,算法
description: 排序算法
abbrlink: a2c9b28b
date: 2019-08-10 10:47:50
---

## **冒泡排序**

和后面相邻的相比较，按需求转换位置，下一个再和后面的相邻比较，每轮选出一个最（大或小）值

```java
public class BubbleSort {
    public static void main(String[] args) {
        int[] a = {1, 4, 5, 2, 9, 3};
        int length = a.length;
        int temp;
        for (int i = 0; i < length - 1; i++) {
            for (int j = 0; j < length - i - 1; j++) {
                if (a[j] > a[j + 1]) {
                    temp = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(a));
    }
}
```

## **选择排序**

一个元素和后面的每一个元素进行比对，每轮将一个最（大或小）值确定

```java
public class ChooseSort {
    public static void main(String[] args) {
        int[] a = {1,4,5,2,9,3};
        int length = a.length;
        int temp;
        for (int i = 0; i < length - 1; i++) {
            for (int j = i + 1; j < length; j++) {
                if (a[i] > a[j]) {
                    temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(a));
    }
}
```

## **插入排序**

将当前的值和前面已经排好的数值进行比较，插入到已经排好序列中相应的位置（插入位置：前面比他小，后面比他大）

```java
public class InsertSort {
    public static void main(String[] args) {
        int[] a = {1, 4, 5, 2, 9, 3};
        int length = a.length;
        int temp;
        for (int i = 1; i < length; i++) {
            for (int j = i; j > 0; j--) {
                if (a[j] < a[j - 1]) {
                    temp = a[j];
                    a[j] = a[j - 1];
                    a[j - 1] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(a));
    }
}
/**
* 优化的插入排序，减少数组的访问次数
*/
public class InsertSort {
    public static void main(String[] args) {
        int[] a = {1, 4, 5, 2, 9, 3};
        int length = a.length;
        for (int i = 1; i < length; i++) {
            preIndex = i - 1;
            preValue = a[preIndex + 1];
            while(preIndex > 0 && a[preIndex] > preValue) {
                a[preIndex + 1] = a[preIndex];
                preIndex--;
            }
            a[preIndex + 1] = preValue;
        }
        System.out.println(Arrays.toString(a));
    }
}
```

## **希尔排序**

加快插入排序，交换不相邻的元素，优化插入排序需要一个一个比较

```java
public class ShellSort {
    public static void main(String[] args) {
        int[] a = {1, 4, 5, 2, 9, 3};
        int length = a.length;
        int temp;
        int h = 1;
        while (h < length / 3) {
            h = 3 * h + 1;
        }
        while (h >= 1) {
            for (int i = h; i < length; i++) {
                for (int j = i; j >= h; j-=h) {
                    if (a[j] < a[j - h]) {
                        temp = a[j];
                        a[j] = a[j - h];
                        a[j - h] = temp;
                    }
                }
            }
            h = h/3;
        }
        System.out.println(Arrays.toString(a));
    }
}
```

## **归并排序**

将子数组排序，然后将子数组归并到整个数组

```java
public class MergeSort {
    public static void main(String[] args) {
        int[] a = {1, 4, 5, 2, 9, 3};
        int length = a.length;
        mergeSort(a, 0, length - 1);
        System.out.println(Arrays.toString(a));
    }

    static void mergeSort(int[] a, int start, int end) {
        int mid = (start + end) / 2;
        if (start < end) {
            mergeSort(a, start, mid);
            mergeSort(a, mid + 1, end);
            merge(a, start, end);
        }
    }

    static void merge(int[] a, int start, int end) {
        int[] temp = new int[a.length];
        int mid = (start + end) / 2;
        int k = start;
        int i = start;
        int j = mid + 1;
        while (i <= mid && j <= end) {
            if (a[i] <= a[j]) {
                temp[k++] = a[i++];
            } else {
                temp[k++] = a[j++];
            }
        }
        while (i <= mid) {
            temp[k++] = a[i++];
        }
        while (j <= end) {
            temp[k++] = a[j++];
        }
        for (int m = start; m <= end; m++) {
            a[m] = temp[m];
        }
    }
}
```

## **快速排序**

随便找个基准数，然后从数组的左边和右边开始遍历，比基准数小的放左边，比基准数大的放右边，切换基准数，再次。。  
实现：选取一个基准数，右边开始向左扫描，如果左一个比它大的停止，左边开始向右扫描，如果右一个比它小的停止，然后将左边大的和右边小的进行交换，再继续这样向中间扫瞄，如果扫到中间相遇了，那就将中间的这个和基准数进行交换，成为新的基准数，接着可以通过递归将原中间值的位置划分为左右子数组，再在子数组中进行上述操作，再通过递归划分，最终由子数组形成整个排序好的数组

```java
public class QuickSort {
    public static void main(String[] args) {
        int[] a = {1, 4, 5, 2, 9, 3};
        int length = a.length;
        quickSort(a, 0, length - 1);
        System.out.println(Arrays.toString(a));
    }

    static void quickSort(int[] arr, int low, int high) {
        int i, j, temp, t;
        if (low > high) {
            return;
        }
        i = low;
        j = high;
        temp = arr[low];
        while (i < j) {
            // 右边开始
            while (temp <= arr[j] && i < j) {
                j--;
            }
            // 左边开始
            while (temp >= arr[i] && i < j) {
                i++;
            }
            if (i < j) {
                t = arr[j];
                arr[j] = arr[i];
                arr[i] = t;
            }
        }
        //最后将基准为与i和j相等位置的数字交换
        arr[low] = arr[i];
        arr[i] = temp;
        //递归调用左半数组
        quickSort(arr, low, j - 1);
        //递归调用右半数组
        quickSort(arr, j + 1, high);
    }
}
```
