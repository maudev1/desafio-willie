// Função para selecionar o tipo de busca
$(document).ready(function () {

    $("#users-show").click(function () {
        $("#jobs-auth").hide();
        $("#users-auth").show();
        $("#jobs-auth").addClass("is-hidden")

        $("#users-tab").addClass("is-active");
        $("#jobs-tab").removeClass("is-active");
    });

    $("#jobs-show").click(function () {
        $("#users-auth").hide();
        $("#jobs-auth").show();
        $("#jobs-auth").removeClass("is-hidden")

        $("#jobs-tab").addClass("is-active");
        $("#users-tab").removeClass("is-active");
    });
});


//constroller busca usuarios
function find(users) {
    //axios.get(`http://localhost:8080/${users}`)
    alert(users)
}

function exec(par, value ){
    par(value)

}

//Função para busca usuario
const dataUserInput = document.querySelector('#dataUser-input');
const dataJobsInput = document.querySelector('#dataJobs-input');

$("#users-buttonSearch").click(() => {

    dataUserInput.value = '';

    exec(find, 'common');

    $("#users-input").addClass("is-hidden");
    $("#users-results").removeClass("is-hidden");

});

//função para buscar parceiros de negócio

$("#jobs-buttonSearch").click(() => {

    dataJobsInput.value = '';
    
    exec(find, 'partner');

    $("#jobs-input").addClass("is-hidden");
    $("#jobs-results").removeClass("is-hidden");
});




