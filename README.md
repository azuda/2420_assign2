# ACIT 2420 Assignment 2

## Repository

*Aaron Zhang - A01316218*

### File Structure

![file structure](images/file_structure.png)

## Step 1

### Create Infrastructure on Digital Ocean

#### VPC

  1. Under: Manage > Networking > VPC, click **Create VPC Network**
  2. Choose SFO3 as the datacenter region
  3. Name the VPC **vpc-2420** and finish creating the VPC

In the VPC tab, you should now be able to see the VPC you just created.

![vpc](images/vpc.png)

#### Load Balancer

  1. Under: Manage > Networking > Load Balancers, click **Create a Load Balancer**
  2. Choose San Francisco 3 as the datacenter region (you should see "2 Droplets in this region")
  3. Select the VPC **vpc-2420** you created earlier
  4. Under Scaling configuration, set **Number of nodes** to **2**
  5. Under Connect Droplets, add the tag **Web** and create the load balancer

If you click on your new load balancer, you should see the region, VPC, and the two droplets you just configured.

![load_balancer](images/load_balancer.png)

#### Firewall

  1. Under: Manage > Networking > Firewalls, click **Create Firewall**
  2. Name the firewall **fw-2420**
  3. Under Inbound Rules, select **HTTP** as a new rule; replace existing sources with the name of the load balancer created earlier
  4. Under Apply to Droplets, enter the **Web** tag to link your droplets

If you click on your new firewall, you should see the inbound rule you just created which sources your load balancer.

![fw](images/fw.png)

## Step 2

Do the following procedure for both droplets:

### Add User

  1. ssh into droplet as root
  2. Create a new user `useradd -ms /bin/bash <username>`
  3. Set a password for  user `passwd <username>`
  4. ssh into the droplet as the new user and set `PermitRootLogin` to `no` in `/etc/ssh/sshd_config`.
  5. Run `sudo systemctl restart ssh`

## Step 3

Do the following procedure for both droplets:

### Install Caddy Web Server on Droplets

  1. `wget https://github.com/caddyserver/caddy/releases/download/v2.6.2/caddy_2.6.2_linux_amd64.tar.gz`
  2. `tar -xvf caddy_2.6.2_linux_amd64.tar.gz`
  3. `sudo chown root: caddy`
  4. `sudo cp caddy /usr/bin/`

## Step 4

### Create Document

  1. On local machine, create a directory called **assignment_2**
  2. Inside **assignment_2/**, create directory **html**
  3. Inside **html/**, create file **index.html** and add some boilerplate HTML:
  ![index_html](images/index_html.png)

### Create Web App

  1. Inside **assignment_2/**, create directory **src**
  2. `npm init` on **src/**
  2. `npm install fastify` on **src/**
  3. Create file **index.js** in **src/** and add the following code:
  ![index_js](images/index_js.png)
  4. Test web app locally and ensure that **index.html** is served successfully

Do the following procedure for both droplets:

### Move Files to Droplets
  1. Move **html/** and **src/** to both droplets (use rsync or sftp)
  2. `sudo mv html /var/www` and `sudo mv src /var/www/`

## Step 5

### Create Caddyfile

  1. On local machine, create a file named **Caddyfile**
  3. Add the following to the **Caddyfile** (use the IP of the load balancer created earlier):
  ![caddyfile](images/caddyfile.png)

## Step 6

Do the following procedure for both droplets:

### Install Node with Volta

  1. `curl https://get.volta.sh | bash`
  2. Restart terminal, `source ~/.bashrc`
  3. `volta install node`

## Step 7

### Create Service File
  1. On local machine, create a file named **hello_web.service** and write:
  ![hello_web](images/hello_web.png)
  2. Ensure that User, Group, and ExecStart use the username you configured earlier.

## Step 8

Do the following procedures for both droplets:

### Upload and Move Files

  1. Upload **Caddyfile** and **hello_web.service**
  2. `sudo mkdir /etc/caddy` then `sudo mv Caddyfile /etc/caddy/Caddyfile`
  4. `sudo mv hello_world.service /etc/systemd/system`

### Start and Test hello_web.service

  1. `sudo systemctl daemon-reload`
  2. `sudo systemctl enable hello_web.service`
  3. `sudo systemctl start hello_web.service`
  4. `systemctl status hello_web.service`
  5. Ensure service is active and running successfully
  ![service_status](images/service_status.png)
  6. Slightly change **index.html** on one of the droplets to test that the load balancer is working

## Step 9

  1. Visit the IP of the load balancer to see the web app in action

![api](images/api.png)

Visit my hello_web api here: `24.199.69.126`
