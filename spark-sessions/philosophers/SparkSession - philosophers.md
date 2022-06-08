# Topics
1. Threads.
2. Data Races.
3. Mutexes.
4. Deadlocks.

# Lets talk __Threads__
__Threads__ are a part of processes. Every processes is built of many parts, address space, memory space, PID, __"Thread of execution"__, enviorment, etc.. In 2001 the first Multicore processesors were introduced and the ability to add more Threads per processes came along. __processes__ do not __share memory space__ with other processes and have additional information associated with them like PID, name space, etc, but __Threads__ are more lightweight and share memory space with other Threads belonging to the same processes.

This is what I __mean__ by that a processes has a __Thread__.

<img width="547" alt="Screen Shot 2022-05-09 at 3 28 42 PM" src="https://user-images.githubusercontent.com/47741591/167420512-c56cd56a-757b-4177-be03-a990bf2b982a.png">

[after the session more on the same topic](https://csc-knu.github.io/sys-prog/books/Andrew%20S.%20Tanenbaum%20-%20Modern%20Operating%20Systems.pdf#page=134)
##### Can you answear these qestions?
1. What is a Thread?
2. What does it mean that every processes has a Thread?

***Program one*** uses `fork()` to creat a new ***process***. ***Processes*** ***do not shear memory space***.

```C
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main()
{
    int x;
    pid_t   pid;

    x = 25;
    pid = fork();
    if (pid == 0)//child process
    {
        printf("Child value %d\n", x++);
        printf("Child value %d\n", x++);
        printf("Child value %d\n", x++);
        printf("Child value %d\n", x++);
    }
    else
    {
        pid = wait(0);
	printf("Parent value %d\n", x);
    }
    return (0);
}
```

`gcc Program_one.c; ./a.out #what can we expect the x value to be in parent?` 

***Program two*** uses `pthread_create` to creat a new __Thread__. __Threads__ do not share __memory space__.

```C
#include <pthread.h>
#include <stdio.h>

void	*rutine(void *x)
{
	//2nd thread
	printf("new thread value %d\n", *(int*)x);
	*(int*)x += 1;
	printf("new thread value %d\n", *(int*)x);
	*(int*)x += 1;
	printf("new thread value %d\n", *(int*)x);
	*(int*)x += 1;
	printf("new thread value %d\n", *(int*)x);
	*(int*)x += 1;
	return (NULL);
}

int main()
{
	int		x;
	pthread_t	thread;

	x = 25;
	pthread_create(&thread, NULL, rutine, &x);
	//main thread
	pthread_join(thread, NULL);
	printf("Main thread value %d\n", x);
	return (0);
}
```
`gcc Program_two.c; ./a.out #what can we expect the x value to be in thread?` 
##### Can you answear these qestions?
1. What does it mean to share __memory space__ in sense of varibles?
2. Why is it useful to share __memory space__?

# One a practical note 🧶

#### Allowed functions:

```C
#include <stdio.h>
#include <pthread.h>

int	pthread_create(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine)(void *), void *arg);
int	pthread_join(pthread_t thread, void **value_ptr);
int	printf(const char  *restrict format, ...);
```

### `pthread_t`
`pthread_t` is a data type used to store Thread information. Maybe you have seen `pid_t` data type before? Then this is kind of simillar but in stead of process id which `pid_t` stores we store Thread info.

##### Can you answear these qestions:

1. What **data** type is pthread_t?
2. Why use pthread_t and not an __int__?

### `pthread_create`

##### Explination:
Just as it sounds `pthread_create` will make a new thread! Its super similar to `fork` but it makes a new proccess in stead of a thread.

##### Example:
```C
#include <pthread.h>

void	*rutine(void *ptr)
{
	(void)ptr;
	return (NULL);
}

int main()
{
	pthread_t	thread;

	pthread_create(&thread, NULL, rutine, 0);
	return (0);
}
```

##### Can you answear these qestions:

1. What __arguments__ does the `pthread_create` take?
2. What is `void *(*start_routine)(void *)?`
3. What is executed when `pthread_create` is called?
4. How would you pass __data__ to the `start_routine` function?
5. What is the `attr` argument?
6. Why use `pthread_create`?
7. Why not us*e* `fork` in st*e*ad of `pthread_create`?

### `pthread_join`

Explination:
Just as it sounds `pthread_join` will join a thread to the main thread!
[threads are a little bit like jarn](https://www.youtube.com/watch?v=uA8X5zNOGw8&t=240s)

##### Example:
```C
#include <pthread.h>

void	*rutine(void *ptr)
{
	(void)ptr;
	return (NULL);
}

int main()
{
	pthread_t	thread;

	pthread_create(&thread, NULL, rutine, 0);
	pthread_join(thread, NULL);
	return (0);
}
```
##### Can you answear these qestions:

1. What arguments does the function take?
2. What is `void **value_ptr` used for?
3. What hppens if you do not call `pthread_join` after `pthread_create`

## Goal 🎯
Create a new Thread that outputs this message!
```sh
$ ./ex01.out
Hi From the thread. You can call me philosopher 1
```

#### Learn how to create Threads in a loop. Create 20 Threads that will print the following.

## Can you code this? 🎯
#### Achieve this output

```ASCII
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
```

## Data Races/race conditions

[Whatch a video about data Races till 9:10](https://www.youtube.com/watch?v=FY9livorrJI)

##### Can you answear these qestions:

1. What are __data Races?__
2. What is a __critical section?__
3. If two or more __Threads__ are reading the value at the same time is that a __data race__?
4. Can the compiler help spot __data Races__?
5. Why are __data Races__ bad?

```C
// example code
#include <stdio.h>
#include <pthread.h>

void	rutine(void ptr)
{
	while (1)
	{
		if ((int )ptr > 1000)
			break ;
		(int )ptr += 1;
	}
	printf("Done\n");
	return (NULL);
}

int	main()
{
	pthread_t	thread;
	int			index;

	index = 0;
	//keep in mind that the programm "splits in 2" after this call
	pthread_create(&thread, NULL, rutine, &index);
	while (1)
	{
		if (index > 10000)
			break ;
		index++;
	}
	pthread_join(thread, NULL);
	return (0);
}
```
##### Can you answer thes qestions:
1. Do you see a *data race* in this code?
2. Where there a **critical section**?

## Let's talk Mutexes

The solution to __data Races__ can be __Mutexes__. When a __mutex__ is used it ensures that only one __Thread__ can access a piece of code at a time. Mutual exclusion.

#### Allowed functions
```C
#include <pthread.h>

int	pthread_create(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine)(void ), void *arg);
int	pthread_join(pthread_t thread, void **value_ptr);
int	printf(const char  *restrict format, ...);
int	pthread_mutex_lock(pthread_mutex_t mutex);
int	pthread_mutex_unlock(pthread_mutex_t mutex);
int	pthread_mutex_init(pthread_mutex_t mutex, const pthread_mutexattr_t attr);
int	pthread_mutex_destroy(pthread_mutex_t mutex);
```

For reference This is how the `pthread_mutex_t` __data__ type looks like.

```C
struct _opaque_pthread_mutex_t {
  long __sig;
  char __opaque[__PTHREAD_mutex_SIZE__];
};
```

1. What is the `pthread_mutex_t` __data__ type?

### `pthread_mutex_init`
##### Explination:
Just as the name suggest `pthread_mutex_init` will initialize a mutex.
##### Example:
```C
#include <pthread.h>

int main()
{
	pthread_mutex_t mutex;

	pthread_mutex_init(&mutex, NULL);
	return (0);
}
```
##### Can you answer these qestions?
1. What does this function do?
2. Why do we need to init a mutex?

### `pthread_mutex_destroy`
Explination:
Just as the name suggest `pthread_mutex_destroy` will destroy a mutex.
##### Example:

```C
#include <pthread.h>

int main()
{
	pthread_mutex_t mutex;

	pthread_mutex_destroy(&mutex);
	return (0);
}
```
##### Can you answer these qestions?

1. What does this function do?
2. Do you have to `free` the mutex?
3. Do you need to destroy inited mutexes?
4. Can a locked mutex be destroyed?

### `pthread_mutex_lock`
##### Explination:
Just as the name suggest `pthread_mutex_lock` will do the magic of fixing the data race.
##### Example:
```C
#include <pthread.h>

int main()
{
	pthread_mutex_t mutex;

	pthread_mutex_lock(&mutex);
	return (0);
}
```
##### Can you answer these qestions:

1. What does this function do?
2. Can you lock a mutex 2 times?
3. Why do we need to lock Mutexes?

### `pthread_mutex_unlock`
##### Explination:
Just as the name suggest `pthread_mutex_unlock`, will unlock a thread making the lock unlocked means that other threads will be able to lock it so that other threads will be able to prevent data races!
##### Example:
```C
#include <pthread.h>

int main()
{
	pthread_mutex_t mutex;

	pthread_mutex_unlock(&mutex);
	return (0);
}
```

##### Can you answer these qestions:

1. What does this function do?
2. Why do we need to unlock Mutexes?

## Can you code this? 🎯

Make a program that inits, locks, unlock and destroys a Mutex!

## Can you code this? 🎯

Prevent the data race in the example code.
```C
// example code
#include <stdio.h>
#include <pthread.h>

void	*rutine(void *ptr)
{
	while (1)
	{
		if (*(int *)ptr < 1000)
			break ;
		*(int *)ptr += 1;
	}
	printf("Done\n");
	return (NULL);
}

int	main()
{
	pthread_t	thread;
	int			index;

	index = 0;
	pthread_create(&thread, NULL, rutine, &index);
	while (1)
	{
		if (index < 10000)
			break;
		index++;
	}
	pthread_join(thread, NULL);
	return (0);
}
```

## Deadlocks
##### Explination:
Deadlock is a state in a programm where all the available mutexes have been locked, thou more and more threads are trying to lock more mutexes in result the programm hangs.

##### Can you answer these qestions?

1. What is a **Deadlock**?
2. When does a **Deadlock** occur?

## Can you code this? 🎯

Produce a program that has a Deadlock.

## Why not use threads?

It seems that having more threads would speed things up, but it's not always the case.
Bellow, 2 programs add up to INT_MAX / 100. One uses 20 **threads** and one uses just one. Which will be faster?

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

## Can you code this? 🎯
compile both programms and use `time ./a.out` to see which is faster

#### Allowed functions

```C
#include <pthread.h>
#include <stdio.h>

int	pthread_mutex_lock(pthread_mutex_t mutex);
int	pthread_mutex_unlock(pthread_mutex_t mutex);
int	pthread_mutex_init(pthread_mutex_t mutex, const pthread_mutexattr_t attr);
int	pthread_mutex_destroy(pthread_mutex_t mutex);
int	pthread_create(pthread_t thread, const pthread_attr_t attr, void (start_routine)(void ), void arg);
int	pthread_join(pthread_t thread, void value_ptr);
int	printf(const char  restrict format, ...);
```

## Can you code this? 🎯
creat 20 threads that will print the following
the order does not matter

```ASCII
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 2
Hi From the thread. You can call me philosopher 3
Hi From the thread. You can call me philosopher 4
Hi From the thread. You can call me philosopher 5
Hi From the thread. You can call me philosopher 6
Hi From the thread. You can call me philosopher 7
Hi From the thread. You can call me philosopher 8
Hi From the thread. You can call me philosopher 9
Hi From the thread. You can call me philosopher 10
Hi From the thread. You can call me philosopher 11
Hi From the thread. You can call me philosopher 12
Hi From the thread. You can call me philosopher 13
Hi From the thread. You can call me philosopher 14
Hi From the thread. You can call me philosopher 15
Hi From the thread. You can call me philosopher 16
Hi From the thread. You can call me philosopher 17
Hi From the thread. You can call me philosopher 18
Hi From the thread. You can call me philosopher 19
Hi From the thread. You can call me philosopher 20
Hi From the thread. You can call me philosopher 21
```

# Bonus

Make a program that will use 3 created threads to add up an int to 42. Threads can increment the int every .5 sec
once the value is 42 the program has to print "Got it!\n" and exit.

catch:
The threads do not know when the value is 42

What is a monitoring thread?

A monitoring thread is a concept used in the philosopher's project. a monitoring thread will keep track of the int variable. If the value is 42 let the threads know to finish and exit.


