---
layout: post
title: "服务器性能问题检测工具收集"
date: 2016-01-28 20:55
comments: true
categories: 运维
---
通过下面这些工具更好的对机器问题进行诊断

#### uptime 

    $ uptime                                                        
    21:07:48 up 16 days,  7:04,  1 user,  load average: 5.34, 4.70, 4.43

这个命令可以快速查看机器的负载情况，这些数据表示等待CPU资源的进程和堵塞不可以中断IO进程(进程状态为D)的数量
这些数据可以让我们对系统有一个宏观的了解。

解读输出：以逗号隔开第一部分是系统运行的时间，第二部分是登录用户，第三部分是负载平均量。负载量越低意味着你的系统性能越好

#### dmesg
    $ dmesg                                                        
    [    0.000000] Initializing cgroup subsys cpuset
    [    0.000000] Initializing cgroup subsys cpu
    [    0.000000] Linux version 3.2.0-24-generic (buildd@komainu) (gcc version 4.6.3 (Ubuntu/Linaro 4.6.3-1ubuntu5) ) #38-Ubuntu SMP Tue May 1 16:18:50 UTC 2012 (Ubuntu 3.2.0-24.38-generic 3.2.16)
    [    0.000000] Command line: BOOT_IMAGE=/vmlinuz-3.2.0-24-generic root=/dev/mapper/Apollo-root ro quiet rootdelay=35
    [    0.000000] KERNEL supported cpus:
    [    0.000000]   Intel GenuineIntel
    [    0.000000]   AMD AuthenticAMD
    [    0.000000]   Centaur CentaurHauls
    [    0.000000] BIOS-provided physical RAM map:
    [    0.000000]  BIOS-e820: 0000000000000000 - 00000000000a0000 (usable)
    [    0.000000]  BIOS-e820: 0000000000100000 - 00000000cf379000 (usable)
    [    0.000000]  BIOS-e820: 00000000cf379000 - 00000000cf38f000 (reserved)
    [    0.000000]  BIOS-e820: 00000000cf38f000 - 00000000cf3ce000 (ACPI data)
    [    0.000000]  BIOS-e820: 00000000cf3ce000 - 00000000d0000000 (reserved)
    [    0.000000]  BIOS-e820: 00000000e0000000 - 00000000f0000000 (reserved)
    [    0.000000]  BIOS-e820: 00000000fe000000 - 0000000100000000 (reserved)
    [    0.000000]  BIOS-e820: 0000000100000000 - 0000000430000000 (usable)
    [    0.000000] NX (Execute Disable) protection: active
    [    0.000000] DMI 2.6 present.
    [    0.000000] DMI: Dell Inc. PowerEdge R410/0WWR83, BIOS 1.9.0 10/21/2011
    [    0.000000] e820 update range: 0000000000000000 - 0000000000010000 (usable) ==> (reserved)
    [    0.000000] e820 remove range: 00000000000a0000 - 0000000000100000 (usable)
    [    0.000000] No AGP bridge found.....

命令显示linux内核的环形缓冲区信息，我们可以从中获得诸如系统架构、cpu、挂载的硬件，RAM等多个运行级别的大量的系统信息。当计算机启动时，系统内核（操作系统的核心部分）将会被加载到内存中。在加载的过程中会显示很多的信息，在这些信息中我们可以看到内核检测硬件设备。


#### vmstat

    $ vmstat 1
    procs -----------memory---------- ---swap-- -----io---- -system-- ----cpu----
    r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa
    4  0 2546312 255760 147032 610412    2    2     9    76    1    7 61  4 33  2


每行会输出一些系统核心指标，这些指标可以让我们更详细的了解系统状态。后面跟的参数1，表示每秒输出一次统计信息，表头提示了每一列的含义，这几介绍一些和性能调优相关的列

  r：等待在CPU资源的进程数。这个数据比平均负载更加能够体现CPU负载情况，数据中不包含等待IO的进程。如果这个数值大于机器CPU核数，那么机器的CPU资源已经饱和。   
  free：系统可用内存数（以千字节为单位），如果剩余内存不足，也会导致系统性能问题。下文介绍到的free命令，可以更详细的了解系统内存的使用情况。   
  si, so：交换区写入和读取的数量。如果这个数据不为0，说明系统已经在使用交换区（swap），机器物理内存已经不足。   
  us, sy, id, wa, st：这些都代表了CPU时间的消耗，它们分别表示用户时间（user）、系统（内核）时间（sys）、空闲时间（idle）、IO等待时间（wait）和被偷走的时间（stolen，一般被其他虚拟机消耗）。


