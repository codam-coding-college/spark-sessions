# Spark Session: ft_printf
*created: 06/09/2022*
*updated: 06/09/2022*

## Topics

1. Introduction
2. Flow charting
3. Variadic Arguments
4. Function Pointers
5. Putting it into practice

### Introduction

If this is you're first spark session you might wonder, what even is it?

A spark session simply serves as a matter of getting that initial 'spark' for
completing a project, you might be stuck on specific concept or task.

All the spark sessions are meant to teach beginning students how to tackle a larger 
project by splitting its contents in manageable pieces. Spark sessions are meant to be 
a class in how to finish its associated projects. They are meant to teach general design 
and structure concepts that can be applied to any software project.

The ultimate goal of spark sessions is to teach students on how to become self sufficient in completing projects.

### Flow charting

Working in a large scaleable project can be bit hard to keep track of what goes where and what happens 

In later projects you might struggle with the overall scale of a project and how the code is flowing throughout the different stages. You might find use of 

- As a group discuss:
    - What flow charts are and why they are used
    - The benefits they provide in larger projects
    - Come up with a flow chart for `ft_printf`
    - Use something like `draw.io`.

- Have all the groups share the flow charts
    - Moderator makes sure to correct any misconceptions during that discussion

### Variadic Arguments

- As a group discuss:
    - What they are and how they can be useful
    - Small exercise to get the grip on it, e.g: `ft_freen`

### Function Pointers

- Refer to the original sparksession for printf
- Distinguish data* with func*.
- Examplify how func* can be used just like any other ptr (Arrays, Jumptable, etc)

### Putting it into practice

- Write a function that prints strings where marked:
    - `ft_putsf("Hello %, my name is % !", world, jimmy);`
- Write a function that transforms a string with a given func:
    - `ft_transform(upper, "hello world!");` -> "HELLO WORLD!"
    - `ft_transform(lower, "HELLO WORLD!");` -> "hello world!"