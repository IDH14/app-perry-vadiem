# Server

````
# install dependencies
$ npm install

# create file directories
$ mkdir client-files server-files
$ touch server-files/file1.txt server-files/file2.txt

# start server
$ npm start 
$ OR npm start -- --port=[port number]
$ OR npm start -- --dir=[files directory name]

# call test scripts
$ node server-tester.js --method=LIST
$ node server-tester.js --method=GET --file=file1.txt
$ node server-tester.js --method=GET --file=file3.txt
$ node server-tester.js --method=DELETE --file=file1.txt
$ node server-tester.js --method=DELETE --file=file3.txt
$ node server-tester.js --method=LIST --port=[port nr.] --host=[host nr.]

# run unit tests
$ npm test
````

# Rewrite Typescript
https://basarat.gitbooks.io/typescript/content/docs/quick/nodejs.html