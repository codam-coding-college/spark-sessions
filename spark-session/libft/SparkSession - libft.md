<div align="center">
  <img width=420 src="https://user-images.githubusercontent.com/63303990/186118455-d1a2c167-702d-4be9-8e9e-08f3b7791902.png" alt="Logo">
</div>

### Project description:

This project is about coding a C library. It will contain a lot of general purpose functions your programs will rely upon.

## Topics

1. **Introduction**
2. **Information gathering**
3. **Hitch hiker's guide to Makefiles**
4. **Importance of testing**
5. **Putting it into practice**
6. **Bonus**

## Introduction

In case this is your first spark session then a warm welcome!
You might ask yourself: "What is a spark session? What is the point?"

A spark session simply serves as a way of achieving that 'spark' for solving on how to complete a certain project. It's goal is not a step-by-step guide / tutorial on how to complete the project.

They main goal is to teach you self sufficiency by showing and giving you tasks that encourage peer-to-peer interactions as well as being able to find the answer on your own.

To achieve this a spark sessions composes of bite sized objectives that should help you give an easy footing into solving problems. Additionally Spark sessions are a hand-on approach with peer-to-peer in mind, so you will form in groups of 2-3 to work together and solve the following problems.

During the spark-session a moderators purpose is to clear up confusion and work with the students in answering some but not all questions. They are much like C.A.T's in a way that they can help you with some technical stuff but not with actually solving the problems.

_NOTE: If you have any questions at any stage, ask your peers or the session moderator!_

---

&nbsp;
&nbsp;
&nbsp;

### Information gathering

One of the most imporant things in programming is to find information, documentaiton answers in a anyway shape or form to find out how to solve your problem. Another challenge is to formulate your problems into a meaningful query not just for `google` but also to your peers.

So to begin with this idea do the following with your peers:

- Research and solve the following with your peers:
  - Passing `0` to `malloc`
  - Passing `""` to `strdup`
  - What is the difference between a `Bus Error` and `Segmentation fault (core dumped)`
  - Is using `malloc` and not using `free` in `main()` a leak? What about doing that outside of `main()`?
  - Is a `char*` an array or a reference to a `char`? What about `char**`?

- Discuss with other groups upon your results
  - Did everyone come to the same conclusion?
  - Where did they find the answers to the questions?
  - Did they google it ?
  - Did they test it with actual code ?
  - Did they just assume the answer ?

With the end of the first chapter you should now have some understanding as to how to research your problems and into how to come to a conclusion when facing difficult problems.

---

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

&nbsp;

2. Lets do something practical now:
   - Create the following files `main.c`, `ft_putstr.c`, `ft_lib.h`.
     - Simply write a small program that uses the `ft_putstr()` function in the respective file.
   - Use the header file to be able to use the `ft_putstr()` function in `main.c`

   - Create the necessary instructions in your `Makefile` to:
     - Compile each file into a `.o` file.
     - Make it so that all the `.o` files get linked together to maek an executable.
   - Also implement the required `recipes`:
     - `all`: Compiles all the files.
     - `re`: Re-compiles the files.
     - `fclean`: Deletes all the `.o` files as well as the executable.
     - `clean`: Only delete all the `.o` files.
   - Make sure it does not re-link when you use the `make` command.

---

### Importance of testing

Of course we should ensure that the code we write actually does what it is supposed to do.
For instance a `ft_putstr()` that results in a segfault when you use it doesn't sound like a thing
that should happen.

However with larger projects and many files, functions and all the likes working together it becomes
harder and harder to make sure that what we wrote actually works. Testing is therefor the cure to not
result in a heap of problems in the end.

You can go **really** deep in terms of testing all the way from automatic test checking
before commiting, to scheduled testing on **github** or on a remote server. Even to the method of
testing there are many angles. We encourage you to explore all the different possibilites, as the
more tests you do, the fewer bugs and issues you will have later. But is that always the case ?

1. As group discuss the following:
   - What types of tests exist, which ones suit best for ?
   - Should we test our functions as we write them ?
     - Does doing this actually benefit us ?
     - What about the amount of time spent coding vs testing ?
   - Do we do our tests only once we're done with our project?
   - How many tests should one employ for a given function ?
   - Should one overrely on a tester from github?

---

### Putting it into practice

Its time we combine everything we learned into a singular library, your very own `lib-minift`!

Your goal now is a mix of practical and research exercises, for you `lib-minift` you must research
the `libc` equivalent functions and implement their behaviour. Once you implemented those functions
you should test those functions.

This is library will just give you a glimpse into what you could do later for your actual `libft` project.
So we will not go crazy here and keep it simple. Later on you can look into how you can implement it differently.

1. Implement these functions, research with your peers on how they behave:
   - `memcpy`
   - `strdup`
   - `puts`
   - `memset`
   - `strlen`

2. Create test cases for each function:
   - For testing, simply write a function that runs your own version and prints out the difference with the `libc` equivalent.
   - Making it easy and convenient to execute these tests and the rule `make test` that compiles a `test.c` file.
     - Make sure to compile this file with your `lib-minift` library file.
     - This file should have a `main()` function that runs your test functions.
   - Implement as many test cases as you deem necessary.
   - If something doesn't match, fix it and run `make test` again!

---

### Bonus / Extra Work

We have reached the end of this spark-session! However if you have some more time to spend it would still
be nice to use the remaining time for something useful.

This is a relatively short section but the exercise below is optional:

1. Research what structs are and what their syntax is like.
2. Implement a `string` struct to use as an alternative to `char*`.
   - It should contain a `char*` and a `size_t` variable for storing the data and size of the string.
   - Create the following functions for:
     - Creating a new string.
     - Printing the string.
     - Deleting a string.
     - Updating the string to a new value.
   - Feel free to name these functions as you desire.
3. Add all of this to your mini-libft.

---
