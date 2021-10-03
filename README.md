# tray.io-roomba
Code exercise for Solutions Architect role at Tray.io 
*Now with maps*

This is coded all in VanillaJS and NodeJS - no other imports.  
As specified it reads the contents of 'input.txt' placed in the same folder as roomba.js
and can be executed by downloading code and running 'node roomba.js'.

There are several debugging console.log statements that can verbosely describe what was read from the input file, the starting position and each move of the roomba, including when walls are hit and saying 'Yum!' whenever dirt is picked up.

This branch has a map building function that results in an array of icons representing the path of the roomba and the cleaned spots and missed spots. It outputs a starting map and one map per step so that you can follow the progress of the roomba.

<img width="416" alt="Screen Shot 2021-10-03 at 13 22 04" src="https://user-images.githubusercontent.com/20652527/135766619-827e1080-3557-4e79-a646-c00f3b25c5b2.png">
<img width="240" alt="Screen Shot 2021-10-03 at 13 22 21" src="https://user-images.githubusercontent.com/20652527/135766616-a6922219-dec5-4394-b9bc-5fe414c1749c.png">
<img width="240" alt="Screen Shot 2021-10-03 at 13 22 31" src="https://user-images.githubusercontent.com/20652527/135766615-26290424-3dff-40b8-b53b-73c3d678501d.png">
<img width="240" alt="Screen Shot 2021-10-03 at 13 22 41" src="https://user-images.githubusercontent.com/20652527/135766613-c97a3ff8-0f37-44ba-ab49-19da534f8907.png">
