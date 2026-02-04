document.getElementById('vendedorForm').addEventListener('submit', function(e){
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const sala = document.getElementById('sala').value;
    const tempo = document.getElementById('tempo').value;
    const categorias = Array.from(document.getElementById('categorias').selectedOptions).map(opt => opt.value);
    const estrela = document.querySelector('input[name="estrela"]:checked')?.value || 0;
    const foto = document.getElementById('foto').files[0];

    if(!foto) {
        alert('Por favor, selecione uma foto do vendedor.');
        return;
    }

    // Aqui você pode enviar os dados para o banco ou localStorage
    console.log({
        nome,
        sala,
        tempo,
        categorias,
        estrela,
        foto
    });

    alert(`Vendedor ${nome} cadastrado com sucesso!`);
    this.reset();
});
