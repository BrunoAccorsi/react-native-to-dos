import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';



export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks([...tasks, task]);
  }

  function handleToggleTaskDone(id: number) {
   const newTasksList = tasks.map(task => ({...task}));

   const taskFound = newTasksList.find(task => task.id === id);

   if (!taskFound) {
    return;
   }
   taskFound.done = !taskFound.done;

   setTasks(newTasksList);
  }

  function handleRemoveTask(id: number) {
    const newTaskList = tasks.filter(task => task.id !== id);
    setTasks(newTaskList);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})