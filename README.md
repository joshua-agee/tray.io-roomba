# tray.io-roomba
Code exercise for Solutions Architect role at Tray.io 

**with an attempt at a map**

This is coded all in VanillaJS and NodeJS - no other imports.  
As specified it reads the contents of 'input.txt' placed in the same folder as roomba.js
and can be executed by downloading code and running 'node roomba.js'.

There are several debugging console.log statements that can verbosely describe what was read from the input file, the starting position and each move of the roomba, including when walls are hit and saying 'Yum!' whenever dirt is picked up.

This branch has a map building function that results in an array of icons representing the path of the roomba and the cleaned spots and missed spots.  I am not thrilled with the result of the map yet - character spacing with emojis is odd.

