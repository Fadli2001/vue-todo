# Todo List App

Simple Todo List sederhana menggunakan **Vue 3** dan **Tailwind CSS** sebagai framework cssnya. Project ini mendemonstrasikan fitur-fitur dasar seperti menambah, mengedit, dan menghapus todo, serta memfilternya berdasarkan status.

## Features

- Add, edit, and delete todos.
- Mark todos as completed.
- Toggle between viewing all, active, or completed todos.
- Clear all completed todos.
- Empty state illustration using SVG when no todos are present.
- Responsive UI powered by Tailwind CSS.

## Libraries and Tools

### 1. **Vue 3**
   - Vue.js is used for building the reactive UI.
   - The `ref` and `computed` properties are used to manage state and reactive values.
   - **Hash-based routing** is implemented for filtering todos (all, active, completed).

### 2. **Tailwind CSS**
   - **Tailwind CSS** is used to style the application.       

### 3. **SVG (Empty State Image)**
   - Terdapat image SVG ketika todo dari state kosong.
   - Untuk svg disimpan didalam Folder **`src/assets/images/`**   

## Project Structure

Saat ini, code masih  **terkandung dalam satu file** (`Todo.vue`), di mana function dan UI masih difile yang sama. Namun kedepannya kita pasti akan merefactor agar memisahkannya, contoh seperti membuat file khusus untuk service (misal, `todoService.js`).

```bash
src/
│
├── assets/
│   └── images/
│       └── empty.svg      # Empty state illustration
│
├── components/
│   └── Todo.vue           # Contains both the UI and service logic
│
├── App.vue
└── main.js
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
