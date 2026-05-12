'use strict';

// Registro del service worker para habilitar funcionalidades offline y mejorar el rendimiento de la aplicación.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then((registro) => {
      console.log('Service worker registrado:', registro);
    })
    .catch((error) => {
      console.error(`Registro fallido: ${error}`);
    });
}

// Manejo del DOM
const taskForm = document.querySelector('.task-form');
const taskInput = document.getElementById('taskInput');
const taskList = document.querySelector('.task-list');

// para agregar tareas
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const article = document.createElement('article');
        article.classList.add('task-item'); 

        article.innerHTML = `
            <button class="star-button" aria-label="Completar tarea">☆</button>
            <p>${taskText}</p>
            <button class="delete-button" aria-label="Eliminar tarea">×</button>
        `;

        taskList.appendChild(article);
        taskInput.value = '';
        taskInput.focus();
    }
});

// para completar y eliminar
taskList.addEventListener('click', (e) => {
    const item = e.target.closest('.task-item');
    if (!item) return;

    if (e.target.classList.contains('star-button')) {
        item.classList.toggle('completed');
        e.target.textContent = item.classList.contains('completed') ? '★' : '☆';
    }

    if (e.target.classList.contains('delete-button')) {
        item.remove();
    }
});