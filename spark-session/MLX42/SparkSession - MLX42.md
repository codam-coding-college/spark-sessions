<div align="center">
  <img width=420 src="https://user-images.githubusercontent.com/63303990/186118455-d1a2c167-702d-4be9-8e9e-08f3b7791902.png" alt="Logo">
</div>

### Project description:

This spark session focuses on the usage of MLX42. In the end you will have a good understanding of how to use the graphics library and how to work with pixel data in general.

## Topics

1. **Introduction**
2. **Setup**
3. **Creating a basic image**
6. **Bonus**

## Introduction

In case this is your first spark session then a warm welcome!
You might ask yourself: "What is a spark session? What is the point?"

A spark session simply serves as a way of achieving that initial 'spark' for solving on how to complete a certain project. It's goal is not a step-by-step guide / tutorial on how to complete the project.

They main goal is to teach you self sufficiency by showing and giving you tasks that encourage peer-to-peer interactions as well as being able to find the answer on your own.

To achieve this, a spark session composes of bite sized objectives that should help you give an easy footing into solving certain problems. Additionally, spark sessions are a hand-on approach with peer-to-peer in mind, for this spark session it's a bit different, this session 'tests' your ability to be self sufficient.

So you will mostly work on your own however you have your peers to help you out!

During the spark-session the moderator's purpose is to clear up confusion and work with the students in answering some but not all questions. They are much like C.A.T's in a way that they can help you with some technical stuff but not with actually solving the problems.

_NOTE: When given an exercise each person should do their own work, however work together to solve problems!_

---

&nbsp;
&nbsp;
&nbsp;

### Setup

During the Spark Session, we'll be writing a little program that can open a window, draw some pixels, and even move pixels!
Before we can do that, we need to set up the MLX42 library and link the compiled library with our source code.

All the necessary dependencies are already installed on the computers for MLX42 to work. So you won't need to
read the README file on github

Prepare a folder where you will create your project and simply it clone the library.
You git clone MLX42 [here.](https://github.com/codam-coding-college/MLX42).

Create a `makefile` that will compile your program and MLX42.
You need to read the provided documentation on either the Wikipage or in the `/docs` folder in the root of MLX42. There you will find all the necessary steps.

*Tip: Don't forget to define the header location. Hint: -I `<Directory>`*

### Our first steps

Now that our program compiles nicely for us to work with, our very first basic step is to create a window

If you did read the documentation thoroughly, our first step is to call `mlx_init`:
- Create a window 800 in width and 400 in height.
- For now at least, we don't want the window to be resizable.
	- If you do want to have to it resizable however later, you can look into `mlx_set_settings()`.
- What is the return type of this function, what exactly does it represent ?
- Compile and run your program!
	- What do you notice ?

_NOTE: READ the documentation! Don't just skim over it or brute force your way through the problem!_

If you noticed that the window didn't open or did appear for a very brief moment you will quickly realize
that the program exist instantly. However we need to keep the program running as long as the window is open.

- Look into the docs as what is missing to keep the window open.
- What do we do afterwards ? How do we exit properly ?

Once you have found the answer, or already did if you read the documenation as recommend, your window will now stay open! Hooray!

### Images & Pixels

So far our window is pretty empty and not much to look at, lets change that!
Using this graphics library is much like being a painter drawing on a canvas.

First research the following:
- What are `Images` & `Textures` ?
	- What are the differences between the two ?
	- How do we create either of them ?
	- What is the return type of either function that creates them ?

Now that you sort of understand what either are create an image that is the same size as the window

### Moar Pixels


### Hooks
