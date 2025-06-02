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

let carrinho = [];

function adicionarOrcamento(selectId, categoria){
    const select = document.getElementById(selectId);
    const servicoSelecionado = select.options[select.selectedIndex].text;

    let tipoFrete = null;

    if (categoria === "Frete"){
        if(servicoSelecionado.toLowerCase().includes('longa')) tipoFrete = "Longa Distancia";
        else if(servicoSelecionado.toLowerCase().includes('valor')) tipoFrete = "Alto Valor";
        else if(servicoSelecionado.toLowerCase().includes('frágil') || servicoSelecionado.toLowerCase().includes('fragil')) tipoFrete = "Fragil";
    }

    const existe = carrinho.some(item => 
        item.categoria === categoria && item.servico === servicoSelecionado
    );
    if(existe){
        alert('Este serviço já foi adicionado ao carrinho.');
        return;
    }

    const item = {
        categoria: categoria,
        servico: servicoSelecionado,
        horas: 30,
        funcionarios: 1,
        tipoFrete: tipoFrete,
        quilometragem: categoria === "Frete" ? 100 : null,
        viagens: categoria === "Frete" ? 1 : null
    };
    carrinho.push(item);
    atualizarCarrinho();
}

function calcularPreco(horas, funcionarios, categoria, tipoFrete, quilometragem, viagens){
    if(categoria === "Frete"){
        const precoPorKm = tabelaPrecos.Frete[tipoFrete] || 8.20;
        return precoPorKm * quilometragem * viagens;
    }
    const valorHora = tabelaPrecos[categoria] || 6.90;
    return((horas * valorHora) * 4) * funcionarios;
}

function atualizarCarrinho(){
    const itensDiv = document.getElementById('itenscarrinho');
    const checkout = document.getElementById('checkoutbtn');
    const limpar = document.getElementById('btnlimpar');
    itensDiv.innerHTML = '';

    if(carrinho.length === 0){
        itensDiv.innerHTML = '<p>Nenhum produto selecionado</p>';
        checkout.style.display = 'none';
        limpar.style.display = 'none';
        return;
    }

    carrinho.forEach((item, index) => {
        const preco = calcularPreco(
            item.horas, 
            item.funcionarios, 
            item.categoria, 
            item.tipoFrete, 
            item.quilometragem, 
            item.viagens
        );

        const div = document.createElement('div');
        div.className = 'itemcarrinho mb-3';

        if(item.categoria === "Frete"){
            div.innerHTML = `
                <div class="card p-2">
                    <h5>${item.categoria} - ${item.servico}</h5>
                    <p><strong>Tipo de Frete:</strong> ${item.tipoFrete}</p>
                    <label>Quilometragem:</label>
                    <input type="number" value="${item.quilometragem}" onchange="atualizarQuilometragem(${index}, this.value)" class="form-control mb-2">
                    <label>Viagens:</label>
                    <input type="number" value="${item.viagens}" min="1" onchange="atualizarViagens(${index}, this.value)" class="form-control mb-2">
                    <p><strong>Valor:</strong> R$ ${preco.toFixed(2)}</p>
                    <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">Remover</button>
                </div>
            `;
        }else{
            div.innerHTML = `
                <div class="card p-2">
                    <h5>${item.categoria} - ${item.servico}</h5>
                    <label for="horas-${index}">Horas Semanais:</label>
                    <select id="horas-${index}" class="form-select mb-2" onchange="atualizarHoras(${index}, this.value)">
                        ${gerarOpcoesHoras(item.horas)}
                    </select>
                    <label for="func-${index}">Funcionários:</label>
                    <select id="func-${index}" class="form-select mb-2"
                        onchange="atualizarFuncionarios(${index}, this.value)">
                        ${gerarOpcoesFuncionarios(item.funcionarios)}
                    </select>
                    <p><strong>Valor:</strong> R$ ${preco.toFixed(2)}</p>
                    <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">Remover</button>
                </div>
            `;
        }
        itensDiv.appendChild(div);
    });
    checkout.style.display = 'block';
    limpar.style.display = 'block';
    atualizarContadorCarrinho();
}

function gerarOpcoesHoras(selecionado){
    let opcoes = '';
    for(let i = 30; i <= 60; i += 5) {
        opcoes += `<option value="${i}" ${i === Number(selecionado) ? 'selected' : ''}>${i}h/semana</option>`;
    }
    return opcoes;
}

function gerarOpcoesFuncionarios(selecionado){
    let opcoes = '';
    for(let i = 1; i <= 10; i++){
        opcoes += `<option value="${i}" ${i === Number(selecionado) ? 'selected' : ''}>${i} funcionário${i > 1 ? 's' : ''}</option>`;
    }
    return opcoes;
}

function atualizarQuilometragem(index, valor){
    carrinho[index].quilometragem = parseFloat(valor);
    atualizarCarrinho();
}

function atualizarViagens(index, valor){
    carrinho[index].viagens = parseInt(valor);
    atualizarCarrinho();
}

function atualizarContadorCarrinho(){
    const contador = document.getElementById('contadoritens');
    contador.textContent = carrinho.length;
}

function atualizarHoras(index, valor){
    carrinho[index].horas = parseInt(valor);
    atualizarCarrinho();
}

function atualizarFuncionarios(index, valor){
    carrinho[index].funcionarios = parseInt(valor);
    atualizarCarrinho();
}

function removerItem(index){
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function checkoutCarrinho(){
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.location.href = 'cart.html';
}

function limparOrcamento(){
    if(confirm('Deseja realmente limpar seu orçamento?')) {
        carrinho = [];
        atualizarCarrinho();
    }
}