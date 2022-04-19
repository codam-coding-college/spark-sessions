##### Answer
> 1. Creating a thread goes 10–100 times faster than creating a process.
> 2. To shear address space
> 3. Performance
> 4. To work with blocking system calls
> 5. There is a blocking call

##### Answer
> One way of looking at a process is that it is a way to group related resources.  A process has an address space containing program text and data and other resources. These resources may include open files, child processes, pending alarms, signal handlers, accounting information, and more. By putting them together in the form of a process, they can be managed more easily. The other concept a process has is a ***thread*** of execution, usually shortened to just ***thread***.  The  ***thread***  has a  program counter that keeps track of which instruc-tion  to  execute  next.   It has  registers,  which  hold  its  current  working  variables.   It has  a  stack,  which  contains  the  execution  history, with  one  frame  for  each  proce-dure  called  but  not  yet  returned  from.  Although  a  ***thread***  must  execute  in  some process,  the  ***thread***  and  its  process  are  different  concepts  and  can  be  treated  sepa-rately.  Processes  are  used  to  group  resources  together;  ***threads***  are  the  entities scheduled for execution on the CPU.

##### Answear
<img width="1248" alt="Screen Shot 2022-04-09 at 10 07 36 PM" src="https://user-images.githubusercontent.com/47741591/162590014-ec9250c1-efb2-43e1-bd7f-9bee759e5ebf.png">

###### ANSWEAR

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

###### ANSWEAR

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

##### Answear 

```-fsanitize=thread```

### Answear

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

##### Answear

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
##### Answear

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
