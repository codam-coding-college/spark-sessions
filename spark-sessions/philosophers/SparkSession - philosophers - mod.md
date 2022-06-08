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

##### Answer
> One way of looking at a process is that it is a way to group related resources.  A process has an address space containing program text and data and other resources. These resources may include open files, child processes, pending alarms, signal handlers, accounting information, and more. By putting them together in the form of a process, they can be managed more easily. The other concept a process has is a ***thread*** of execution, usually shortened to just ***thread***.  The  ***thread***  has a  program counter that keeps track of which instruction to execute next.   It has registers,  which hold its current working variables. It has a  stack,  which contains the execution history, with one frame for each procedure called but not yet returned from. Although a  ***thread***  must execute in some process,  the  ***thread***  and its process are different concepts and can be treated separately.  Processes are used to group resources together;  ***threads***  are the entities scheduled for execution on the CPU. 
2. What does it mean that every processes has a Thread?

##### Answear
> The other concept a process has is a thread of execution, usually shortened to just thread. The thread has a program counter that keeps track of which instruction to execute next

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
##### Answer  

> Child value 25
> 
> Child value 26
> 
> Child value 27
> 
> Child value 28
> 
> Parent value 25

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
##### Answer
> new thread value 25
> 
> new thread value 26
> 
> new thread value 27
> 
> new thread value 28
> 
> Main thread value 25
##### Can you answear these qestions:
1. What does it mean to share __memory space__ in sense of varibles?
##### Answer
> It means that you have access to the varibles for the seprate threads if you wish
2. Why is it useful to share __memory space__?
##### Answer
> You don't need to use pipes or signals to communicate information.

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

1. What **data** type is `pthread_t`?
##### Answer
> It is used to store threads
2. Why use `pthread_t` and not an __int__?
##### Answer
> int cannot store all the info that a thread type needs.

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

##### Answer
> It take 3 Args. a thread mem address, a function pointer and a void mem address

2. What is void `*(*start_routine)(void *)`?

##### Answer
> A functions pointer which returns `void *` and takes `void *`

3. What is executed when `pthread_create` is called?

##### Answer
> start_routine 

4. How would you pass __data__ to the `start_routine` function?

##### Answer
> You would pass it as the 4rd arg to pthread_create

5. What is the `attr` argument?

##### Answer
> attr allows you to set characteristics of a thread

6. Why use `pthread_create`?

##### Answer
> To create a Thread with in a process

7. Why not use `fork` in stead of `pthread_create`?

##### Answer
> Because fork make a new process and pthread_create creates a new thread

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

##### Answer
> value of the thread, a memory address of type void pointer

2. What is `void **value_ptr` used for?

##### Answer
> to get the value returned from start_routine

3. What hppens if you do not call `pthread_join` after `pthread_create`

##### Answer
> the main process will exit and the create thread will exit

## Goal 🎯
Create a new Thread that outputs this message!
```sh
$ ./ex01.out
Hi From the thread. You can call me philosopher 1
```

#### Answer
```C
#include <stdio.h>
#include <pthread.h>

void	*routine(void *ptr)
{
	printf("Hi From thread. You can call me philosopher 0\n");
	return (NULL);
}

int	main()
{
	pthread_t	thread;

	pthread_create(&thread, NULL, routine, NULL);
	pthread_join(thread, NULL);
	return (0);
}
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
###### Answer
```C
#include <stdio.h>
#include <pthread.h>

#define MAX_PHILO 20

void	*rutine(void *ptr)
{
	printf("Hi From thread. You can call me philosopher 0\n");
	return (NULL);
}

int	main()
{
	pthread_t	thread[MAX_PHILO];

	for (int i = 0; i < MAX_PHILO; i++)
	{
		pthread_create(&thread[i], NULL, rutine, NULL);
	}
	for (int i = 0; i < MAX_PHILO; i++)
	{
		pthread_join(thread[i], NULL);
	}
	return (0);
}
```
## Data Races/race conditions

[Whatch a video about data Races till 9:10](https://www.youtube.com/watch?v=FY9livorrJI)

##### Can you answear these qestions:

1. What are __data Races?__

##### Answer
> A data race is when data values become unpredictable because two or more threads are writing to the same variable.

2. What is a __critical section?__

##### Answer
> That is the segment of code where the data race is happening

3. If two or more __Threads__ are reading the value at the same time is that a __data race__?

##### Answer
> No

4. Can the compiler help spot __data Races__?

##### Answer
> -g -fsanitize=thread

5. Why are __data Races__ bad?

#### Answer
> Because they lead to undefined behaviour 

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

#### Answer
```C
		if ((int )ptr > 1000)
			break ;
		(int )ptr += 1;
		if (index > 10000)
			break ;
		index++;
