# Visualizing History - Making Princeton’s Racialized History Visible Through AR
Documentation for final project for SOC 409 - Critical Approaches to Human Computer Interaction, Spring 2022

### Overview

Final paper, explaining this project and going into the theoretical underpinnings, can be found here: LINK

Technically, this app is fairly simple. It contains static html pages that contain buttons that either link to other static html pages with information or to a location's specific augmented reality content USDZ (Apple's AR model formal) file that is then automatically opened in iOS using ARQuickLook. HTML formatting is done via Bootstrap.

We chose 4 locations as a start point in this project, seen below. At each location there is (/we are planning to put up) a poster with a QR code (found in the QR code folder) that links to a specific html page.

<img width="703" alt="image" src="https://user-images.githubusercontent.com/9939758/166333211-5a3adf99-d516-45fe-bb8b-d014a1d9a274.png">


### Technical Overview

The app is hosted on Heroku: https://soc409-ar-history.herokuapp.com

With each specific location having a URL that directs to it's specific landing page (they all look the same, but link to different historical context pages and of course different AR models):
- FitzRandolph Gate - https://soc409-ar-history.herokuapp.com/fitzrandolphGate.html
- SPIA Fountain - https://soc409-ar-history.herokuapp.com/spiaFountain.html
- Nassau Hall - https://soc409-ar-history.herokuapp.com/nassauHall.html
- James Johnson Arch - https://soc409-ar-history.herokuapp.com/jamesJohnsonArch.html

This git contains all the AR model files and creation files (more on this below in the Augmented Reality section). And it contains a lot of html files that have the names of locations in their titles. This is explained visually below.

The code is connected as follows:
<img width="824" alt="image" src="https://user-images.githubusercontent.com/9939758/166338753-106448a5-8415-4cf8-aaff-a2b5d2717add.png">

As seen above, the naming convention is hopefully pretty straightforward, with location names being in camelCase. Index.html is not used but for testing purposes is used as main page that has buttons that link to all the implemented locations (so no need to scan a qr code!). The webapp is just linked together html pages with associated usdz files.

The composer.json and index.php files are dummy files that trick Heroku to publishing the html pages :)

### Augmented Reality

The augmented reality content is made through Reality Composer: https://developer.apple.com/augmented-reality/tools/ 

Reality Composer is a drag and drop tool for making AR experiences, making our AR iteration process much more seamless. It is bundled with Xcode (Apple's dev platform), so to install it you need to install Xcode (and thus, have a Mac). In Reality Composer, if you go to 'preferences' you can check the box to "enable USDZ export".

AR dev process:
1. collect blurbs + pictures
2. in RC, layout everything
3. export as USDZ, add into working dev folder
4. link to a bootstrap html button as follows:
```
  <a class="btn btn-warning btn-rounded" ref="ar" href=".\SOC409-spiaFountainModel.usdz" role="button" style="width: 200px">
      Open in AR
   </a>
```
5. deploy to Heroku
6. open AR on iPhone, make sure all content is visible, legible, not too big/small, and at the right height
7. back to RC for fixes! (step 2)

#### AR design notes to keep in mind:
1. Text - keep in mind font size! At 2 meters away, 4cm is good. At 3 meters, 5cm. Text needs a background to be legible, and white text on black background is the most legible because there isn't as much glare. Note this means not much text can be added because it takes space! An iPhone screen is small, so everything looks smaller.
2. don't overcrowd! keep content at least 2 meters away
3. Images - can layer with different z-distances to embrace a slight parallax effect
4. Walking in AR - this doesn't work too well and is glitchy (we tried), so content should be legible when only user motion is rotation
5. add something on the ground to let people know when the model is up - also helps tell if things are glitching+ to align content. We used arrows and small notes, like "stand here and look up" or "align arrow with Nassau Hall"
6. arrows can help guide a person's attention

Here is how the Nassau Hall content looks in Reality Composer (convenient, right!):
<img width="1130" alt="image" src="https://user-images.githubusercontent.com/9939758/166334159-b99e56aa-c050-4999-9b14-361b4d709915.png">


### Adding New Locations

Want to get involved? Clone or contribute to this project. Then follow directions below for adding new locations.

To keep the code clean + not overwhelming, here is detailed process for adding new locations (esp for those with no coding background):
1. Choose a location + get a set camelcase name for it (we love dev!), for example if we choose Prospect House we would choose *prospectHouse*
2. Create a new reality composer file (called a scene) in the 'reality composer files' folder, following naming convention it would be called *SOC409-prospectHouse.rc*
3. Create the AR experience. Then export as USDZ, name it following naming convention: *SOC409-prospectHouse.usdz* and add it to the root folder.
4. Create a new html page called "prospectHouse.html", this will be the root web page when the qr code is called. Copy/paste code from a similar page, such as *nassauHall.html* and update everything form "nassauHall" to "prospectHouse"
5. Create a new html page called "prospectHouseHistory.html", this is the page that will be visible when the "Historical Context" button is clicked. Copy/paste in code from a similar page, such as *nassauHallHistory.html*, and use it as a template to update to the content specific to the location. Here some knowledge of html is required! Don't forget to change the "open in AR" link to the proper usdz file.
6. Push to git and deploy on Heroku as follows:
```
  git add .
  git commit -m "adding location Prospect House"
  git push heroku main
```
7. Should see success messages. Now this location is visible here: https://soc409-ar-history.herokuapp.com/prospectHouse.html (note: this link of course doesn't work right now as Prospect House is not implemented)
8. Using the above link, generate a QR code here for the poster: https://www.qr-code-generator.com



### Future Work

While writing this documentation we stumbled upon a link that says it just *might* be possible to display USDZ files on Android by converting them to glb (another 3d model file type supported by Android). Had little time or device to test this out, but a good direction to explore for making AR accessible on non-iOS devices. Update: tried it, I can't open glb files on mac but in an online viewer it comes out as non-textured blocks :(
https://cwervo.com/writing/quicklook-web/ 
