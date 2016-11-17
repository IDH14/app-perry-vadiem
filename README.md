# app-perry-vadiem

	$ npm install -g nodemon // for testing

	# install dependencies
	$ npm install

	# create file directories
	$ mkdir client-files server-files
	$ touch server-files/file1.txt server-files/file2.txt

	# start server
	$ nodemon server.js OR node server.js
	
	# call test scripts
	$ node server-tester.js --method=LIST
	$ node server-tester.js --method=GET --file=file1.txt
	$ node server-tester.js --method=GET --file=file3.txt
	$ node server-tester.js --method=DELETE --file=file1.txt
	$ node server-tester.js --method=DELETE --file=file3.txt
