// var ulElement = document.querySelector('div#app ul');
var  tbodyElement = document.querySelector('tbody');
var inputElement = document.querySelector('div#app input[name=todo]');
var buttonElement = document.querySelector('div#app button[name=add]');

var todos = JSON.parse(localStorage.getItem('todosList')) || [];

loadTodos = () => {
    // ulElement.innerHTML = '';
    tbodyElement.innerHTML = '';

    for (todo of todos)
        createTodo(todo);
}

createTodo = (todo) => {
    var key = todos.indexOf(todo);
    var trElement = createTrElement(key, todo);
    
    tbodyElement.appendChild(trElement);
    
    // var liElement = createLiElement(key, todo);
    // ulElement.appendChild(liElement);
}

createLiElement = (key, todo) => {
    var liElement = document.createElement('li');
    var liTextElement = document.createTextNode(todo + ' ');
    var linkElement = createLinkElement(key);

    liElement.setAttribute('class', 'list-group-item');
    
    liElement.appendChild(liTextElement);
    liElement.appendChild(linkElement);
    return liElement;
}

createTrElement = (key, todo) => {
    var trElement = document.createElement('tr');
    var thElement = createThElement(key);
    var tdElement = createTdElement(todo);
    var tdLinkElement = createTdElementWithLink(key);
    

    trElement.appendChild(thElement);
    trElement.appendChild(tdElement);
    trElement.appendChild(tdLinkElement);
    return trElement;
}

createThElement = (key) => {
    var thElement = document.createElement('th');
    var thTextElement = document.createTextNode(key);

    thElement.setAttribute('scope', 'row');
    thElement.appendChild(thTextElement);
    return thElement;
}

createTdElement = (todo) => {
    var tdElement = document.createElement('td');
    var tdTextElement = document.createTextNode(todo);

    tdElement.appendChild(tdTextElement);
    return tdElement;
}

createTdElementWithLink = (key) => {
    var tdElement = document.createElement('td');
    var linkElement = createLinkElement(key);

    tdElement.appendChild(linkElement);
    return tdElement;
}

createLinkElement = (key) =>  {
    var linkElement = document.createElement('a');
    var linkTextElement = document.createTextNode('Excluir');

    linkElement.setAttribute('href', '#');
    linkElement.setAttribute('onclick', `removeTodo(${key})`);

    linkElement.appendChild(linkTextElement);
    return linkElement;
}

addTodo = () => {
    var value = inputElement.value;
    if (!value) return;
    
    todos.push(value);
    inputElement.value = '';
    loadTodos();
    saveToStorage();
}

removeTodo = (position) => {
    todos.splice(position, 1);
    loadTodos();
    saveToStorage();
}

saveToStorage = () => {
    localStorage.setItem('todosList', JSON.stringify(todos));
}

loadTodos();
buttonElement.onclick = this.addTodo;