#### mpstat
    $ mpstat -P ALL 1    
    Linux 3.2.0-24-generic  01/28/2016  _x86_64_  (4 CPU)

    09:29:33 PM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest   %idle
    09:29:34 PM  all   76.69    0.00    3.51    5.51    0.00    0.00    0.00    0.00   14.29
    09:29:34 PM    0   99.01    0.00    0.99    0.00    0.00    0.00    0.00    0.00    0.00
    09:29:34 PM    1  100.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00
    09:29:34 PM    2   48.98    0.00    6.12   13.27    0.00    0.00    0.00    0.00   31.63
    09:29:34 PM    3   57.58    0.00    7.07   10.10    0.00    0.00    0.00    0.00   25.25

该命令可以显示每个CPU的占用情况，如果有一个CPU占用率特别高，那么有可能是一个单线程应用程序引起的    

#### pidstat
  
    $ pidstat 1                                                 
    Linux 3.2.0-24-generic   01/28/2016  _x86_64_  (4 CPU)

    09:31:23 PM       PID    %usr %system  %guest    %CPU   CPU  Command
    09:31:24 PM      1046    0.00    0.99    0.00    0.99     2  kworker/2:2
    09:31:24 PM      2513    0.99    2.97    0.00    3.96     2  node
    09:31:24 PM     18578  200.99    0.00    0.00  200.99     1  java
    09:31:24 PM     21124    0.99    0.00    0.00    0.99     2  java
    09:31:24 PM     27197    0.00    1.98    0.00    1.98     2  pidstat
    09:31:24 PM     27228    2.97    0.00    0.00    2.97     3  node

pidstat命令输出进程的CPU占用率，该命令会持续输出，并且不会覆盖之前的数据，可以方便观察系统动态。如上的输出，可以看见一个JAVA进程占用了将近200%的CPU时间，既消耗了大约2个CPU核心的运算资源。


#### iostat

    $ iostat -xz 1                                                                  
    Linux 3.2.0-24-generic  01/28/2016  _x86_64_  (4 CPU)

    avg-cpu:  %user   %nice %system %iowait  %steal   %idle
              60.65    0.01    4.03    2.38    0.00   32.92

    Device:         rrqm/s   wrqm/s     r/s     w/s    rkB/s    wkB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
    sda               0.85    19.84    4.07   32.00    35.01   300.28    18.60     0.70   19.37    4.74   21.23   5.05  18.20
    dm-0              0.00     0.00    2.92   50.06    26.91   293.12    12.08     1.07   20.23    6.97   21.01   3.42  18.13
    dm-1              0.00     0.00    2.02    1.79     8.09     7.16     8.00     1.75  459.97    6.14  972.71   0.70   0.27

iostat命令主要用于查看机器磁盘IO情况。该命令输出的列，主要含义是：

  r/s, w/s, rkB/s, wkB/s：分别表示每秒读写次数和每秒读写数据量（千字节）。读写量过大，可能会引起性能问题。   
await：IO操作的平均等待时间，单位是毫秒。这是应用程序在和磁盘交互时，需要消耗的时间，包括IO等待和实际操作的耗时。如果这个数值过大，可能是硬件设备遇到了瓶颈或者出现故障。   
  avgqu-sz：向设备发出的请求平均数量。如果这个数值大于1，可能是硬件设备已经饱和（部分前端硬件设备支持并行写入）。   
  %util：设备利用率。这个数值表示设备的繁忙程度，经验值是如果超过60，可能会影响IO性能（可以参照IO操作平均等待时间）。如果到达100%，说明硬件设备已经饱和。   

#### free 
    
    $ free -m
             total       used       free     shared    buffers     cached
    Mem:      16420044   16166340     253704          0     146060     611384
    -/+ buffers/cache:   15408896    1011148
    Swap:     11878396    2545148    9333248

free命令可以查看系统内存的使用情况

#### sar

    $ sar -n DEV 1
    Linux 3.2.0-24-generic   01/28/2016  _x86_64_  (4 CPU)

    09:39:12 PM     IFACE   rxpck/s   txpck/s    rxkB/s    txkB/s   rxcmp/s   txcmp/s  rxmcst/s
    09:39:13 PM        lo     47.00     47.00      5.09      5.09      0.00      0.00      0.00
    09:39:13 PM      eth1      0.00      0.00      0.00      0.00      0.00      0.00      0.00
    09:39:13 PM      eth0     26.00     36.00      3.23      3.01      0.00      0.00      1.00




