<div align="center">
  <img width=420 src="https://user-images.githubusercontent.com/63303990/186118455-d1a2c167-702d-4be9-8e9e-08f3b7791902.png" alt="Logo">
</div>

### Project description:

This project is pretty straightforward, you have to recode printf. You will learn what is and how to implement variadic functions. Once you validate it, you will reuse this function in your future projects.

## Topics

1. Introduction
2. Flow charting
3. Variadic Arguments
4. Function Pointers
5. Putting it into practice

## Introduction

In case this is your first spark session then a warm welcome!
You might ask yourself: "What is a spark session? What is the point?"

A spark session simply serves as a way of achieving that initial 'spark' for solving on how to complete a certain project. It's goal is not a step-by-step guide / tutorial on how to complete the project.

They main goal is to teach you self sufficiency by showing and giving you tasks that encourage peer-to-peer interactions as well as being able to find the answer on your own.

To achieve this, a spark session composes of bite sized objectives that should help you give an easy footing into solving certain problems. Additionally, spark sessions are a hand-on approach with peer-to-peer in mind, so you will form in groups of 2-3 to work together and solve the following problems.

During the spark-session the moderator's purpose is to clear up confusion and work with the students in answering some but not all questions. They are much like C.A.T's in a way that they can help you with some technical stuff but not with actually solving the problems.

_NOTE: When given an exercise each person should do their own work, however work together to solve problems!_

---

&nbsp;
&nbsp;
&nbsp;

### Flow charting

Though `ft_printf` is a relatively small project, you will see that later on in larger projects such as `webserv` it will be very handy to properly plan out the *flow* of your program. As in, the chain of events of your program.

As the projects grows in size it will be difficult to maintain an overall view as to what is happening in your program. However a common practice in computer science is to use a flow chart diagram to map out the possile paths of execution in your program.

With your peers complete the following:
- Discuss and design a flow chart for `ft_printf`.
	- You can use tools such as `draw.io` to do this chart.

<!-- TODO: More stuff -->
### Variadic Arguments

Variadic arguments can be quite handy for more dynamic functions, enabling you do quite a few flexible things.
However what can one do with them and how can we actually use these functions to our advantage.

Well guess what, youre about to find out! With your peers:
- Research and find the functions used to work with `variadic arguments`
	- How do we gain access to the variables passed to *va_args*
- What are the most important macros regarding the usage of variadic arguments.

Lets put this into practice with a small example:
- Start of simple with `ft_sum`:
	- It should be prototypes as follows: `ìnt ft_sum(int n, ...)`
	- It should provide the sum of the *n* provided arguments.

- Implement the function `ft_freen`.
	- Imagine we have a few allocated pointers, we don't want to call `free` for each pointer.
	- It should be prototypes as follows: `void ft_freen(int n, ...)`
	- It will free *n* amount of pointers provided via `...`.

- Finally, implement the function `ft_join`.
	- It should be prototypes as follows: `char* ft_join(int n, char* delim, ...)`
	- It will join *n* amount of strings together provided via `...`.
	- Each string should be separated with the provided delimiter, which is another string.
	- Rember to handle errors, in case anything goes wrong, return `NULL`.

### Function Pointers

Function pointers are an essential data type and a common concept beyond C as well.
Being able to pass a function to another function via an argument provides a lot of flexibility to modify the behaviour of the given function itself.

Research the following:
- What is the syntax of a function pointer ?
	- How can we use the `typedef` keyword to simplify this syntax ?
- How do they differ from pointers regarding data ?
	- Can we just treat them like pointers in general ?
	- What about arrays ?
- Look up what a `jump table` is and discuss its usefulness.

Time to practice! You know the drill, implement these functions to get a good understanding regarding them:
- Write a function that transforms a string with a given func:
	- `char* ft_transform(upper, "hello world!");` -> "HELLO WORLD!"
	- `char* ft_transform(lower, "HELLO WORLD!");` -> "hello world!"
	- It should return an allocated string, remember to handle errors accordingly!

- Write a function that prints strings where marked:
	- The function should print the % with their corresponding arument.
	- It should be prototypes as followed:
		- `void ft_putsf("Hello %, my name is % !", world, jimmy);`

