# Install Numpy on Ubuntu 20.04 Focal Fossa Linux

The objective is to install Numpy on Ubuntu 20.04 Focal Fossa Linux

**In this tutorial you will learn:**

-   How to install Numpy from Ubuntu repository
-   How to install Numpy using pip or pip3 commands
-   How to upgrade Numpy to latest version

[![Numpy on Ubuntu 20.04 Focal Fossa Linux](https://linuxconfig.org/images/01-install-numpy-on-ubuntu-20-04-focal-fossa-linux.png)](https://linuxconfig.org/images/01-install-numpy-on-ubuntu-20-04-focal-fossa-linux.png "Numpy on Ubuntu 20.04 Focal Fossa Linux")

Numpy on Ubuntu 20.04 Focal Fossa Linux

## Software Requirements and Conventions Used

Software Requirements and Linux Command Line Conventions

Category

Requirements, Conventions or Software Version Used

System

Installed or  [upgraded Ubuntu 20.04 Focal Fossa](https://linuxconfig.org/how-to-upgrade-ubuntu-to-20-04-lts-focal-fossa)

Software

python,python3

Other

Privileged access to your Linux system as root or via the  `sudo`  command.

Conventions

**#**  - requires given  [linux commands](https://linuxconfig.org/linux-commands)  to be executed with root privileges either directly as a root user or by use of  `sudo`  command  
**$**  - requires given  [linux commands](https://linuxconfig.org/linux-commands)  to be executed as a regular non-privileged user

## Install Numpy on Ubuntu 20.04 step by step instructions

### Install Numpy from Ubuntu repository

1.  To install numpy on Ubuntu 20.04 execute the following command. Make a selection between Python 2 or Python 3 or possibly install both:
    
    PYTHON 2:  
    $ sudo apt install python-numpy  
    PYTHON 3:  
    $ sudo apt install python3-numpy  
    

----------

_**SUBSCRIBE TO NEWSLETTER**  
Subscribe to Linux Career  [NEWSLETTER](https://bit.ly/2X5D30q)  and receive latest Linux news, jobs, career advice and tutorials._

----------

----------

3.  Check numpy version:
    
    $ python -c "import numpy; print(numpy.__version__)"  
    1.16.5  
    $ python3 -c "import numpy; print(numpy.__version__)"  
    1.17.4  
    

### Numpy using pip / pip3 command

1.  Given that you have already  [installed Python installer pip on you Ubuntu 20.04](https://linuxconfig.org/how-to-install-python-package-installer-pip-on-ubuntu-20-04-focal-fossa-linux)  host, you can now easily install  `numpy`  by using the  `pip`  or  `pip3`  command:
    
    PYTHON 2:  
    $ pip install numpy  
    PYTHON 3:  
    $ pip3 install numpy  
    

----------

----------

3.  Check numpy version:
    
    $ python -c "import numpy; print(numpy.__version__)"  
    1.16.5  
    $ python3 -c "import numpy; print(numpy.__version__)"  
    1.17.4  
    

### Upgrade numpy to latest version

In case you have installed  `numpy`  from a Ubuntu repository you can upgrade it by simply executing the following command:

PYTHON 2:  
$ sudo apt install python-numpy  
PYTHON 3:  
$ sudo apt install python3-numpy  

Execute the bellow commands, in case you need to upgrade numpy to the latest version with the  `pip`  or  `pip3`:

PYTHON 2:  
$ pip install --upgrade numpy  
PYTHON 3:  
$ pip3 install --upgrade numpy