```
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

#### Answer
> It is a data type that you can lock.

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
#### Answer
> it make a Mutex lockable, allocates resources for the Mutex
```C
struct _opaque_pthread_mutex_t {
  long __sig; //it changes this value 
  char __opaque[__PTHREAD_mutex_SIZE__];
};
```

2. Why do we need to init a mutex?

#### Answer
> because it alows for the Mutex to be locked

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
> it makes a Mutex not lockable, deallocates resources for the Mutex
#### Answer

```C
struct _opaque_pthread_mutex_t {
  long __sig; //it changes this to 0
  char __opaque[__PTHREAD_mutex_SIZE__];
};
```

2. Do you have to `free` the mutex?
#### Answer
> No!

3. Do you need to destroy inited mutexes?
#### Answer
> Yes and no, it is considered a good practice and it helps to spot bugs. It does not cause memory leaks on our systems or take up resources, I believe./*it does however, make the program stop in the wrong way, its why we join and then destroy*

4. Can a locked mutex be destroyed?
#### Answer
> No and errno will be set to EBUSY

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

#### Answer
> It locks a *mutex**. No other **threads** can access this block of code.  

2. Can you lock a mutex 2 times?

#### Answer
> No all the other threads will be waiting to for the Mutex till it is unlocked.

3. Why do we need to lock Mutexes?
> Because we want to limit the segment of code accessible to only 1 thread hence stop data race.
/* we don't want to have a variable be used by two threads at the same time, due to a problem caused in the memory. when we have two thread and both use a variable and for example increase both of them. them instead of having done two increases, you isntead have done one increase"*/

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
#### Answer
> Unlocks a Mutex. All threads can now access the code block.

2. Why do we need to unlock Mutexes?
#### Answer
> Because we want to give access to all the threads to a segment of code

## Can you code this? 🎯
Make a program that inits, locks, unlock and destroys a Mutex!

#### Answer
```C
#include <pthread.h>

int	main()
{
	pthread_mutex_t	lock;

	pthread_mutex_init(&lock, NULL);
	pthread_mutex_lock(&lock);
	pthread_mutex_unlock(&lock);
	pthread_mutex_destroy(&lock);
	return (0);
}
```

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

#### Answer
```C
#include <stdio.h>
#include <pthread.h>

typedef struct	s_int_lock
{
	int		num;
	pthread_mutex_t	lock;
}				t_num_lock;

void	*rutine(void *ptr)
{

	t_num_lock	*thread_safe_num;

	thread_safe_num	= ptr;
	while (1)
	{
		pthread_mutex_lock(&thread_safe_num->lock);
		if (thread_safe_num->num > 1000)
		{
			pthread_mutex_unlock(&thread_safe_num->lock);
			break ;
		}
		thread_safe_num->num += 1;
		pthread_mutex_unlock(&thread_safe_num->lock);
	}
	printf("Done\n");
	return (NULL);
}

int	main()
{
	t_num_lock	thread_safe_num;
	pthread_t	thread;

	thread_safe_num.num = 0;
	pthread_mutex_init(&thread_safe_num.lock, NULL);
	pthread_create(&thread, NULL, rutine, &thread_safe_num);
	while (1)
	{
		pthread_mutex_lock(&thread_safe_num.lock);
		if (thread_safe_num.num > 10000)
		{
			pthread_mutex_unlock(&thread_safe_num.lock);
			break;
		}
		thread_safe_num.num++;
		pthread_mutex_unlock(&thread_safe_num.lock);
	}
	pthread_mutex_destroy(&thread_safe_num.lock);
	pthread_join(thread, NULL);
	return (0);
}
```


## Deadlocks
##### Explination:
Deadlock is a state in a programm where all the available mutexes have been locked, thou more and more threads are trying to lock more mutexes in result the programm hangs.

##### Can you answer these qestions?

1. What is a **Deadlock**?
#### Answer
> A Deadlock is when the programm hangs because it tries to lock a Mutex that is already lock and will never be unlocked.
2. When does a **Deadlock** occur?
#### Answer
> when u do not unlock a Mutex /* in principle, you have a wiating list of people waiting for the mutex to open. so the program will wait endlessly until > > the mutex is unlocked. it is not like it checks if its available, it waits until its available*/
## Goal:

## Can you code this? 🎯

Produce a program that has a Deadlock.

### Answer

```C
#include <pthread.h>

