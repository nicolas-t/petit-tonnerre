# Petit Tonnerre

Detects lightning strikes around you and beeps as the thunder approches :zap:

## Installation
`git clone https://github.com/nicolas-t/petit-tonnerre.git`  
`cd petit-tonnerre`  
`yarn install` 

## Options
you can list all options with `node petit-tonnerre.js --help`

`--latitude` : the latitude of your position  
`--longitude` : the longitude of your position  
`--radius` : the maximum distance (in meters) around your position a strike will be detected  
`--speed` : the speed of the sound (in meters per second)  

## Examples
__if you're in Hono Lulu:__   
`node petit-tonnerre.js --latitude=21.3069440 --longitude=-157.8583330`    

__with all options:__  
`node petit-tonnerre.js --latitude=21.3069440 --longitude=-157.8583330 --radius=8000 --speed=342`  

## Usage
run `node petit-tonnerre.js` from the `petit-tonnerre` folder.  
install it on a Raspberry Pi and plug a speaker.  


