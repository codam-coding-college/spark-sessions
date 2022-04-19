##### [*Theory on what are threads*](https://csc-knu.github.io/sys-prog/books/Andrew%20S.%20Tanenbaum%20-%20Modern%20Operating%20Systems.pdf#%5B%7B%22num%22%3A3419%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22XYZ%22%7D%2C16%2C753%2C1%5D)
##### [*Videos with practical examples*](https://www.youtube.com/watch?v=d9s_d28yJq0&list=PLfqABt5AS4FmuQf70psXrsMLEDQXNkLq2)

# Topicks
1. Threads.
2. Data races.
3. Mutexes.
4. Deadlocks.

## Lets Talk Threads

What is a **thread?** A **thread** is **its own entity**. You can think of a *thread* as something like a **mini process** with a **shared memory space**.

**To understand what it means to shear memory space one must understand what it means not to shear it. - "Wisepe Rson"**

What will we see printed to **stdout?**

```C

#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int	main()
{
	int	x;
	pid_t	pid;

	x = 25;
	pid = fork();
	if (pid == 0)
	{
		printf("Child value %d\n", x++);
		sleep(1);
		printf("Child value %d\n", x++);
		sleep(1);
		printf("Child value %d\n", x++);
		sleep(1);
		printf("Child value %d\n", x++);
		sleep(1);
	}
	else
	{
		sleep(5);
		printf("Parent value %d\n", x);
		wait(0);
	}
	return (0);
}
```

Now that you know what it means not to **shear memory space**, if instead of 2 **processes** we would have 2 **threads** what will be printed?
```C
pseudo-code

int	main()
{
	int	x;

	x = 25;
	make_a_thread();
	thread
	{
		printf("new thread value %d\n", x++);
		sleep(1);
		printf("new thread value %d\n", x++);
		sleep(1);
		printf("new thread value %d\n", x++);
		sleep(1);
		printf("new thread value %d\n", x++);
		sleep(1);
	}
	main thread
	{
		sleep(5);
		printf("Main thread value %d\n", x);
	}
	return (0);
}
```

**Threads** take the advantage of *multi-core processors*. If your *processor* has *8 cors* then it can have 8 **threads** running at the *same time*. All 8 **threads** can do some action at any given time, like add a number. One **thread** might be accepting user input and another would be processing the input.

Why would anyone ever use ***threads***?

Now let's create our own **thread** and see what it does, and how it works.

Create a new **thread** that outputs this message!

#### Allowed functions:
```C
#include <stdio.h>
#include <pthread.h>

int	pthread_create(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine)(void *), void *arg);
int	pthread_join(pthread_t thread, void **value_ptr);
int	printf(const char * restrict format, ...);
```

### what is pthread_t
1. what **data** type is this?
### pthread_create
1. What arguments does the function take?
2. What is void \*(\*start_routine)(void \*)?
3. How would you pass **data** to the start_routine function?
4. What is the attr argument?
### pthread_join
1. What arguments does the function take?
2. What is void \*\*value_ptr used for?

```sh
# something like this
$ ./thread
Hi From thread. You can call me philosopher 0
```

Now let's try creating **threads** in a loop.

Create 20 **threads** that will print the following.

```ascii
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
```

## Data races

