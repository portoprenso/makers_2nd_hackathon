let API = 'http://localhost:8000/products';

let wrapper = $('#wrapper')
let editedId = null;
let searchText = '';
let pageCount = 1;
let page = 1;
let id = null;
let editInpName = $('#editInpName');
let editInpPrice = $('#editInpPrice');
let editInpDescription = $('#editInpDescription');
let editInpImg = $('#editInpImg');
let buttonSave = $('.buttonSave')
let buttonCancel = $('.buttonCancel')


render()

$('.closeModal').on('click', function() {
    $('.modal-body').css('display', 'none')
})


$('.closeInfo').on('click', function() {
    $('.modal-info').css('display', 'none')
})


async function render() {
    wrapper.empty()
    let res = await fetch(`${API}?q=${searchText}&_page=${page}&_limit=8`);
    let data = await res.json();
    data.forEach(item => {
        wrapper.append(`
       
            <div id="${item.id}" class="card-product row bg-dark justify-content-center align-items-center d-flex col-12 col-sm-6 col-md-4">
                <h5 class="text-center">${item.name}</h5>
                <img class="col-6 modal-img img-fluid" src="${item.img}">
                <div class="col-12">
                <h5 class="text-center">Price: ${item.price}$</h5>
                </div>
                <button class="btn-delete col-3 rounded btn-primary">Delete</button>
                <button class="btn-edit col-3 rounded btn-primary">Edit</button>
            </div>
       
        `)
    });
}

$('body').on('click', '.btn-delete', function(event) {
    id = event.target.parentNode.id
    event.stopPropagation();
    fetch(`${API}/${id}`,{
        method: "DELETE",
    })
    .then(() => render())
})

$('body').on('click', '.btn-edit', function(event) {
    editedId = event.target.parentNode.id;
    event.stopPropagation();
    fetch(`${API}/${editedId}`).then((res) => res.json()).then((product) => {
        editInpName.val(product.name)
        editInpPrice.val(product.price)
        editInpDescription.val(product.description)
        editInpImg.val(product.img)
        $('.modal-body').css('display', 'block')
        $('.modal-name').text(product.name)
        $('.modal-price').text(`${product.price}$`)
        $('.modal-desc').text(product.description)
        $('.modal-img').attr('src', `${product.img}`) 
    })
    .then(() => render())
})




$('body').on('click', '.buttonSave', function(event) {
    $('.modal-body').css('display', 'none')
    event.stopPropagation();
    let obj = {
        name: editInpName.val(),
        price: editInpPrice.val(),
        description: editInpDescription.val(),
        img: editInpImg.val()
    }
    fetch(`${API}/${editedId}`, {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(obj)
    })
    .then(() => render())
})

$('.search-product-button').on('click', function() {
    searchText = $('.search-product-inp').val()
    render(`${API}/?q=${searchText}`)
})

$('.add-btn').on('click', function() {
    $('.modal-body').css('display', 'block')
    $('.modal-name').text('PRODUCT_NAME')
    $('.modal-price').text('PRICE_IN_DOLLARS')
    $('.modal-desc').text('DESCRIPTION')
})

$('.buttonAddNewProduct').on('click', function() {
    $('.modal-body').css('display', 'none')
    let obj = {
        name: editInpName.val(),
        price: editInpPrice.val(),
        description: editInpDescription.val(),
        img: editInpImg.val()
    }
    fetch(API, {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(obj)
    })
    .then(() => render())
})


$('body').on('click', '.add-btn-save', function(event) {
    event.stopPropagation();
    let objAdd = {
        name: editInpName.val(),
        price: editInpPrice.val(),
        description: editInpDescription.val(),
        img: editInpImg.val()
    }
    fetch(`${API}`, {
    method: "POST",
    headers: {
    'Content-type': 'application/json; charset=utf-8'
    },
    body: objAdd
})
})

$('body').on('click', '.card-product', function(event) {
    // $('.modal-info').css('display', 'block')
    editedId = event.target.id;
    event.stopPropagation();
    console.log(event.target);
    fetch(`${API}/${editedId}`).then((res) => res.json()).then((product) => {
        $('.modal-info').css('display', 'block')
        $('.modal-info-name').text(product.name)
        $('.modal-info-price').text(`${product.price}$`)
        $('.modal-info-desc').text(product.description)
        $('.modal-info-img').attr('src', `${product.img}`) 
    })
})
