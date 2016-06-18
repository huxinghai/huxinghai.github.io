---
layout: post
title: "intersection-of-two-arrays"
date: 2016-05-19 22:07
comments: true
categories: LeetCode
---

Given two arrays, write a function to compute their intersection.

Example:
Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2].

Note:
Each element in the result must be unique.
The result can be in any order.

    # @param {Integer[]} nums1
    # @param {Integer[]} nums2
    # @return {Integer[]}
    def intersection(nums1, nums2)
      nums1 & nums2
    end