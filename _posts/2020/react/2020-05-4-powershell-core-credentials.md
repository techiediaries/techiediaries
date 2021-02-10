---
layout: post
title:  "Working with Credentials in PowerShell Core"
date:   2020-05-4
excerpt: "Learn how to get work with credentials in PowerShell Core"
tags: [powershell]
---

One of the first things you will notice when  working  with PowerShell is that many cmdlets support a parameter called  **credential**. Most of those cmdlets, whether you work on PowerShell Core or Windows PowerShell, can be  executed  remotely and with different credentials. In order to see which cmdlets support a  `Credential`  parameter, you can use the `ParameterName` parameter with  `Get-Command`  to discover them.

Parameters control the way cmdlets work, much like command-line parameters, but are highly standardized. Every parameter begins with a dash and is followed by one or more parameter values. The following code sample helps illustrate which cmdlets can use the `Credential`  parameter, for example.

```powershell
# Which cmdlets support credentials?
Get-Command -ParameterName Credential
```

First of all, we need to see what a credential actually is by looking at the next code block:

```powershell
# A combination of account and .NET SecureString object
$username = 'contoso\admin'
$password = 'P@ssw0rd' | ConvertTo-SecureString -AsPlainText -Force 
$newCredential = New-Object -TypeName pscredential $userName, $password
$newCredential.GetType().FullName 
$newCredential | Get-Member
```

Looking at the code, you can see that the `pscredential` object type is inherently related to PowerShell, coming from the  `System.Management.Automation`  namespace. When viewing the members of that type with  `Get-Member`, you can see  that  you are able to retrieve the password once you have entered it. However, the  password  is encrypted with the  **Data Protection API**  (**DPAPI**).

> Note

To learn more about the DPAPI, please visit  [https://docs.microsoft.com/en-us/dotnet/standard/security/how-to-use-data-protection](https://docs.microsoft.com/en-us/dotnet/standard/security/how-to-use-data-protection).

You can now use your credentials for various purposes, for example, to create local users and groups, create services, authenticate with web services, and many more. We will revisit these examples later in this chapter when we look at REST APIs and external commands.

Using the .NET method  `GetNetworkCredential`  gives quite a different result. The plaintext password is displayed right beside the encrypted password.

This is by no means a gaping security hole—with the DPAPI, the account on your system already has access to the password. With a little bit of .NET, we can mimic the behavior of the `GetNetworkCredential`  method:

```powershell
# At first you can only see the reference to a SecureString object
$newCredential.Password

# Using GetNetworkCredential, it's plaintext again
$newCredential.GetNetworkCredential() | Get-Member$newCredential.GetNetworkCredential().Password

# But this was possible anyway[Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($newCredential.Password))

```

If you are asking yourself what you need the plaintext password for, take a look at the next code sample. We use an external application to store the credential for the remote machine we want to connect to via  **Remote Desktop Services**  (**RDS**). The remote desktop client makes use of the stored credentials subsequently to connect to the remote machine:

```powershell
# Why use the plaintext password at all?
$cmd = 'cmdkey.exe /add:"TERMSRV/{0}" /user:"{1}" /pass:"{2}"' -f 'SomeHost', $newCredential.UserName, $newCredential.GetNetworkCredential().Password
Invoke-Expression$cmd | Out-Null
mstsc.exe "/v:SomeHost"
```

To securely store credentials at rest, the built-in `Protect-CmsMessage`  and  `Unprotect-CmsMessage` cmdlets can be used  with  PowerShell 5 and later. **Cryptographic Message Syntax**  (**CMS**) cmdlets leverage certificate-based encryption to store data securely. This requires you to have the public key of the RSA document encryption certificate of your recipient—which might be you as well. In order to decrypt a message encrypted to you, you will need access to your private key, as seen in the following code sample:

```powershell
# Add a new self-signed certificate for testing
New-SelfSignedCertificate -Subject SomeRecipient -KeyUsage KeyEncipherment -CertStoreLocation Cert:\CurrentUser\My -Type DocumentEncryptionCert

# Use the certificate to encrypt a message (public key of recipient required)
Protect-CmsMessage -to CN=SomeRecipient -Content "Securable goes here" | Out-File .\EncryptedContent.txt

# Decrypt the message on another system (private key required)
Unprotect-CmsMessage -Content (Get-Content .\EncryptedContent.txt -Raw)
```

In order to use strong cryptography to  protect  your securable data at rest in older PowerShell versions, or if you want to encrypt data using a password or an ECDH certificate, you can use the community-maintained module  **ProtectedData**.

**Elliptic-Curve Diffie-Hellman**  (**ECDH**) is a key  agreement  algorithm, whereas  **Rivest-Shamir-Adleman**  (**RSA**) is a key encipherment algorithm. Both are asymmetric algorithms. Elliptic curves rely on the difficulty of calculating  two  locations on an elliptic curve, and RSA relies on the difficulty of integer factorization of the product of two large prime numbers.

### Note

Be wary of using plaintext credentials in your scripts—you never know when script block logging is enabled.