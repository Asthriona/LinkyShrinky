# LinkyShrinky
This small piece of software has been made using nodeJS 12, and is used to make super long URL (like amazon) shorter!
As we all know everything thats short is cute ^w^  
also it count how many time the link got clicked!

## Useage:
You can use this repo for your own, modify it and take credit for it, but please mention me somewhere so i can take a bit of it too :p  
To credit me, just put my name "Asthriona" or "Asthriona Ng" and a link to my website (Asthriona.com) or my github/this repo (github.com/asthriona)  
would be greatly apreciated :)  
  
## Install:
```
git clone https://github.com/Asthriona/LinkyShrinky.git
cd LinkyShrinky
npm i
```
Create a `config.json` file and put few information in there
```
"port": 3000,
"dblink": "mongodb://<username>:<password>@url:port/databse"
```
the port will be the port you want to run it on (80 for default web)  
dblink will be your connection URI for your mongoDB databse (you can get a free cluster on mongodb.net)  
  
## Update:
To check for update just come here and see if I pushed something if yes, just go to the folder where you installed LL and use `git pull origin master`, then `npm i` to install any new package I would have use and restart the software.

## Usefull:
I can recommand `pm2` to keep the software running in the background and restart it if it crash for any reason.

# Roadmap
- [ ] User login (Discord Oauth?)
- [ ] User backend
- [ ] Multi user compatibility
- [ ] (Feel free to open an issue if you have any idea!)

# Changelogs:
## V1.0.0
+ Initial