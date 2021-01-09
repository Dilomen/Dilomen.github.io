---
title: Java学习03
tags: java基础知识
categories: java基础知识
keywords: java,基础
description: java的基础知识
abbrlink: a65db1ec
date: 2019-06-29 10:35:10
---

## **容器遍历方法**

- List 遍历

  - 普通 for 循环

  ```java
  for (int i = 0; i < list.size(); i++) {
      String temp = list.get(i);
      System.out.println(temp);
  }
  ```

  - foreach

  ```java
  for (String temp : list) {
      System.out.println(temp);
  }
  ```

  - 使用 Iterator 迭代器

  ```java
  for (Iterator iter = list.iterator(); iter.hasNext();) {
      String temp = (String) iter.next();
      System.out.println(temp);
  }
  ```

  - 使用 Iterator 迭代器

  ```java
  Iterator iter = list.iterator();
  while(iter.hasNext()) {
      Object obj = iter.next();
      // iter.remove(); 如果要删除该元素，推荐使用该方法
      System.out.println(temp);
  }
  ```

- Set 遍历
  - foreach
  - 使用 Iterator 迭代器
- Map 遍历

  - 根据 key 获取 value

  ```java
  Map<Integer, Object> maps = new HashMap<>();
  Set<Integer> keySet = maps.keySet();
  for (Integer id : keySet) {
      System.out.println(maps.get(id));
  }
  ```

  - 使用 entrySet

  ```java
  Map<Integer, Object> maps = new HashMap();
  Set<Map.Entry<Integer, Object>> ss = maps.entrySet();
  for(Iterator iterator = ss.iterator();iterator.hasNext();) {
      Map.Entry e = (Map.Entry) iterator.next();
      System.out.println(e.getKey() + " " + e.getValue());
  }
  ```
