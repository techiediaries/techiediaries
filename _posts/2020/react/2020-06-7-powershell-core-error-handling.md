---
layout: post
title:  "PowerShell Core Error Handling"
date:   2020-06-7
excerpt: "Learn how to perform error handling in PowerShell Core"
tags: [powershell]
---

Error handling is an important part of scripting. There is nothing worse than a script ruining your infrastructure, just because of one  unhandled  exception. It is also important to note that PowerShell does not work with integer-based exit codes like other shells do. PowerShell always returns objects, or it returns  `$null`. Through different exceptions, cmdlets communicate any errors that have occurred.

### Non-terminating

Exceptions in PowerShell are, by default, non-terminating. This behavior can be overridden per cmdlet or by  setting  the built-in  `$ErrorActionPreference` variable. All errors that occurr during your session are recorded in the built-in  `$error` variable, which is a list with a capacity of 256 errors.

### Terminating errors

Terminating errors can be generated on demand, or by setting the  `ErrorActionPreference`  for the entire session to  `Stop`. Terminating  errors  need to be handled in your code; otherwise, they will also terminate your script. Hence, the name. The usual error handling is done with a  `try`/`catch`  block. We  `try`  to execute a cmdlet,  `catch`  any exception, and, finally, do a cleanup task that is always executed, even if no exception has been thrown:

```powershell
try
{
    $items = Get-Item -Path C:\Does\Not\Exist, C:\Windows, $env:APPDATA -ErrorAction Stop
}
catch [System.Management.Automation.ItemNotFoundException]
{
    # Specific catch block for the exception type
    # PSItem contains the error record, and TargetObject may contain the actual object raising the error
    Write-Host ('Could not find folder {0}' -f $PSItem.TargetObject)
}
finally
{
    # Regardless of whether an error occurred or not, the optional
    # finally block is always executed.
    Write-Host 'Always executed'
}
```

You can find out which type of exception occurred by examining its type, using `$Error[0].Exception.GetType().FullName`.

Another approach that you should try not to take is trapping the error. This is usually done during development, when it is not yet clear what kinds of unhandled exceptions can occur. A  `trap`  block catches all unhandled exceptions, and can be used to gracefully exit a script or just to log the exception:

```powershell
# Trapping errors
# At the beginning of a script, a trap can be introduced to trap any terminating errors that
# are not handled.
trap
{
    Write-Host ('Could not find folder {0}' -f $PSItem.TargetObject)
    continue # or break
}

# Will not trigger the trap
$items = Get-Item -Path C:\Does\Not\Exist, C:\Windows, $env:APPDATA

# Will trigger the trap
$items = Get-Item -Path C:\Does\Not\Exist, C:\Windows, $env:APPDATA -ErrorAction Stop

# Additional code runs if trap statement uses continue
Write-Host 'This is not a good idea'
```

You can find trap blocks at the beginning of a script. The  main  reason to not use traps is that you cannot properly control the code flow after an exception has been caught. Maybe the exception is something that you should handle in the code because it can be corrected (such as a missing folder). Maybe the exception should really terminate your script, as you cannot recover from it, and it will break the rest of the script.
