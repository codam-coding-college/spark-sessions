# Spark Session: libft

_created: 06/09/2022_
_updated: 06/09/2022_

Project description:

> This project is about coding a C library. It will contain a lot of general purpose functions your programs will rely upon

## Topics

1. Introduction
2. Information gathering
3. Makefiles
4. Importance of testing
5. Putting it into practice

## Introduction

In case this is your first spark session then a warm welcome!

To begin with, what is a spark session? What is the end goal?
A spark session simply serves as a way of achieving that 'spark' for solving on
how to complete a certain project. It's goal is not a step-by-step guide / tutorial
on how to complete the project.

They main goal is to teach you self sufficiency by showing and giving you tasks
that encourage peer-to-peer interactions as well as being able to find the answer
on your own.

To achieve this a spark sessions composes of bite sized objectives that should help
you give an easy footing into solving problems. Additionally Spark sessions are a hand-on
approach with peer-to-peer in mind, so you will form in groups of 2-3 to work together and solve the following problems.

During the spark-session moderators sole purpose is to clear up confusion and work with the students
in answering some but not all questions. They are much like C.A.T's in a way that they can
help you with some technical stuff but not with actually solving the problems.

### Information gathering

One of the most imporant things in programming is to find information, documentaiton answers in
a anyway shape or form to find out how to solve your problem. Another challenge is to formulate your problems into a meaningful query not just for `google` but also to your peers.

So to begin with this idea do the following with your peers:

- Research and solve the following with your peers:

  - Do whatever it takes to solve these questions, ask your peers, google, ...
  - Passing `0` to `malloc`
  - Passing `""` to `strdup`
  - What is the difference between a `Bus Error` and `Segmentation fault (core dumped)`
  - Is using `malloc` and not using `free` in `main()` a leak?
    - What about doing that outside of `main()`?
  - Is a `char*` an array or a reference to a `char`?
    - What about `char**`?

- Discuss with other groups upon your results
  - Did everyone come to the same conclusion?
  - Where did they find the answers to the questions?
    - Did they google it ?
    - Did they test it with actual code ?
    - Did they just assume the answer ?

With the end of the first chapter you should now have some understanding as to how to research your problems
and into how to come to a conclusion when facing difficult problems.

### Makefiles

Now that we have some way of figuring out our problems lets take our first dip into
doing some actual useful research. Makefiles!

Makefiles let us build our C Projects in a much more convenient way than manually typing
`gcc -Wextra -Werror -Wall ...` for each file. However their syntax and features are somewhat
tricky for beginners and numerous.

So in this chapter we will focus creating a Makefile that will take a `.c` file and compile it into a `42.out` executable.

1. Start with looking for a good source of documentation regarding makefiles:

   - What are `recipes`, `rules`, `targets`?
     - Should we create a `recipe` for each file or make a generic case for our `.c` files?
   - What is `.PHONY`? Why is it important / useful to have ?
   - What is relinking and how do we prevent it?
     - Why should we prevent this ?

2. Lets do something practical now:
   - Create the following files `main.c` & `ft_putstr.c`.
     - Simply write a small program that uses the `ft_putstr()` function in the respective file.
   - Create the necessary instructions in your `Makefile` to:
     - Compile each file into a `.o` file.
     - Links them into an executable.
   - Also implement the required `recipes`:
   - `all`: Compiles all the files.
   - `re`: Re-compiles the files.
   - `fclean`: Deletes all the `.o` files as well as the executable.
   - `clean`: Only delete all the `.o`.
   - Make sure it does not re-link when you use the `make` command.

### Importance of testing

- What is it that people are struggling with here ? Makefiles ? Malloc ?
- Testing their functions.

### Putting it into practice

- Building a mini-libft
  - Have a small list of easy functions to implement
  - Test cases
