let lastPosScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    let scrollCima = window.pageYOffset || document.documentElement.scrollCima;
    
    if (scrollCima > lastPosScroll) {
    navbar.style.top = "-80px";
    } else {
    navbar.style.top = "0";
    }

    lastPosScroll = scrollCima <= 0 ? 0 : scrollCima;
});


const div = document.getElementById("mostrarcandidatura");
const p = document.getElementById("checagemdados");
const botaoLocais = document.getElementById('dropdownMenuButton');
let localEscolhido = ''

const locais = {
    ce: "CE",
    rj: "RJ",
    sp: "SP",
    pr: "PR",
    ba: "BA"
};

for(const id in locais){
    const item = document.getElementById(id);
    item.addEventListener('click', () => {
        localEscolhido = locais[id];
        botaoLocais.textContent = locais[id];
    })
}

let ddd = ''
document.getElementById("ce").addEventListener('click', () => ddd = " (85) ");
document.getElementById("rj").addEventListener('click', () => ddd = " (21) ");
document.getElementById("sp").addEventListener('click', () => ddd = " (11) ");
document.getElementById("pr").addEventListener('click', () => ddd = " (41) ");
document.getElementById("ba").addEventListener('click', () => ddd = " (71) ");

function limparFormulario() {
        document.getElementById('nomeinput').value = '';
        document.getElementById('cpfinput').value = '';
        document.getElementById('telefoneinput').value = '';
        document.getElementById('emailinput').value = '';
        document.getElementById('dropdownMenuButton').textContent = 'Local';
        localEscolhido = '';
}

let cpfinput = document.getElementById('cpfinput')
cpfinput.addEventListener('input', function(){
    let numcpf = this.value.replace(/\D/g, '');
    numcpf = numcpf.substring(0, 11);
    if(numcpf.length > 9){
        numcpf = numcpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (numcpf.length > 6) {
        numcpf = numcpf.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (numcpf.length > 3) {
        numcpf = numcpf.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }
    this.value = numcpf;
});

let telefoneinput = document.getElementById('telefoneinput');
telefoneinput.addEventListener('input', function(){
    let numtel = this.value.replace(/\D/g, '');
    numtel = numtel.substring(0,9);
    if(numtel.length > 5){
        numtel = numtel.replace(/(\d{5})(\d{1,4})/, "$1-$2");
    }
    this.value = numtel;
})

function validarCampos(){
    const cpfvalidate = document.getElementById('cpfinput').value.replace(/\D/g, '');
    const telefonevalidate = document.getElementById('telefoneinput').value.replace(/\D/g, '');
    if (cpfvalidate.length < 11){
        alert("CPF deve conter 11 números.");
        return false;
    }
    if (!ddd){
        alert("Selecione o local para definir o DDD.");
        return false;
    }
    if (telefonevalidate.length < 9){
        alert("Telefone deve conter 9 números.");
        return false;
    }
    return true;
}

function checarDados(){
    let nome = document.getElementById('nomeinput').value;
    let cpf = document.getElementById('cpfinput').value;
    let telefone = document.getElementById('telefoneinput').value;
    let email = document.getElementById('emailinput').value;

    if (!validarCampos()) {
        return;
    }
    if(!nome || !email){
        alert("Por favor, preencha todos os campos.");
        return;
    }
        div.style.display = 'block';
        const dados = `
        <h4>Dados Inseridos:</h4>
        <strong>Nome:</strong> ${nome}<br>
        <strong>CPF:</strong> ${cpf}<br>
        <strong>Telefone:</strong> ${'+55' + ddd + telefone}<br>
        <strong>E-Mail:</strong> ${email}
    `;
        p.innerHTML = dados;
}

function envioDadosSim() {
    const modalsim = new bootstrap.Modal(document.getElementById('modalsim'));
    modalsim.show();
    limparFormulario();
    document.getElementById('mostrarcandidatura').style.display = 'none';
}

function envioDadosNao() {
    const modalnao = new bootstrap.Modal(document.getElementById('modalnao'));
    modalnao.show();
    document.getElementById('mostrarcandidatura').style.display = 'none';
}