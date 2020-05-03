//Select users type functio
$(document).ready(() => {
    $("input").val("")
    
    $('.clear-button').click(()=>{
        $("input").val("") 
    }) 

    $("#showUserMenu").click(() => {

        search('users');
        $("input").val("")

    });

    $("#showPartnerMenu").click(() => {

        search('partners');
        $("input").val("")

    });

});

//Switch function
const search = (Option) => {
    typeSearch = Option

    switch (typeSearch) {
        case 'users':
            $("#columnsUsers").show();
            $("#columnsPartner").hide();

            $("#tabUsers").addClass("is-active");
            $("#tabPartner").removeClass("is-active");


            console.log('tipo de buscar por usuarios...')

            break;

        case 'partners':

            $("#columnsUsers").hide();
            $("#columnsPartner").show();
            $("#columnsPartner").removeClass("is-hidden")

            $("#tabPartner").addClass("is-active");
            $("#tabUsers").removeClass("is-active");

            console.log('tipo de busca por parceiros...')

            break;

        default:

            break;
    }
}

//Search user function

$('#buttonFindUser').click(async () => {
    try {
        $("#buttonFindUser").addClass("is-loading");
       
        const userId = $('#inputUser').val(),
            server = 'http://localhost:3000/buscar/usuario/',
            response = await axios.get(`${server}${userId}`),
            data = response.data,
            content = data.content;

        const user = {
            name: content.nome,
            cpf: content.CPF,
            rg: content.RG,
            phone: content.telefone,
            addressType: content.endereco.tipo,
            streetName: content.endereco.nome,
            number: content.endereco.numero,
            town: content.endereco.bairro,
            city: content.endereco.cidade,
            state: content.endereco.Estado

        }

        const {
            name, cpf, rg, phone,
            addressType, streetName,
            number, town, city, state } = user

        //Create user table
        createUserAppend = () => {
            Name = $('<td></td>').text(name);
            Cpf = $('<td></td>').text(cpf);
            Rg = $('<td></td>').text(rg);
            Phone = $('<td></td>').text(phone);

            Address = $('<td></td>').text(`${addressType} ${streetName}, 
            nº ${number}, ${town}, ${city} - ${state}`);

            $('#tableUser').append(Name, Cpf, Rg, Phone)
            $('#addressUser').append(Address);
        }

        createUserAppend();

        setTimeout(() => {

            menu('disabled');


        }, 2000)


        //Switch menu on / off
        function menu(Option) {

            condition = Option

            switch (condition) {
                case 'disabled':
                    $("#searchBarUser").hide();
                    $("#colUser").removeClass("is-hidden");
                    $("#buttonFindUser").removeClass("is-loading");


                    break;

                case 'enabled':

                    search('users');

                    $("#searchBarUser").show();
                    $("#colUser").addClass("is-hidden");
                    $("#buttonFindUser").removeClass("is-loading");

                    $('#tableUser').empty();
                    $('#addressUser').empty();

                    break;

                default:
                    console.log('menu on!');

                    break;
            }

        }
        //Close table / destroy results
        $('#colUserClose').click(() => {
            menu('enabled')
        })

    }
    catch (err) {
        $("#buttonFindUser").removeClass("is-loading");
        $('#inputUser').addClass('is-danger');
        $('.errorCpf ').removeClass('is-invisible');
        $('.errorCpf').fadeIn();

        setTimeout(() => {
            $('#inputUser').removeClass('is-danger');
            $('.errorCpf').fadeOut();
        }, 2000)
    }

    $("#inputUser").val("") 

});

//Search Partner function
//85.020.553/0001-69

const x = [{ tipo: 'mercado', id: 10 }, { tipo: 'padaria', id: 20 }]

for (item of x) {
    Item = $('<option></option>').text(item.tipo)

    $('select').append(Item)
}

$('#buttonFindPartner').click(async () => {

    $("#buttonFindPartner").addClass("is-loading");

    const arr = []

    function findItem(type) {
        if (type.tipo === $('select :selected').val()) {
            console.log(type.id)

            arr.push(type.id)
        }

    }

    x.find(findItem)

    try {

        const partnerId = $("#inputPartner").val(),
            code = arr[0],
            server = 'http://localhost:3000/buscar/empresa',
            response = await axios.get(`${server}?tipo=${code}&cnpj=${partnerId}`);

        data = response.data,
            content = data.content;

        console.log(content)
        const partner = {
            name: content.nome,
            type: content.tipo.descricao,
            cnpj: content.cnpj,
            phone: content.telefone,
            email: content.email,
            addressType: content.endereco.tipo,
            streetName: content.endereco.nome,
            town: content.endereco.bairro,
            city: content.endereco.cidade,
            number: content.endereco.numero,
            state: content.endereco.Estado

        }

        const { name, type, cnpj, phone,
            email, addressType, streetName,
            number, town, city, state } = partner;

        //Create partner table
        createPartnerAppend = () => {
            Name = $('<td></td>').text(name);
            Type = $('<td></td>').text(type);
            Cnpj = $('<td></td>').text(cnpj);
            Phone = $('<td></td>').text(phone);
            Email = $('<td></td>').text(email);

            Address = $('<td></td>').text(`
            ${addressType} ${streetName}, 
            nº ${number}, ${town}, 
            ${city} - ${state}`);

            $('#tablePartner').append(Name, Type, Cnpj, Phone, Email);
            $('#addressPartner').append(Address);
        }

        createPartnerAppend();

        setTimeout(() => {

            menu('disabled');

        }, 2000)


        // Switch menu on/off
        function menu(option) {
            condition = option
            switch (condition) {
                case 'disabled':
                    $('#searchBarPartner').hide();
                    $('#colPartner').removeClass("is-hidden");
                    $('#buttonFindPartner').removeClass('is-loading');

                    break;

                case 'enabled':

                    //$('#inputPartner').val() = '';

                    search('partners');

                    $('#searchBarPartner').show();
                    $('#colPartner').addClass('is-hidden');
                    $('#buttonFindPartner').removeClass('is-loading');

                    $('#tablePartner').empty();
                    $('#addressPartner').empty();

                    $('.clear-button').click(function(){
                        $("#inputPartner").val("") 
                    }) 

                    arr.length = 0

                    break;

                default:
                    console.log('menu on!');

                    break;

            }
        }
        //Close table/ destroy results
        $('#colPartnerClose').click(() => {
            menu('enabled')
        })


    }
    catch (err) {

        $("#buttonFindPartner").removeClass("is-loading");
        $('#inputPartner').addClass('is-danger');
        $('#select').addClass('is-danger')
        $('.errorCnpj').removeClass('is-invisible');
        $('.errorCnpj').fadeIn();

        setTimeout(() => {
            $('#inputPartner').removeClass('is-danger');
            $('#select').removeClass('is-danger')
            $('.errorCnpj').fadeOut();
        }, 2000)

    }

    $("#inputPartner").val("") 
})


