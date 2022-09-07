# Spark Session: ft_printf
*created: 06/09/2022*
*updated: 06/09/2022*

## Topics

1. Introduction
2. Flow charting
3. Variadic Arguments
4. Function Pointers
5. Putting it into practice

### Flow charting

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