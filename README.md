# Disclaimer:
:warning:This Project is no longer functional due to outdated dependencies.:warning:

:warning:Fixing it would require more time than I deem the project to be worth it.:warning:


# conspec
Management System for training classes.
This application was created during a practical assignment at the university of applied sciences Karlsruhe <a href = "https://www.hs-karlsruhe.de/home.html">https://www.hs-karlsruhe.de/home.html</a><br>
If you have any ideas for improvements or bug fixes, feel free to contact me <br>

<h3>Building and runnning the app</h3>
Running <strong>$npm run electron</strong> will build and run the application.<br>
If you already build the application, <strong>$npm run electron</strong> will run the application.

<h3>Packaging the app</h3>
In order to create a runnable windows executable, you can use <br>
<strong> npm run package-win</strong> <br>
The same is possible for mac: <br>
<strong> npm run package-ios</strong><br>
For more information concerning the cli commands, please check out the <strong>package.json</strong>

<h3> Known errors </h3>
<ul>
<li>Browserwindow in mac not moveable (high priority)</li>
<li>Deleted classses are still saved in cache. A deleted class may be "resurrected" by chrome loading the cache. Deleting the class again will lead to a undefined data base error. <br>
Reproduction: create new class in empty class list >> delete the class >> press "create class" button >> press "Back". </li>
<li>Checkboxes dont care about the stylesheet. However this is only visually unpleasent.</li>
<li>Creating a new Member in the member overview sometimes requires 2 clicks on the button due to a rare internal error. This need further investigating.</li>
<li>High number of dependencies. This needs to be adressed</li>
</ul>
