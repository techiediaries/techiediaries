# How to Fix Git Always Asking for Username and Password 
If Git is always asking you for your username and password when pushing or pulling from a GitHub repository, This is a common problem if you use HTTPS clone URL for cloning the repository. 

Let's see how to solve this!

The  `https://`  clone URLs are available on all public and private repositories. These URLs work everywhere, even if you are behind a firewall or proxy.

![](https://www.freecodecamp.org/news/content/images/2019/10/clone.png)

If you have cloned your repository using HTTPS using your command-line interface, you’ll be prompted for your GitHub username and password.


Using HTTPS remote URL is useful if you need to set up than SSH and works through strict firewalls and proxies but this also means that you'll get prompted for your GitHub username and password each time you pull or push to your repository.

This can be solved by configuring Git to store your password.

Here’s how:

You can update the origin remote using SSH instead of HTTPS;

```bash
git remote set-url origin git@github.com:username/your-repo.git
```

or make Git store the username and password: 

```bash
git config --global credential.helper store
```

-   Save the username and password for a session (cache it);

```bash
git config --global credential.helper cache
```


# CONCLUSION


We have seen how we can configure Git not to ask for ther username and password when pushing or pulling data from a GitHub repository cloned via HTTPS.
