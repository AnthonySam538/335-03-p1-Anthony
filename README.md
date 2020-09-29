# Project 1: Cella Ant #x15
###### CPSC 335-03 Algorithm Engineering
###### Team Anthony: Anthony Sam (anthonysam538@csu.fullerton.edu)

## How to use the project
1. Extract 335-03-p1-Anthony.zip
2. Open the resulting 335-03-p1-Anthony folder and find the main.html file
3. Open the main.html file using an internet browser

## Introduction
This is a variant of Langton's Ant. This ant resides in a 41 × 41 grid and its movements are defined by the color of the tile it currently stands on. If the ant is standing on a black, yellow, or green tile, then the ant will turn 90 degrees counterclockwise, change the color of the tile to the next color, and then move 1 tile forward. If the ant is standing on a red or blue tile, then the ant will instead turn 90 degrees clockwise before incrementing the tile's color and moving 1 tile forward. Also, when the ant changes the color of the tile to the next color, the cycle is as follows: Black → Red → Yellow → Blue → Green → Black again. Initially, all tiles are black, and the ant is in the center of the grid, facing towards the top. Also, the ant will wrap around to the other side of the grid whenever necessary. And to clarify the name, note that x15 is in hexadecimal, and when converting 0x15 to binary, you get 10101, which is why the ant turns left on black, right on red, left on yellow, right on blue, and left on green.

## Contents
* ant.js - Contains the programming for the ant (Requires the stuff in p5.js to work)
* main.html - Synthesizes all of the files together (except README.md) into an html page
* p5.js - Contains a bunch of functions and such
* README.md - Detailed information about the project (You're reading this file right now)
* style.css - Supplemental visual details used by main.html

## Features
* You can click inside the grid to relocate the ant
* You can press a key on the keyboard to stop/start the ant
