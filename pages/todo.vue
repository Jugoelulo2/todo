<template>
    <h1 class="text-4xl font-bold text-center">Hello World</h1>
  <div class="border p-4 mt-4 max-w-sm mx-auto">
      <h1 class="text-center text-2xl font-bold">Todo list</h1>
      <div class="flex flex-col md:flex-row space-x-2 items-center justify-between mt-4">
          <UInput v-model="newTodo.task" />
          <UButton @click="addTodo">Button</UButton>
      </div>
  
          <div class="p-4 shadow-md rounded-md mt-4 flex justify-between" v-for="(todo, index) in todoList" :key="index">
              <div class="flex justify-start items-center space-x-2">
                  <UCheckbox v-model="todo.completed" />
                  <p class="text-lg">{{ todo.task }}</p>
              </div>
              <UButton icon="i-heroicons-trash" color="error" variant="soft" @click="deleteTodo(index)">Delete</UButton>
          </div>
  </div>
    
   
  </template>
  
  <script setup>
  const newTodo = ref({
      task: '',
      completed: false,
  })
  
  const todoList = ref([])
  
  function addTodo() {
      todoList.value.push(newTodo.value)
      newTodo.value = {
          task: '',
          completed: false,
      }
  }
  
  function deleteTodo(index) {
      todoList.value.splice(index, 1)
  }
  
  </script>
  