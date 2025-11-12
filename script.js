// Variables globales
let currentOperation = '';

// Elementos del DOM
const modal = document.getElementById('calculator-modal');
const modalTitle = document.getElementById('modal-title');
const closeBtn = document.querySelector('.close-btn');
const calculateBtn = document.getElementById('calculate-btn');
const modalResult = document.getElementById('modal-result');
const operationCards = document.querySelectorAll('.operation-card');

// Configuración de operaciones
const operations = {
    suma: {
        title: 'Suma',
        calculate: (a, b) => a + b,
        label1: 'Primer número:',
        label2: 'Segundo número:'
    },
    resta: {
        title: 'Resta',
        calculate: (a, b) => a - b,
        label1: 'Minuendo:',
        label2: 'Sustraendo:'
    },
    multiplicacion: {
        title: 'Multiplicación',
        calculate: (a, b) => a * b,
        label1: 'Primer factor:',
        label2: 'Segundo factor:'
    },
    division: {
        title: 'División',
        calculate: (a, b) => {
            if (b === 0) throw new Error('No se puede dividir por cero');
            return a / b;
        },
        label1: 'Dividendo:',
        label2: 'Divisor:'
    },
    potencia: {
        title: 'Potencia',
        calculate: (a, b) => Math.pow(a, b),
        label1: 'Base:',
        label2: 'Exponente:'
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Abrir modal al hacer clic en una operación
    operationCards.forEach(card => {
        card.addEventListener('click', function() {
            const operation = this.getAttribute('data-operation');
            openCalculator(operation);
        });
    });

    // Cerrar modal
    closeBtn.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Calcular operación
    calculateBtn.addEventListener('click', calculate);
    
    // Permitir calcular con Enter
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && modal.style.display === 'block') {
            calculate();
        }
    });
});

// Funciones
function openCalculator(operation) {
    currentOperation = operation;
    const opConfig = operations[operation];
    
    // Configurar el modal
    modalTitle.textContent = opConfig.title;
    
    // Actualizar labels
    const labels = document.querySelectorAll('.input-group label');
    labels[0].textContent = opConfig.label1;
    labels[1].textContent = opConfig.label2;
    
    // Limpiar campos y resultado
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    modalResult.textContent = '';
    modalResult.classList.remove('show');
    
    // Mostrar modal
    modal.style.display = 'block';
    
    // Enfocar el primer input
    document.getElementById('num1').focus();
}

function closeModal() {
    modal.style.display = 'none';
    currentOperation = '';
}

function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    // Validar entrada
    if (isNaN(num1) || isNaN(num2)) {
        showResult('Por favor, ingresa números válidos en ambos campos', 'error');
        return;
    }
    
    try {
        const opConfig = operations[currentOperation];
        const result = opConfig.calculate(num1, num2);
        
        // Formatear resultado
        let formattedResult;
        if (Number.isInteger(result)) {
            formattedResult = result;
        } else {
            formattedResult = result.toFixed(4);
        }
        
        showResult(`El resultado es: ${formattedResult}`, 'success');
    } catch (error) {
        showResult(error.message, 'error');
    }
}

function showResult(message, type) {
    modalResult.textContent = message;
    modalResult.className = 'result show';
    
    if (type === 'error') {
        modalResult.style.backgroundColor = '#FFE6E6';
        modalResult.style.color = '#D8000C';
    } else {
        modalResult.style.backgroundColor = '#E6E6FA';
        modalResult.style.color = '#333';
    }
}

// Efectos visuales adicionales para las tarjetas
operationCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});