[Whatch a video about data races](https://www.youtube.com/watch?v=FY9livorrJI)

1. What are **data races?**
2. What is a **critical section?**
3. If 2 or more **threads** are reeding the value at the same time is that a **data race?**
4. Can the compiler help spot **data races**?

Do you see a *data race* in this code? Where is the critical section?

```C
//example code
#include <stdio.h>
#include <pthread.h>

void	*rutine(void *ptr)
{
	while (*(int *)ptr < 1000)
	{
		*(int *)ptr += 1;
	}
	printf("Done\n");
	return (NULL);
}

int	main()
{
	pthread_t	thread;
	int		index;

	index = 0;
	pthread_create(&thread, NULL, rutine, &index);
	while (index < 10000)
	{
		index++;
	}
	pthread_join(thread, NULL);
	return (0);
}
```

The solution to *data races* can be *mutexes*. When a *mutex* is used in code it ensures that only one **thread** can access that piece of code at a *time*.

Let's talk bout these functions
```C

#include <pthread.h>

int	pthread_mutex_init(pthread_mutex_t *mutex, const pthread_mutexattr_t *attr);
int	pthread_mutex_destroy(pthread_mutex_t *mutex);
int	pthread_mutex_lock(pthread_mutex_t *mutex);
int	pthread_mutex_unlock(pthread_mutex_t *mutex);
```
Change the pseudo to actual code
```C
int	main()
{
	//declear a mutex
	//init mutex
	//lock a mutex
	//unlock a mutex
	//destroy a mutex
	//do you need to free a mutex before you return ?
	return (0);
}

int	main()
{
	//declear a mutex
	//do you need to init a mutex before you lock it?
	//lock a mutex
	//unlock a mutex
	//destroy a mutex
	return (0);
}

int	main()
{
	//declear a mutex
	//init mutex
	//lock a mutex
	//unlock a mutex
	//do you need to destroy a mutex before returning?
	return (0);
}
```

Goal:
Prevent the data race in the example code.

## Deadlocks

What is a deadlock? When does a deadlock occur? Let's do some googling.

#### Goal:

Goal:
Produce a program that has a deadlock.

## Why not use threads?
It seams that having more threads would speed things up, but it's not always the case.
Bellow, 2 programs add up to INT_MAX / 100. One uses 20 threads and one uses just one. Which will be faster?

```C
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

typedef struct s_list
{
	int		*num;
	pthread_mutex_t	lock;
}	t_list;

#define MAX_PHILO 20

void	*rutine(void *ptr)
{
	t_list	*philo = ptr;

	while (1)
	{
		pthread_mutex_lock(&philo->lock);
		if (*philo->num > INT_MAX / 100)
		{
			pthread_mutex_unlock(&philo->lock);
			return (NULL);
		}
		*philo->num += 1;
		pthread_mutex_unlock(&philo->lock);
	}
	return (NULL);
}

int	main()
{
	pthread_t	thread[MAX_PHILO];
	t_list		philosopher[MAX_PHILO];
	int		*x = malloc(sizeof(int));

	*x = 0;
	for (int i = 0; i < 20; i++)
	{
		pthread_mutex_init(&philosopher[i].lock, NULL);
		pthread_mutex_lock(&philosopher[i].lock);
		philosopher[i].num = x;
		pthread_mutex_unlock(&philosopher[i].lock);
		pthread_create(&thread[i], NULL, rutine, &philosopher[i]);
	}
	for (int i = 0; i < MAX_PHILO; i++)
	{
		pthread_join(thread[i], NULL);
		pthread_mutex_destroy(&philosopher[i].lock);
	}
	printf("%d\n", *philosopher[0].num);
	free(philosopher[0].num);
	return (0);
}
```
```C
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

int	main()
{
	int	x;

	x = 0;
	while (x < INT_MAX / 100)
	{
		x++;
	}
	printf("%d\n", x);
}
```
Goal:
Creat 20 **threads** that will print the following
the order does not matter

```ascii
Hi From thread. You can call me philosopher 1
Hi From thread. You can call me philosopher 2
Hi From thread. You can call me philosopher 3
Hi From thread. You can call me philosopher 4
Hi From thread. You can call me philosopher 5
Hi From thread. You can call me philosopher 6
Hi From thread. You can call me philosopher 7
Hi From thread. You can call me philosopher 8
Hi From thread. You can call me philosopher 9
Hi From thread. You can call me philosopher 10
Hi From thread. You can call me philosopher 11
Hi From thread. You can call me philosopher 12
Hi From thread. You can call me philosopher 13
Hi From thread. You can call me philosopher 14
Hi From thread. You can call me philosopher 15
Hi From thread. You can call me philosopher 16
Hi From thread. You can call me philosopher 17
Hi From thread. You can call me philosopher 18
Hi From thread. You can call me philosopher 19
Hi From thread. You can call me philosopher 20
```

# Bonus

make a program that will use 3 created **threads** to add up an int to 42. **Threads** can increment the int every .5sec
once the value is 42 the program has to print "Got it!\n" and exit.

catch:
The **threads** do not know when the value is 42

What is a monitoring **thread**?

a monitoring **thread** is a concept used in the philosopher's project. a monitoring **thread** will keep track of the int variable. If the value is 42 let the **threads** know to finish and exit.
