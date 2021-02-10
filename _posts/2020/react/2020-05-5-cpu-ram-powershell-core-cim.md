---
layout: post
title:  "Getting CPU and RAM with PowerShell Core and CIM"
date:   2020-05-5
excerpt: "Learn how to get CPU and RAM with PowerShell Core and CIM"
tags: [powershell]
---

Working in a multiserver environment demands very often to have an easy and fast method to collect information about the servers’ hardware, particularly  CPU and RAM Memory properties. PowerShell Core is a very handy tool in that sense, especially when the client’s SLA (Service Level Agreement) is so strict that you cannot install any 3rd party software to do the job.

Most Windows administrators are familiar with Windows Management Instrumentation (WMI), which is Microsoft’s implementation of the Common Information Model (CIM). CIM is a standard from DMTF.org (Distributed Management Task Force) that provides a common definition of management information for systems, networks, applications, and services.

Without going into too much detail, the standard includes a Specification, Schema, and Metamodel that allow vendors to provide a standard way to manage their products. CIM includes some standard classes that represent information like computer hardware and software. CIM classes can be extended so that vendors may add properties relevant to their products.

In order to collect Memory (RAM) properties information using PowerShell, we use either WMI or CIM classes, `Win32_PhysicalMemory` or `CIM_PhysicalMemory`  respectively

## Get CPU Load Using PowerShell Core and CIM

We need to use `Get-CimInstance` cmdlet with `Win32_Processor` class to get CPU usage as follows:

```powershell
$LoadPercentage = (Get-CimInstance -Class Win32_Processor).LoadPercentage 
```

## Get Memory RAM Using PowerShell Core

These are some ways for the local machine or remote computers.

### Get Memory RAM Details Using PowerShell Core For The Local Machine.

We call **Get-CimInstance** CmdLet and get the necessary data from `CIM_PhysicalMemory`  CIM Class.

```powershell
Get-CimInstance -Class CIM_PhysicalMemory -ComputerName localhost -ErrorAction Stop | Select-Object *
```

### Get Memory RAM Details Using PowerShell Core For Remote Computers

Create the list of servers in the text file and save in, for example, `C:\Temp` folder and run the same command as in the previous solution just use _ComputerName_ parameter in addition. We basically load the content of the text file using `Get-Content` CmdLet and PowerShell will go through the list and run the same command as in the previous solution for each server on the list.

```powershell
Get-CimInstance -Class CIM_PhysicalMemory -ComputerName (Get-Content -Path C:\Temp\servers.txt) -ErrorAction Stop | Select-Object * | Out-GridView
```
  


## WMI History

WMI is Microsoft’s implementation of CIM and it first appeared in Windows NT 4.0. Because Microsoft was an early adopter, DCOM was used for remote management because there was no other defined standard at the time. DCOM stands for Distributed COM and it uses Remote Procedure Calls (RPCs) to make remote connections, which is fine if all devices are on the same network but once they are separated by NAT routers and firewalls, remote connectivity becomes a challenge.

Windows Server 2012 and Windows 8 saw Microsoft make some changes to WMI by aligning it with CIMv2 and moving to WS-MAN for remote connections. Because WS-MAN is a HTTP-based protocol, it is more firewall friendly than DCOM. Although it’s worth noting that the updated WMI stack can be accessed using DCOM for backwards compatibility.

## Microsoft Deprecates WMI Commands

Microsoft has since deprecated the WMI commands in Windows in favor of their CIM counterparts. For example, if you are using PowerShell for management, you should use the CIM cmdlets and not the WMI cmdlets.

Because the WMI cmdlets are deprecated, Microsoft won’t develop them any further. PowerShell Core doesn’t even include the WMI cmdlets, so you must use CIM. And because CIM uses WS-MAN for remote access, connecting to remote systems is easier. The command below uses the Get-WmiObject PowerShell cmdlet to get information about the operating system:  

```powershell
Get-WmiObject  -Class  Win32_OperatingSystem
```
  
In PowerShell Core, you need to use CIM:  

```powershell
Get-CimInstance  -ClassName  Win32_OperatingSystem
```