int	main()
{
	pthread_mutex_t	lock;

	pthread_mutex_init(&lock, NULL);
	pthread_mutex_lock(&lock);
	pthread_mutex_lock(&lock);
	pthread_mutex_unlock(&lock);
	pthread_mutex_destroy(&lock);
	return (0);
}
```

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

##### Answer

```C
#include <stdio.h>
#include <pthread.h>

typedef struct s_list
{
	int		index;
	pthread_mutex_t	lock;
}	t_list;

#define MAX_PHILO 20

void	*rutine(void *ptr)
{
	pthread_mutex_lock(&((t_list *)ptr)->lock);
	printf("Hi From thread. You can call me philosopher %d\n", (*(t_list *)ptr).index + 1);
	pthread_mutex_unlock(&((t_list *)ptr)->lock);
	return (NULL);
}

int	main()
{
	pthread_t	thread[MAX_PHILO];
	t_list		philosopher[MAX_PHILO];

	for (int i = 0; i < 20; i++)
	{
		pthread_mutex_init(&philosopher[i].lock, NULL);
		pthread_mutex_lock(&philosopher[i].lock);
		philosopher[i].index = i;
		pthread_mutex_unlock(&philosopher[i].lock);
		pthread_create(&thread[i], NULL, rutine, &philosopher[i]);
	}
	for (int i = 0; i < MAX_PHILO; i++)
	{
		pthread_join(thread[i], NULL);
		pthread_mutex_destroy(&philosopher[i].lock);
	}
	return (0);
}
```

# Bonus

Make a program that will use 3 created threads to add up an int to 42. Threads can increment the int every .5 sec
once the value is 42 the program has to print "Got it!\n" and exit.

catch:
The threads do not know when the value is 42

What is a monitoring thread?

A monitoring thread is a concept used in the philosopher's project. a monitoring thread will keep track of the int variable. If the value is 42 let the threads know to finish and exit.

```C
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>
#include <stdbool.h>

typedef struct	s_data
{
	bool			is_done;
	pthread_mutex_t	mutex_lock;
}				t_data;

void	*rutine(void *ptr)
{
	t_data	*data = ptr;

	while (1)
	{
		pthread_mutex_lock(&data->mutex_lock);
		if (data->is_done)
		{
			printf("I am dead\n");
			pthread_mutex_unlock(&data->mutex_lock);
			return (NULL);
		}
		pthread_mutex_unlock(&data->mutex_lock);
		sleep(1);
		printf("I am still alive\n");
	}
	return (NULL);
}

int	main()
{
	pthread_t		thread[4];
	t_data			data;


	data.is_done = false;
	pthread_mutex_init(&data.mutex_lock, NULL);
	for (int i = 0; i < 4; i++)
		pthread_create(&thread[i], NULL, rutine, &data);
	sleep(5);
	pthread_mutex_lock(&data.mutex_lock);
	data.is_done = true;
	pthread_mutex_unlock(&data.mutex_lock);
	for (int i = 0; i < 4; i++)
		pthread_join(thread[i], NULL);
	pthread_mutex_destroy(&data.mutex_lock);
	return (0);
}
```
# Aditional resources:
##### [*Theory on what are threads*](https://csc-knu.github.io/sys-prog/books/Andrew%20S.%20Tanenbaum%20-%20Modern%20Operating%20Systems.pdf#%5B%7B%22num%22%3A3419%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22XYZ%22%7D%2C16%2C753%2C1%5D)
##### [*Videos with practical examples*](https://www.youtube.com/watch?v=d9s_d28yJq0&list=PLfqABt5AS4FmuQf70psXrsMLEDQXNkLq2)
Look in to what a scheduler is!


#### Why use **threads**?

##### Answer
> 1. Creating a thread goes 10–100 times faster than creating a process.
> 2. To share address space
> 3. Performance
> 4. To work with blocking system calls
> 5. There is a blocking call
/* to put less strain on the process when you have to perform multiple calculations at the same time. imagine you make a game and for each frame you need to check 100 things. instead of making one process that go's through all of it. you make 100 threads that do them seperatly. because Threads share memory, its the perfect tool to speed up your program, its also perfect because you cna constantly check when things go wrong, instead of having to wait until the end.*/
