var tbodyElement = document.querySelector('tbody');
var users = [];

//#region Requisição com AJAX
myPromise = () => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://reqres.in/api/users?page=1');
        xhr.send(null);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200)
                    resolve(JSON.parse(xhr.responseText));
                else
                    reject('Erro na requisição');
            }
        }
    });
}

getUsersByAJAX = () => {
    myPromise()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        })
        .then(function () {
            // always executed
            console.log('Término da requisição AJAX');
        })
};
//#endregion

//#region Requisição com AXIOS
async function getUserByAxios() {
    try {
        // const response = await axios.get('http://api.github.com/users/robertohgm');
        const response = await axios.get('https://reqres.in/api/users?page=2');
        users = response.data.data;
        loadUsers();
    } catch (error) {
        console.error(error);
    }
};
//#endregion

loadUsers = () => {
    tbodyElement.innerHTML = '';

    for (user of users)
        createTableElements(user);
}

createTableElements = (user) => {
    let trElement = createTrElement(user);
    tbodyElement.appendChild(trElement);
}

createTrElement = (user) => {
    let imgSrc = "http://lorempixel.com/100/80";
    let trElement = document.createElement('tr');
    let thElement = createThElement(user.id);
    let tdElementFirstName = createTdElement(user.first_name);
    let tdElementLastName = createTdElement(user.last_name);
    let tdImgElement = createTdElementWithImg(imgSrc);

    trElement.appendChild(thElement);
    trElement.appendChild(tdElementFirstName);
    trElement.appendChild(tdElementLastName);
    trElement.appendChild(tdImgElement);
    return trElement;
}

createThElement = (id) => {
    let thElement = document.createElement('th');
    let thTextElement = document.createTextNode(id);

    thElement.setAttribute('scope', 'row');
    thElement.appendChild(thTextElement);
    return thElement;
}

createTdElement = (value) => {
    let tdElement = document.createElement('td');
    let tdTextElement = document.createTextNode(value);

    tdElement.appendChild(tdTextElement);
    return tdElement;
}

createTdElementWithImg = (imgSrc) => {
    let tdElement = document.createElement('td');
    let imgElement = document.createElement('img');

    imgElement.setAttribute('src', imgSrc);
    imgElement.setAttribute('alt', 'Avatar');
    imgElement.setAttribute('class', 'rounded-lg');

    tdElement.appendChild(imgElement);
    return tdElement;

}

getUserByAxios();