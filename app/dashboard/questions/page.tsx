'use client'
import React, { useState, useMemo } from 'react';
import { Laptop, Users, Search, X } from 'lucide-react';

// Mock data for the page
const allSampleQuestions = [
    // --- Technical Questions from new list ---
    { q: "Lowest Common Ancestor in a binary tree.", d: "Medium", t: "Trees", category: "Technical" },
    { q: "Find the max-product of three numbers in an unsorted array without sorting.", d: "Medium", t: "Arrays", category: "Technical" },
    { q: "Print the left view of a binary tree.", d: "Easy", t: "Trees", category: "Technical" },
    { q: "Reverse arrays in place.", d: "Easy", t: "Arrays", category: "Technical" },
    { q: "Explain cache line concepts and RR scheduling in OS context.", d: "Hard", t: "OS", category: "Technical" },
    { q: "Find the middle node of a linked list.", d: "Easy", t: "Linked List", category: "Technical" },
    { q: "Pairwise swap nodes in a linked list.", d: "Medium", t: "Linked List", category: "Technical" },
    { q: "Explain the internal workings of HashMap / HashSet in Java.", d: "Hard", t: "Java", category: "Technical" },
    { q: "Implement double-checked locking (Singleton pattern) in multithreading.", d: "Hard", t: "Multithreading", category: "Technical" },
    { q: "Print a matrix in spiral form.", d: "Medium", t: "Arrays", category: "Technical" },
    { q: "Explain DFS traversal on a graph and its representation.", d: "Easy", t: "Graphs", category: "Technical" },
    { q: "Implement stack using queues.", d: "Medium", t: "Stacks / Queues", category: "Technical" },
    { q: "Delete a node at a given position in a linked list.", d: "Easy", t: "Linked List", category: "Technical" },
    { q: "Print the nth node from the end in a linked list.", d: "Easy", t: "Linked List", category: "Technical" },
    { q: "Detect whether two rectangles overlap.", d: "Medium", t: "Geometry", category: "Technical" },
    { q: "What is the difference between Java Thread vs Runnable?", d: "Easy", t: "Java", category: "Technical" },
    { q: "Explain deadlock with a producer-consumer example.", d: "Hard", t: "OS", category: "Technical" },
    { q: "What is Serialization in Java and what are related issues?", d: "Medium", t: "Java", category: "Technical" },
    { q: "Explain the use of comparators in TreeSet ordering.", d: "Medium", t: "Java", category: "Technical" },
    { q: "Compare graphs vs trees; directed vs undirected graphs.", d: "Easy", t: "Graphs", category: "Technical" },
    { q: "Describe BFS and DFS traversal techniques.", d: "Easy", t: "Graphs", category: "Technical" },
    { q: "How do you detect a cycle in directed/undirected graphs?", d: "Medium", t: "Graphs", category: "Technical" },
    { q: "Explain Dijkstra’s algorithm for shortest path.", d: "Medium", t: "Graphs", category: "Technical" },
    { q: "Explain Kruskal’s and Prim’s MST algorithms and topological sort.", d: "Hard", t: "Graphs", category: "Technical" },
    { q: "Explain the Bellman–Ford algorithm for negative-weight graphs.", d: "Hard", t: "Graphs", category: "Technical" },
    { q: "Explain Floyd‑Warshall, articulation points, and SCCs in graphs.", d: "Hard", t: "Graphs", category: "Technical" },
    { q: "Solve problems like Clone Graph, Course Schedule, or Island Counting.", d: "Hard", t: "Graphs", category: "Technical" },
    { q: "Find the Longest Common Subsequence / Substring.", d: "Medium", t: "Dynamic Programming", category: "Technical" },
    { q: "Find the longest/maximum-sum increasing subsequence.", d: "Medium", t: "Dynamic Programming", category: "Technical" },
    { q: "Solve the 0/1 knapsack, coin-change, or matrix chain multiplication problems.", d: "Hard", t: "Dynamic Programming", category: "Technical" },
    { q: "Solve problems like Word‑break, Jump Game, or Decoding Ways.", d: "Hard", t: "Dynamic Programming", category: "Technical" },
    { q: "Explain the Egg‑dropping, rod cutting, or unique paths with obstacles problems.", d: "Hard", t: "Dynamic Programming", category: "Technical" },
    { q: "Explain the sliding window pattern for finding the max in subarrays of size K.", d: "Medium", t: "Algorithms", category: "Technical" },
    { q: "Explain the two-pointer, merge intervals, or cyclic sort patterns.", d: "Medium", t: "Algorithms", category: "Technical" },
    { q: "Reverse a string using two-pointer swapping.", d: "Easy", t: "Strings", category: "Technical" },
    { q: "Find a pair in an array that sums to a target (Two Sum).", d: "Easy", t: "Arrays", category: "Technical" },
    { q: "Count a non‑repeating element using bitwise XOR.", d: "Medium", t: "Bitwise", category: "Technical" },
    { q: "How do you count set bits, find max XOR subset, or check for power‑of‑two?", d: "Medium", t: "Bitwise", category: "Technical" },
    { q: "Explain cache internals: cache line, levels, thrashing.", d: "Hard", t: "OS", category: "Technical" },
    { q: "Explain RR scheduling, context switching, and process vs thread.", d: "Medium", t: "OS", category: "Technical" },
    { q: "What are deadlock conditions and prevention strategies?", d: "Hard", t: "OS", category: "Technical" },
    { q: "What happens when you type a URL in a browser?", d: "Hard", t: "Networking", category: "Technical" },
    { q: "What is the difference between HTTP and HTTPS?", d: "Easy", t: "Networking", category: "Technical" },
    { q: "Explain the OSI model layers and their functions.", d: "Medium", t: "Networking", category: "Technical" },
    { q: "Explain Singleton, Factory, Observer, or Strategy design patterns.", d: "Medium", t: "Design Patterns", category: "Technical" },
    { q: "What is the difference between inheritance vs composition, and polymorphism?", d: "Easy", t: "OOP", category: "Technical" },
    { q: "How does double-checked locking prevent multiple instances?", d: "Hard", t: "Multithreading", category: "Technical" },
    { q: "Explain thread safety in Java collections and atomic constructs.", d: "Hard", t: "Java", category: "Technical" },
    { q: "Explain ACID properties, normalization, and indexing.", d: "Medium", t: "Databases", category: "Technical" },
    { q: "Compare SQL vs NoSQL databases and their use‑cases.", d: "Easy", t: "Databases", category: "Technical" },
    { q: "Explain database transactions, joins, stored procedures, and views.", d: "Medium", t: "Databases", category: "Technical" },
    { q: "Explain system design basics: load balancing, sharding, rate‑limiting.", d: "Medium", t: "System Design", category: "Technical" },
    { q: "How does DNS resolution, TCP handshake, and TLS negotiation work?", d: "Hard", t: "Networking", category: "Technical" },
    { q: "What is CORS and how do you handle it?", d: "Medium", t: "Web", category: "Technical" },
    { q: "Compare REST vs GraphQL in application API design.", d: "Medium", t: "Web", category: "Technical" },
    { q: "What is the role of service workers, SSR vs CSR?", d: "Medium", t: "Web", category: "Technical" },
    { q: "Solve Best Time to Buy and Sell Stock.", d: "Easy", t: "Arrays", category: "Technical" },
    { q: "Solve Three‑Sum / 3‑Sum Closest.", d: "Medium", t: "Arrays", category: "Technical" },
    { q: "Solve Container With Most Water.", d: "Medium", t: "Arrays", category: "Technical" },
    { q: "Find the Longest Substring Without Repeating Characters.", d: "Medium", t: "Strings", category: "Technical" },
    { q: "Find the Longest Repeating Character Replacement.", d: "Hard", t: "Strings", category: "Technical" },
    { q: "Find the Minimum Window Substring.", d: "Hard", t: "Strings", category: "Technical" },
    { q: "Group anagrams or check if a string is an anagram.", d: "Easy", t: "Strings", category: "Technical" },
    { q: "Check for a Valid Palindrome or find the Longest Palindromic Substring.", d: "Medium", t: "Strings", category: "Technical" },
    { q: "Find the Product of Array Except Self.", d: "Medium", t: "Arrays", category: "Technical" },
    { q: "Check for a Valid Parentheses string.", d: "Easy", t: "Stacks", category: "Technical" },
    { q: "Find the longest consecutive sequence in an array.", d: "Medium", t: "Arrays", category: "Technical" },
    { q: "Find the most consecutive letter in a string.", d: "Easy", t: "Strings", category: "Technical" },
    { q: "Count all palindromic substrings.", d: "Hard", t: "Strings", category: "Technical" },
    { q: "Find the subarray with the maximum sum (Kadane’s algorithm).", d: "Medium", t: "Arrays", category: "Technical" },
    { q: "Find the maximum product subarray.", d: "Medium", t: "Arrays", category: "Technical" },
    { q: "Reverse a linked list (iteratively or recursively).", d: "Easy", t: "Linked List", category: "Technical" },
    { q: "Detect a cycle in a linked list.", d: "Easy", t: "Linked List", category: "Technical" },
    { q: "Merge k sorted lists.", d: "Hard", t: "Linked List", category: "Technical" },
    { q: "Remove the N‑th node from the end of a list.", d: "Easy", t: "Linked List", category: "Technical" },
    { q: "Reorder a list into an alternate pattern.", d: "Medium", t: "Linked List", category: "Technical" },
    { q: "Implement insert/delete operations on a doubly linked list.", d: "Easy", t: "Linked List", category: "Technical" },
    { q: "Implement a stack using queues (and vice versa).", d: "Medium", t: "Stacks / Queues", category: "Technical" },
    { q: "Solve the Next Greater Element or Celebrity Problem.", d: "Medium", t: "Stacks", category: "Technical" },
    { q: "Delete the middle element of a stack.", d: "Easy", t: "Stacks", category: "Technical" },
    { q: "Convert an infix expression to postfix.", d: "Medium", t: "Stacks", category: "Technical" },
    { q: "Evaluate a postfix expression via a stack.", d: "Medium", t: "Stacks", category: "Technical" },
    { q: "Implement a queue using two stacks.", d: "Medium", t: "Stacks / Queues", category: "Technical" },
    { q: "Serialize and deserialize a binary tree.", d: "Hard", t: "Trees", category: "Technical" },
    { q: "Construct a tree from inorder/preorder traversal.", d: "Medium", t: "Trees", category: "Technical" },
    { q: "Perform a level order traversal, or find the right/left view of a tree.", d: "Easy", t: "Trees", category: "Technical" },
    { q: "Find the maximum path sum in a binary tree.", d: "Hard", t: "Trees", category: "Technical" },
    { q: "Check if a binary tree is a valid BST.", d: "Easy", t: "Trees", category: "Technical" },
    { q: "Clone a graph (adjacency list).", d: "Medium", t: "Graphs", category: "Technical" },
    { q: "Solve the Course Schedule problem (topological sort).", d: "Medium", t: "Graphs", category: "Technical" },
    { q: "Count islands in a grid + flood fill.", d: "Medium", t: "Graphs", category: "Technical" },
    { q: "Check if a graph is bipartite.", d: "Medium", t: "Graphs", category: "Technical" },
    { q: "Find Strongly Connected Components (Kosaraju/Tarjan).", d: "Hard", t: "Graphs", category: "Technical" },
    { q: "Find bridges and articulation points in a directed graph.", d: "Hard", t: "Graphs", category: "Technical" },
    { q: "Solve the Pacific Atlantic water flow problem.", d: "Hard", t: "Graphs", category: "Technical" },
    { q: "Solve the Snake & Ladder board-graph simulation.", d: "Medium", t: "Graphs", category: "Technical" },
    { q: "Find the Top‑K Frequent Elements (heap + map).", d: "Medium", t: "Heaps", category: "Technical" },
    { q: "Connect N ropes with minimum cost (min‑heap).", d: "Easy", t: "Heaps", category: "Technical" },
    { q: "Find the median from a data stream (two heaps).", d: "Hard", t: "Heaps", category: "Technical" },
    { q: "Explain how to handle collisions in a hash table: chaining vs open addressing.", d: "Medium", t: "Hashing", category: "Technical" },
    { q: "Explain how to use a custom comparator for sorting (TreeSet / priority queue).", d: "Easy", t: "Sorting", category: "Technical" },
    { q: "Solve the Merge Intervals problem.", d: "Medium", t: "Arrays", category: "Technical" },
    { q: "Solve the Longest Increasing Subsequence problem.", d: "Medium", t: "Dynamic Programming", category: "Technical" },
    { q: "Solve the Unique Paths with Obstacles problem.", d: "Medium", t: "Dynamic Programming", category: "Technical" },
    { q: "Solve the Jump Game (min jumps, reachability).", d: "Medium", t: "Dynamic Programming", category: "Technical" },
    { q: "Solve the Subset Sum problem.", d: "Medium", t: "Dynamic Programming", category: "Technical" },
    { q: "Count the possible ways to climb stairs.", d: "Easy", t: "Dynamic Programming", category: "Technical" },
    { q: "Solve the House Robber problem.", d: "Medium", t: "Dynamic Programming", category: "Technical" },
    { q: "Reverse a string in-place via two-pointer recursion.", d: "Easy", t: "Recursion", category: "Technical" },
    { q: "Generate all subsets/permutations recursively.", d: "Medium", t: "Recursion", category: "Technical" },
    { q: "Explain Gray code generation.", d: "Medium", t: "Bitwise", category: "Technical" },
    { q: "Explain bitmask‑based dynamic programming for small N.", d: "Hard", t: "Bitwise", category: "Technical" },
    { q: "Explain the producer‑consumer problem and deadlock avoidance.", d: "Hard", t: "Multithreading", category: "Technical" },
    { q: "Explain how to implement synchronized access to shared resources.", d: "Medium", t: "Multithreading", category: "Technical" },
    { q: "Explain exception handling: custom exceptions and multi‑catch scenarios.", d: "Easy", t: "OOP", category: "Technical" },
    { q: "Explain SQL queries: joins, correlated subqueries, window functions, CTEs.", d: "Hard", t: "SQL", category: "Technical" },
    { q: "Explain SQL BI schema: star vs snowflake, fact/dimension tables.", d: "Hard", t: "Databases", category: "Technical" },
    { q: "Explain the differences between SQL and NoSQL transactions vs eventual consistency.", d: "Medium", t: "Databases", category: "Technical" },

    // --- Behavioral Questions from new list ---
    { q: "Tell me about a challenge you overcame at work or school.", d: "Medium", t: "Problem-Solving", category: "Behavioral" },
    { q: "Describe a time when the first solution didn’t work—how did you adapt?", d: "Medium", t: "Adaptability", category: "Behavioral" },
    { q: "Explain when you made a decision with incomplete information.", d: "Medium", t: "Decision Making", category: "Behavioral" },
    { q: "Share a time you solved a complex problem under tight constraints.", d: "Hard", t: "Problem-Solving", category: "Behavioral" },
    { q: "Tell me about a time you anticipated an issue and proactively addressed it.", d: "Medium", t: "Initiative", category: "Behavioral" },
    { q: "Describe a situation where your assumptions turned out wrong.", d: "Medium", t: "Problem-Solving", category: "Behavioral" },
    { q: "Tell me about a time you had to prioritize competing tasks.", d: "Easy", t: "Time Management", category: "Behavioral" },
    { q: "Explain a time you resolved a mistake you originally made.", d: "Medium", t: "Accountability", category: "Behavioral" },
    { q: "Describe when you had to analyze a situation quickly and act.", d: "Medium", t: "Decision Making", category: "Behavioral" },
    { q: "Share an example of creative problem‐solving you applied.", d: "Medium", t: "Problem-Solving", category: "Behavioral" },
    { q: "Talk about a time you pivoted mid–project based on feedback.", d: "Medium", t: "Adaptability", category: "Behavioral" },
    { q: "Explain an instance where your approach had to change due to stakeholder input.", d: "Medium", t: "Communication", category: "Behavioral" },
    { q: "Describe a situation where you had to troubleshoot an unexpected issue.", d: "Medium", t: "Problem-Solving", category: "Behavioral" },
    { q: "Tell me about a time you improved a process or system.", d: "Medium", t: "Initiative", category: "Behavioral" },
    { q: "Explain how you solved a problem with limited resources.", d: "Medium", t: "Problem-Solving", category: "Behavioral" },
    { q: "Describe a situation involving root‐cause analysis you performed.", d: "Hard", t: "Problem-Solving", category: "Behavioral" },
    { q: "Share when data or evidence helped you make a decision.", d: "Medium", t: "Decision Making", category: "Behavioral" },
    { q: "Tell me about a time you had to work across teams to solve a problem.", d: "Medium", t: "Teamwork", category: "Behavioral" },
    { q: "Explain a time you handled conflicting requirements.", d: "Medium", t: "Problem-Solving", category: "Behavioral" },
    { q: "Describe when you had to meet an urgent deadline.", d: "Easy", t: "Time Management", category: "Behavioral" },
    { q: "Share a failure moment and how you turned it into learning.", d: "Easy", t: "Growth Mindset", category: "Behavioral" },
    { q: "Tell me about a project that didn’t go as planned.", d: "Medium", t: "Adaptability", category: "Behavioral" },
    { q: "Describe a time you accepted responsibility for a failure.", d: "Easy", t: "Accountability", category: "Behavioral" },
    { q: "Explain how you solved a problem despite resistance from others.", d: "Hard", t: "Influence", category: "Behavioral" },
    { q: "Tell me about a decision you made where long‐term impact mattered.", d: "Hard", t: "Decision Making", category: "Behavioral" },
    { q: "Tell me about working with a difficult team member.", d: "Medium", t: "Teamwork", category: "Behavioral" },
    { q: "Describe a time when your idea wasn’t accepted—how did you respond?", d: "Medium", t: "Communication", category: "Behavioral" },
    { q: "Explain a moment you acted as mediator between colleagues.", d: "Medium", t: "Conflict Resolution", category: "Behavioral" },
    { q: "Share when you contributed to a team’s success beyond your role.", d: "Easy", t: "Teamwork", category: "Behavioral" },
    { q: "Describe your role in a high‑performing team project.", d: "Easy", t: "Teamwork", category: "Behavioral" },
    { q: "Tell me about a time you helped someone succeed.", d: "Easy", t: "Mentorship", category: "Behavioral" },
    { q: "Explain how you built rapport in a new group/team.", d: "Easy", t: "Teamwork", category: "Behavioral" },
    { q: "Describe a cross‑functional project and your experience.", d: "Medium", t: "Teamwork", category: "Behavioral" },
    { q: "Share a time you compromised to reach a team goal.", d: "Easy", t: "Teamwork", category: "Behavioral" },
    { q: "Tell me how you ensured quiet voices were heard in a team.", d: "Medium", t: "Inclusion", category: "Behavioral" },
    { q: "Explain a situation where open communication improved results.", d: "Easy", t: "Communication", category: "Behavioral" },
    { q: "Describe a team where there was low engagement—what did you do?", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Explain how you handled unequal contribution from teammates.", d: "Medium", t: "Teamwork", category: "Behavioral" },
    { q: "Tell me about a time you took on informal leadership.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Describe how you celebrated team success.", d: "Easy", t: "Teamwork", category: "Behavioral" },
    { q: "Explain how you built trust in a newly formed team.", d: "Medium", t: "Teamwork", category: "Behavioral" },
    { q: "Describe a situation where you resolved internal conflict professionally.", d: "Medium", t: "Conflict Resolution", category: "Behavioral" },
    { q: "Tell me about team feedback you helped implement.", d: "Easy", t: "Feedback", category: "Behavioral" },
    { q: "Explain how you aligned team goals with stakeholder expectations.", d: "Medium", t: "Communication", category: "Behavioral" },
    { q: "Describe how you gave constructive feedback to a peer.", d: "Medium", t: "Feedback", category: "Behavioral" },
    { q: "Tell me about working with someone very different from you.", d: "Easy", t: "Teamwork", category: "Behavioral" },
    { q: "Explain how you helped onboard or mentor a colleague.", d: "Easy", t: "Mentorship", category: "Behavioral" },
    { q: "Share how you balanced team objectives with individual tasks.", d: "Medium", t: "Time Management", category: "Behavioral" },
    { q: "Tell me about a time when team culture had to change—your role?", d: "Hard", t: "Leadership", category: "Behavioral" },
    { q: "Describe how you maintained team motivation during stressful times.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Tell me about a time you took initiative aside from your job role.", d: "Easy", t: "Initiative", category: "Behavioral" },
    { q: "Explain when you led a project from start to finish.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Describe a tough decision you had to make and why.", d: "Medium", t: "Decision Making", category: "Behavioral" },
    { q: "Tell me about mentoring someone and the impact it had.", d: "Easy", t: "Mentorship", category: "Behavioral" },
    { q: "Explain how you held others accountable in a group effort.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Describe leading under ambiguity or changing priorities.", d: "Hard", t: "Leadership", category: "Behavioral" },
    { q: "Share a time you acted decisively without waiting for instruction.", d: "Easy", t: "Ownership", category: "Behavioral" },
    { q: "Tell me about a time you motivated a team member.", d: "Easy", t: "Leadership", category: "Behavioral" },
    { q: "Explain how you delegated effectively in a project.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Describe when you advocated for change or improvement.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Tell me about taking leadership in an emergency situation.", d: "Hard", t: "Leadership", category: "Behavioral" },
    { q: "Explain how you handled a leadership role you weren’t ready for.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Describe when you championed a project and overcame obstacles.", d: "Hard", t: "Leadership", category: "Behavioral" },
    { q: "Tell me about a time you earned buy‑in across teams.", d: "Medium", t: "Influence", category: "Behavioral" },
    { q: "Explain how you measured and celebrated project success.", d: "Easy", t: "Leadership", category: "Behavioral" },
    { q: "Describe a time when your leadership led to measurable results.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Tell me about advocating for a customer, user, or stakeholder.", d: "Easy", t: "Ownership", category: "Behavioral" },
    { q: "Explain how you ensured ethical standards in a team initiative.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Describe how you scaled your efforts to reach a broader team.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Tell me about handling resource constraints as a leader.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Explain how you built resilience in your team after failure.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Describe when you spearheaded process improvements.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Tell me about setting long‑term goals for a project or team.", d: "Easy", t: "Leadership", category: "Behavioral" },
    { q: "Explain how you developed leadership in others.", d: "Medium", t: "Leadership", category: "Behavioral" },
    { q: "Describe leading a collaborative initiative across departments.", d: "Hard", t: "Leadership", category: "Behavioral" },
    { q: "Tell me about a time you adapted to sudden change.", d: "Easy", t: "Adaptability", category: "Behavioral" },
    { q: "Describe managing multiple urgent priorities simultaneously.", d: "Medium", t: "Time Management", category: "Behavioral" },
    { q: "Explain handling unexpected requests from leadership.", d: "Medium", t: "Adaptability", category: "Behavioral" },
    { q: "Tell me how you handled a project cancellation.", d: "Medium", t: "Adaptability", category: "Behavioral" },
    { q: "Describe a time you had to learn and use a new tool quickly.", d: "Easy", t: "Adaptability", category: "Behavioral" },
    { q: "Explain managing repetitive tasks while staying engaged.", d: "Easy", t: "Stress Management", category: "Behavioral" },
    { q: "Tell me how you stayed productive during ambiguity.", d: "Medium", t: "Adaptability", category: "Behavioral" },
    { q: "Describe rebudgeting or resource reallocating last minute.", d: "Hard", t: "Adaptability", category: "Behavioral" },
    { q: "Explain a time when priorities shifted mid‑project.", d: "Medium", t: "Adaptability", category: "Behavioral" },
    { q: "Tell me about handling high workload without burnout.", d: "Medium", t: "Stress Management", category: "Behavioral" },
    { q: "Describe coping with personal stress while staying professional.", d: "Hard", t: "Stress Management", category: "Behavioral" },
    { q: "Explain how you handled performance pressure in an assessment.", d: "Medium", t: "Stress Management", category: "Behavioral" },
    { q: "Tell me when you had to deliver under compressed timelines.", d: "Medium", t: "Time Management", category: "Behavioral" },
    { q: "Describe adapting to a remote or new working environment.", d: "Easy", t: "Adaptability", category: "Behavioral" },
    { q: "Explain how you remained flexible during shifting deadlines.", d: "Easy", t: "Adaptability", category: "Behavioral" },
    { q: "Tell me how you maintained quality under time pressure.", d: "Medium", t: "Stress Management", category: "Behavioral" },
    { q: "Describe a time you adjusted scope while keeping stakeholders happy.", d: "Medium", t: "Adaptability", category: "Behavioral" },
    { q: "Explain managing multiple stakeholders with changing demands.", d: "Hard", t: "Adaptability", category: "Behavioral" },
    { q: "Tell me how you responded when leadership expectations changed.", d: "Medium", t: "Adaptability", category: "Behavioral" },
    { q: "Describe handling project overlap or conflicting deadlines.", d: "Medium", t: "Time Management", category: "Behavioral" },
    { q: "Explain adapting to team disruptions or unexpected absences.", d: "Medium", t: "Adaptability", category: "Behavioral" },
    { q: "Tell me what you do when a high‑visibility deadline is moved up.", d: "Medium", t: "Stress Management", category: "Behavioral" },
    { q: "Describe a situation where you reprioritized at short notice.", d: "Easy", t: "Time Management", category: "Behavioral" },
    { q: "Explain balancing standard work with an urgent project.", d: "Medium", t: "Time Management", category: "Behavioral" },
    { q: "Tell me about managing change in team leadership or structure.", d: "Medium", t: "Adaptability", category: "Behavioral" },
    { q: "Describe delivering bad news—to a client or stakeholder.", d: "Hard", t: "Communication", category: "Behavioral" },
    { q: "Tell me how you persuaded a team or client to adopt your idea.", d: "Medium", t: "Influence", category: "Behavioral" },
    { q: "Explain how you communicated results to a non‑technical audience.", d: "Easy", t: "Communication", category: "Behavioral" },
    { q: "Describe a time when listening helped resolve a conflict.", d: "Easy", t: "Communication", category: "Behavioral" },
    { q: "Tell me how you handled a presentation gone wrong and recovered.", d: "Medium", t: "Communication", category: "Behavioral" },
    { q: "Explain dealing with communication gaps in remote work.", d: "Easy", t: "Communication", category: "Behavioral" },
    { q: "Describe keeping stakeholders updated regularly.", d: "Easy", t: "Communication", category: "Behavioral" },
    { q: "Tell me about adapting your communication style per audience.", d: "Easy", t: "Communication", category: "Behavioral" },
    { q: "Explain how you handled feedback you didn’t agree with.", d: "Medium", t: "Communication", category: "Behavioral" },
    { q: "Tell me how you handled a miscommunication's fallout.", d: "Medium", t: "Communication", category: "Behavioral" },
    { q: "Describe when you clarified expectations with unclear directions.", d: "Easy", t: "Communication", category: "Behavioral" },
    { q: "Tell me how you championed an idea to leadership.", d: "Medium", t: "Influence", category: "Behavioral" },
    { q: "Explain how you simplified complex information for influence.", d: "Medium", t: "Communication", category: "Behavioral" },
    { q: "Describe negotiating resources or timelines for your team.", d: "Medium", t: "Influence", category: "Behavioral" },
    { q: "Tell me how you reframed a conflict as a constructive discussion.", d: "Medium", t: "Conflict Resolution", category: "Behavioral" },
    { q: "Explain sharing credit versus accepting blame in a team.", d: "Easy", t: "Accountability", category: "Behavioral" },
    { q: "Tell me about creating alignment across teams or functions.", d: "Medium", t: "Communication", category: "Behavioral" },
    { q: "Describe when you asked clarifying questions to avoid errors.", d: "Easy", t: "Communication", category: "Behavioral" },
    { q: "Tell me about resolving a misunderstanding with a stakeholder.", d: "Medium", t: "Communication", category: "Behavioral" },
    { q: "Explain how you managed information flow in a fast‑paced change.", d: "Medium", t: "Communication", category: "Behavioral" },
    { q: "Tell me a time you built consensus across differing views.", d: "Hard", t: "Influence", category: "Behavioral" },
    { q: "Describe handling a grievance raised with you.", d: "Medium", t: "Communication", category: "Behavioral" },
    { q: "Tell me how you sold a process improvement to others.", d: "Medium", t: "Influence", category: "Behavioral" },
    { q: "Explain delivering performance or project feedback.", d: "Medium", t: "Communication", category: "Behavioral" },
    { q: "Describe presenting new ideas to senior management successfully.", d: "Hard", t: "Influence", category: "Behavioral" },
];

const categories = ["All", "Technical", "Behavioral"];
const difficulties = ["All", "Easy", "Medium", "Hard"];

const QuestionsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // Memoize the filtered list to avoid re-calculating on every render
    const filteredQuestions = useMemo(() => {
        return allSampleQuestions.filter(item => {
            const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
            const matchesDifficulty = selectedDifficulty === "All" || item.d === selectedDifficulty;
            const matchesSearch = item.q.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesDifficulty && matchesSearch;
        });
    }, [selectedCategory, selectedDifficulty, searchTerm]);

    const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
        const colors: { [key: string]: string } = {
            Easy: 'bg-green-100 text-green-700',
            Medium: 'bg-yellow-100 text-yellow-700',
            Hard: 'bg-red-100 text-red-700',
        };
        return <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors[difficulty] || 'bg-gray-100 text-gray-700'}`}>{difficulty}</span>
    };

    const CategoryIcon = ({ category }: { category: string }) => {
        const icons: { [key: string]: React.ReactElement } = {
            Technical: <Laptop className="h-4 w-4" />,
            Behavioral: <Users className="h-4 w-4" />,
        };
        return <span className="mr-2">{icons[category] || null}</span>;
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-2">Question Library</h1>
                    <p className="text-lg text-gray-500">Filter and browse our collection of interview questions</p>
                </div>

                {/* Filters Section */}
                <div className="bg-white p-4 rounded-xl shadow-sm border mb-8 sticky top-4 z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Category Filter */}
                        <div>
                            <label className="text-sm font-medium text-gray-600">Category</label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {categories.map(cat => (
                                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1 text-sm rounded-full transition-all ${selectedCategory === cat ? 'bg-primary text-white font-semibold' : 'bg-gray-100 hover:bg-gray-200'}`}>{cat}</button>
                                ))}
                            </div>
                        </div>
                        {/* Difficulty Filter */}
                        <div>
                            <label className="text-sm font-medium text-gray-600">Difficulty</label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {difficulties.map(diff => (
                                    <button key={diff} onClick={() => setSelectedDifficulty(diff)} className={`px-3 py-1 text-sm rounded-full transition-all ${selectedDifficulty === diff ? 'bg-primary text-white font-semibold' : 'bg-gray-100 hover:bg-gray-200'}`}>{diff}</button>
                                ))}
                            </div>
                        </div>
                        {/* Search Filter */}
                        <div className='relative'>
                            <label className="text-sm font-medium text-gray-600">Search</label>
                            <Search className="absolute left-3 top-10 text-gray-400 h-5 w-5" />
                            <input 
                                type="text"
                                placeholder="Search questions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border rounded-lg w-full mt-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                             {searchTerm && <X className="absolute right-3 top-10 text-gray-400 h-5 w-5 cursor-pointer" onClick={() => setSearchTerm('')}/>}
                        </div>
                    </div>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                    {filteredQuestions.length > 0 ? (
                        filteredQuestions.map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg border shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition-transform hover:scale-[1.02]">
                                <div className="flex items-start">
                                    <CategoryIcon category={item.category} />
                                    <p className="text-md text-gray-800 flex-grow">{item.q}</p>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
                                    <DifficultyBadge difficulty={item.d} />
                                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{item.t}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg border">
                            <h3 className="text-xl font-semibold text-gray-700">No Questions Found</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionsPage;
