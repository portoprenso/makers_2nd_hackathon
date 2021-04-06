let API = 'http://localhost:8000/students';

let wrapper = $('#wrapper')
let editedId = null;
let allPages = null
let searchText = '';
let page = 1;
let id = null;
let editInpName = $('#editInpName');
let editInpSurname = $('#editInpSurname');
let editInpDescription = $('#editInpDescription');
let editInpImg = $('#editInpImg');
let editInpAlumni = $('#editInpAlumni');
let editInpPhone = $('#editInpPhone');
let editInpWeeklyKpi = $('#editInpWeeklyKpi');
let editInpMonthlyKpi = $('#editInpMonthlyKpi');
let buttonSave = $('.buttonSave')
let buttonCancel = $('.buttonCancel')

$('#less100').on('click', function() {
    $('.modal-ul').empty()
    $('.modal-kpi').css('display', 'block')
    fetch(API).then((res) => res.json()).then(data => {
        let something = data.filter(item => item.weeklyKpi < 100
        )
        something.forEach(item => {
            $('.modal-ul').append(`<li>
            ${item.name} ${item.surname}, Weekly KPI: ${item.weeklyKpi}
            </li>`)
        })
        console.log(something);
    })
})


$('#100-300').on('click', function() {
    $('.modal-ul').empty()
    $('.modal-kpi').css('display', 'block')
    fetch(API).then((res) => res.json()).then(data => {
        let something = data.filter(item => item.weeklyKpi >= 100 && item.weeklyKpi <300
        )
        something.forEach(item => {
            $('.modal-ul').append(`<li>
            ${item.name} ${item.surname}, Weekly KPI: ${item.weeklyKpi}
            </li>`)
        })
        console.log(something);
    })
})

$('#more300').on('click', function() {
    $('.modal-ul').empty()
    $('.modal-kpi').css('display', 'block')
    fetch(API).then((res) => res.json()).then(data => {
        let something = data.filter(item => item.weeklyKpi >= 300
        )
        something.forEach(item => {
            $('.modal-ul').append(`<li>
            ${item.name} ${item.surname}, Weekly KPI: ${item.weeklyKpi}
            </li>`)
        })
        console.log(something);
    })
})

$('.closeFilter').on('click', function(){
    $('.modal-kpi').css('display', 'none')
})

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
    // console.log(data);
    // console.log(API);
    // console.log(searchText);
    // console.log(page);
    data.forEach(item => {
        wrapper.append(`
            <div id="${item.id}" class="card-student row bg-dark justify-content-center align-items-center d-flex col-12 col-sm-6 col-md-4">
                <h5 class="text-center">${item.name} ${item.surname}</h5>
                <img class="col-6 modal-img img-fluid" src="${item.img}">
                <div class="col-12">
                </div>
                <button class="btn-delete col-3 rounded btn-primary">Delete</button>
                <button class="btn-edit col-3 rounded btn-primary">Edit</button>
                </div>
                
                `)
            });
        }
        // <h5 class="text-center">Surname: ${item.surname}$</h5>
        
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
    fetch(`${API}/${editedId}`).then((res) => res.json()).then((student) => {
        editInpName.val(student.name)
        editInpSurname.val(student.surname)
        editInpDescription.val(student.description)
        editInpImg.val(student.img)
        editInpAlumni.val(student.alumni)
        editInpPhone.val(student.phone)
        editInpWeeklyKpi.val(student.weeklyKpi)
        editInpMonthlyKpi.val(student.monthlyKpi)
        $('.modal-body').css('display', 'block')
        $('.modal-info-name').text(student.name)
        $('.modal-info-surname').text(student.surname)
        $('.modal-info-desc').text(student.description)
        $('.modal-img').attr('src', `${student.img}`) 
        $('.modal-info-alumni').text(student.alumni)
        $('.modal-info-phone').text(student.phone)
        $('.modal-info-weeklyKpi').text(student.weeklyKpi)
        $('.modal-info-monthlyKpi').text(student.monthlyKpi)
    })
    .then(() => {
        render()
    })
})




$('body').on('click', '.buttonSave', function(event) {
    $('.modal-body').css('display', 'none')
    event.stopPropagation();
    let obj = {
        name: editInpName.val(),
        surname: editInpSurname.val(),
        description: editInpDescription.val(),
        img: editInpImg.val(),
        alumni: editInpAlumni.val(),
        phone: editInpPhone.val(),
        weeklyKpi: editInpWeeklyKpi.val(),
        monthlyKpi: editInpMonthlyKpi.val()
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

$('.search-student-button').on('click', function() {
    searchText = $('.search-student-inp').val()
    render(`${API}/?q=${searchText}`)
})

$('.add-btn').on('click', function() {
    $('.modal-body').css('display', 'block')
    $('.modal-name').text('STUDENT_NAME')
    $('.modal-surname').text('STUDENT_SURNAME')
    $('.modal-desc').text('DESCRIPTION')
})

$('.buttonAddNewStudent').on('click', function() {
    $('.modal-body').css('display', 'none')
    let obj = {
        name: editInpName.val(),
        surname: editInpSurname.val(),
        description: editInpDescription.val(),
        img: editInpImg.val(),
        alumni: editInpAlumni.val(),
        phone: editInpPhone.val(),
        weeklyKpi: editInpWeeklyKpi.val(),
        monthlyKpi: editInpMonthlyKpi.val()
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
        surname: editInpSurname.val(),
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

$('body').on('click', '.modal-img', function(event) {
    editedId = event.target.parentNode.id;
    event.stopPropagation();
    console.log(event.target);
    fetch(`${API}/${editedId}`).then((res) => res.json()).then((student) => {
        $('.modal-info-name').text(`Name: ${student.name}`)
        $('.modal-info-surname').text(`Surname: ${student.surname}`)
        $('.modal-info-desc').text(`Work: ${student.description}`)
        $('.modal-info-img').attr('src', `${student.img}`)
        $('.modal-info-alumni').text(`Alumni: ${student.alumni}`)
        $('.modal-info-phone').text(`Phone: ${student.phone}`)
        $('.modal-info-weeklyKpi').text(`Weekly KPI: ${student.weeklyKpi}`)
        $('.modal-info-monthlyKpi').text(`Monthly KPI: ${student.monthlyKpi}`)
        
    }).then($('.modal-info').css('display', 'block'))
})




fetch(API).then((res) => res.json()).then((student) => {
    allPages = Math.ceil(student.length/8)
    for(page = 1; page<=allPages; page++) {
        $('.btnPageNext').before(`<button class="btnPage mx-1 btn-dark" id="btn${page}">${page}</button>`)
        // $('body').on('click', `#btn${[page]}`, function(event) {
        //     render(`${API}?q=${searchText}&_page=${page}&_limit=5`)
        // })
    }
    page = 1
})

$('body').on('click', '.btnPage', function(event) {
    page = event.target.firstChild.data
    render()
})

$('body').on('click', '.btnPagePrev', function(event) {
    if(page <= 1) {
        return
    }
    page--
    render()
})

$('body').on('click', '.btnPageNext', function(event) {
    if(page >= allPages) {
        return
    }
    page++
    render()
})



// parallax effect
// ____________________________________________________________________
let imageLeft = document.querySelector(".left"),
    imageRight = document.querySelector(".right");

new simpleParallax(imageLeft, {
    orientation: "left",
});
new simpleParallax(imageRight, {
    orientation: "right",
});
// ____________________________________________________________________

