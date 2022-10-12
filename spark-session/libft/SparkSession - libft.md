# Spark Session: libft
*created: 06/09/2022*
*updated: 06/09/2022*

Project description:
> This project is about coding a C library. It will contain a lot of general purpose functions your programs will rely upon

## Topics

1. Introduction
2. Information gathering
3. Makefiles
4. Importance of testing
5. Putting it into practice

## Introduction

If this is you're first spark session you might wonder, what even is it?

A spark session simply serves as a matter of getting that initial 'spark' for
completing a project, you might be stuck on specific concept or task.

All spark sessions are meant to teach beginning students on how to tackle a larger project by splitting its contents into manageable pieces. They are meant to be  a class in how to finish its associated projects aswell teach general design and structure concepts that can be applied to any software project.

To begin with, form a group of 2-3 people to work together on solving the following questions and problems.
Keep in mind if you are confused or need any clearing up about something you can ask the spark-session moderator at anytime.

### Information gathering and Makefiles

A common problem in programming is to find what you need in order to fix your issue or solve a task. It can be quite a challenge to formulate what you need into something that can be easily found. It takes time to correctly think like a computer would.

So, a key skill to have is formulate your problem in as much of a short and meaningful sentence as possible.
For example, is simply pasting the error message good enough to find an answer ?

To test this, find out the solution to the following questions together:
1. Research and figure out an answer to the following:
    - What is the behaviour of these functions, how do you use them, what if they fail?
        - `malloc`, `strdup`, `atoi`
    - Sometimes you might run into an error that is not straight forward, try to figure out what these errors mean:
        - `==40623==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x6088842420fb`
        - `Segmentation fault (core dumped)`
        - `Bus error`

2. Find another group and share your conclusion with them:
	- For example, `google` is a good start but how should you formulate your search queries?
        - Should you write your problem as a search directly ?
        - Should it be only the error message ?
	- What resources provide the best answer:
        - Will `Wikipedia` actually give you an answer ?
        - Do the `man` pages always help ?

Once you have concluded your research feel free to share it with everyone else!

### Makefiles

Now that we have an idea as to how to find the information we need. Lets figure out what Makefiles are.

Makefiles are a simple and light-weight build system that we can use to automate our compiling and linking process.
Meaning wo don't have to manually compile each file that want to use.

Lets test this by looking into creating a Makefile that compiles a single `.c` file.

1. Find a good resource into how makefiles work, use whatever gives you the best answer to figure out the following:
    - What are `recipes`, `rules`, `targets`
    - What the `.PHONY` is used for and why its important.
    - What is `relinking` and how can we prevent it ?

2. Simply create a `main.c` file and `Makefile`.
    - Create a makefile with the usual rules as described in the subject pdf.
    - Add a `recipe` that will compile your `main.c` into an executable called `test.out`


### Importance of testing

- What is it that people are struggling with here ? Makefiles ? Malloc ?
- Testing their functions.

### Putting it into practice

- Building a mini-libft
    - Have a small list of easy functions to implement
    - Test cases
