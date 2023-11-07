import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Input, List, ListItem } from "@chakra-ui/react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [taskText, setTaskText] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [stateFilter, setStateFilter] = useState<"all" | "completed" | "active">("all");
  const [sortOrder, setSortOrder] = useState<"name" | "state">("name");

  useEffect(() => {
    const localStorageTodos = JSON.parse(localStorage.getItem("todos" || "[]"));
    setTodos(localStorageTodos);
  }, []);

  const addTask = () => {
    if (taskText.trim() === "") return;
    const newTask: Todo = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
    };
    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setTaskText("");
  };

  const handleRemoveTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleSortChange = (order: "name" | "state") => {
    setSortOrder(order);
  };

  const handleFilterChange = (filter: "all" | "completed" | "active") => {
    setStateFilter(filter);
  };

  const handleTaskCompletion = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleExport = () => {
    const exportData = JSON.stringify(todos);
    const blob = new Blob([exportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "todos.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const importedData = JSON.parse(event.target.result as string);
        setTodos(importedData);
        saveTodos(importedData);
      };
      reader.readAsText(file);
    }
  };

  const saveTodos = (updatedTodos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const filteredTodos = todos.filter((todo) => {
    return todo.text.includes(nameFilter) && (stateFilter === "all" || (stateFilter === "completed" && todo.completed) || (stateFilter === "active" && !todo.completed));
  });

  const sortedTodos = [...filteredTodos];
  if (sortOrder === "name") {
    sortedTodos.sort((a, b) => a.text.localeCompare(b.text));
  }

  return (
    <Box p={4}>
      <h1>Todo List</h1>
      <Flex align="center" mb={5}>
        <Button onClick={() => handleSortChange("name")} mr={2}>
          Сортировать по имени
        </Button>
        <Button onClick={() => handleSortChange("state")}>Сортировать по состоянию</Button>
      </Flex>
      <Flex align="center" mb={4}>
        <Input
          type="text"
          placeholder="Введите текст задачи"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <Button onClick={addTask}>Добавить задачу</Button>
      </Flex>
      <Flex align="center" mb={4}>
        <Input
          type="text"
          placeholder="Фильтр по имени"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </Flex>
      <List>
        {sortedTodos.map((todo) => (
          <ListItem
            key={todo.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #ccc"
          >
            <Flex align="center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleTaskCompletion(todo.id)}
              />
              <span>{todo.text}</span>
            </Flex>
            <Button onClick={() => handleRemoveTodo(todo.id)}>Удалить</Button>
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleExport}>
        <Button type="submit" mt={4}>
          Экспорт
        </Button>
      </form>
      <Input type="file" accept=".json" onChange={handleImport} mt={4} />
    </Box>
  );
};




