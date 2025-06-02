let lastPosScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    let scrollCima = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollCima > lastPosScroll){
    navbar.style.top = "-80px";
    }else{
    navbar.style.top = "0";
    }

    lastPosScroll = scrollCima <= 0 ? 0 : scrollCima;
});

const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
console.log(carrinho)
div = document.getElementById('resumoCheckout');
let total = 0;
const selCartao = document.getElementById('pagcartao');
const selBoleto = document.getElementById('pagboleto');
let cartaoinput = document.getElementById('cartaonuminput');
let cartaovencinput = document.getElementById('cartaovencinput');
let cartaonome = document.getElementById('cartaonomeinput');
let cartaodig = document.getElementById('cartaodiginput');
let emailinput = document.getElementById('boletoemailinput');
const btnCartao = document.getElementById('confirmCartao');
const btnBoleto = document.getElementById('confirmBoleto');

const tabelaPrecos = {
    Limpeza: 6.90,
    Segurança: 12.00,
    Informática: 15.00,
    Alimentos: 8.50,
    Treinamento: 9.75,
    Frete: {
        "Longa Distancia": 8.20,
        "Alto Valor": 9.00,
        "Fragil": 8.50
    }
};

function calcularPreco(item){
    if(item.categoria === "Frete"){
        const precoPorKm = tabelaPrecos.Frete[item.tipoFrete] || 8.20;
        const km = Number(item.quilometragem) || 0;
        const viagens = Number(item.viagens) || 1;
        return precoPorKm * km * viagens;
    }
    const valorHora = tabelaPrecos[item.categoria] || 6.90;
    const horas = Number(item.horas) || 0;
    const funcionarios = Number(item.funcionarios) || 0;
    return (horas * valorHora * 4) * funcionarios;
}

if(carrinho.length === 0){
    div.innerHTML = '<p>Carrinho vazio.</p>';
} else {
    carrinho.forEach(item => {
        const preco = calcularPreco(item);
        total += preco;
        div.innerHTML += `
            <div class="item">
                <h3>${item.categoria} - ${item.servico}</h3>
                ${item.quilometragem ? `<p>Km: ${item.quilometragem}km</p>` : ''}
                ${item.viagens ? `<p>Viagens: ${item.viagens}</p>` : ''}
                ${item.categoria !== 'Frete' && item.horas ? `<p>Horas Semanais: ${item.horas}</p>` : ''}
                ${item.categoria !== 'Frete' && item.funcionarios ? `<p>Funcionários: ${item.funcionarios}</p>` : ''}
                <p><strong>Valor: R$ ${preco.toFixed(2)}</strong></p>
            </div>
        `;
    });
    div.innerHTML += `
        <hr>
        <div id="totalcheckout">
            <h3>Total: R$ ${total.toFixed(2)}</h3>
        </div>
    `;
}

function pagCartao(){
    btnBoleto.style.display = 'none';
    selBoleto.style.display = 'none';
    selCartao.style.display = 'block';
    btnCartao.style.display = 'inline-block';
}

cartaoinput.addEventListener('input', function(){
    let numcartao = this.value.replace(/\D/g, '');
    numcartao = numcartao.substring(0, 16);
    if(numcartao.length > 12){
        numcartao = numcartao.replace(/(\d{4})(\d{4})(\d{4})(\d{1,4})/, "$1 $2 $3 $4");
    } else if (numcartao.length > 8){
        numcartao = numcartao.replace(/(\d{4})(\d{4})(\d{1,4})/, "$1 $2 $3");
    } else if (numcartao.length > 4){
        numcartao = numcartao.replace(/(\d{4})(\d{1,4})/, "$1 $2");
    }
    this.value = numcartao;
});

cartaovencinput.addEventListener('input', function(){
    let numvenc = this.value.replace(/\D/g, '');
    numvenc = numvenc.substring(0, 4);
    if(numvenc.length > 2){
        numvenc = numvenc.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }
    this.value = numvenc;
});

function pagBoleto(){
    btnCartao.style.display = 'none';
    selCartao.style.display = 'none';
    selBoleto.style.display = 'block';
    btnBoleto.style.display = 'inline-block';
}

function pagConfirmCartao(){
    const cartaovalidate = document.getElementById('cartaonuminput').value.replace(/\D/g, '');
    const vencimentovalidate = document.getElementById('cartaovencinput').value.replace(/\D/g, '');
    if(cartaovalidate.length < 16){
        alert("Números do cartão incompletos.");
        return false;
    }
    if(vencimentovalidate.length < 4){
        alert("Número de vencimento incompleto.");
        return false;
    }
    if(!cartaonome.value){
        alert("Insira o nome do proprietário do cartão.");
        return false;
    }
    if(!cartaodig.value || cartaodig.value < 3){
        alert("Insira os dígitos de segurança.");
        return false;
    }
    alert('Pedido finalizado! Pagamento feito com sucesso!');
    localStorage.removeItem('carrinho');
    window.location.href = 'budget.html';

    return true;
}

function pagConfirmBoleto(){
    if(!emailinput.value){
        alert("Insira o E-Mail para envio.");
        return false;
    }   
    alert('Pedido finalizado! Boleto enviado por E-Mail!');
    localStorage.removeItem('carrinho');
    window.location.href = 'budget.html';

    return true;
}

function voltarPagina(){
    window.location.href = 'budget.html';
}

function modalPagamento(){
    const modalsim = new bootstrap.Modal(document.getElementById('modalpagamento'));
    modalsim.show();
}