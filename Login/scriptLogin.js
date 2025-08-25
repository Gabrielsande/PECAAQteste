document.addEventListener('DOMContentLoaded', () => {
  const abas = document.querySelectorAll('.tab');
  const containerAbas = document.querySelector('.tab-selector');

  const formLoginCliente = document.getElementById('form-cliente');
  const formLoginEmpresa = document.getElementById('form-empresa');
  const cadastroCliente = document.getElementById('cadastroForm');

  const linksCadastro = document.querySelectorAll('.link-to-cadastro');
  const linkLoginRodape = document.querySelector('#link-login');

  const cadastroTipo = document.getElementById('cadastroTipo');
  const cadastroCpfCnpjField = document.getElementById('cadastroCpfCnpjField');
  const cadastroCpfCnpjInput = document.getElementById('cadastroCpfCnpj');

  const redirectURL = 'http://127.0.0.1:5500/Produtos/index.html#Produtos/index.html';

  // Estado inicial
  if (abas.length) {
    abas.forEach(a => a.classList.remove('active'));
    abas[0].classList.add('active');
  }
  if (formLoginCliente) formLoginCliente.style.display = 'grid';
  if (formLoginEmpresa) formLoginEmpresa.style.display = 'none';
  if (cadastroCliente) cadastroCliente.style.display = 'none';

  function esconderAbas() {
    if (containerAbas) containerAbas.style.display = 'none';
    abas.forEach(a => a.classList.remove('active'));
  }

  function mostrarAbas() {
    if (containerAbas) containerAbas.style.display = 'flex';
    abas.forEach(a => a.classList.remove('active'));
    if (abas[0]) abas[0].classList.add('active');
  }

  function atualizarCampoCpfCnpj() {
    if (!cadastroTipo || !cadastroCpfCnpjField) return;
    const tipo = cadastroTipo.value;
    if (tipo === 'cliente') {
      cadastroCpfCnpjField.querySelector('label').textContent = 'CPF';
      cadastroCpfCnpjInput.placeholder = 'Somente números';
    } else {
      cadastroCpfCnpjField.querySelector('label').textContent = 'CNPJ';
      cadastroCpfCnpjInput.placeholder = '00.000.000/0000-00';
    }
  }

  if (cadastroTipo) {
    cadastroTipo.addEventListener('change', atualizarCampoCpfCnpj);
    atualizarCampoCpfCnpj();
  }

  abas.forEach(tab => {
    tab.addEventListener('click', () => {
      abas.forEach(a => a.classList.remove('active'));
      tab.classList.add('active');

      const label = tab.textContent.trim().toLowerCase();

      if (label.includes('cliente')) {
        if (formLoginCliente) formLoginCliente.style.display = 'grid';
        if (formLoginEmpresa) formLoginEmpresa.style.display = 'none';
        if (cadastroCliente) cadastroCliente.style.display = 'none';
      } else if (label.includes('empresa')) {
        if (formLoginEmpresa) formLoginEmpresa.style.display = 'grid';
        if (formLoginCliente) formLoginCliente.style.display = 'none';
        if (cadastroCliente) cadastroCliente.style.display = 'none';
      }
    });
  });

  linksCadastro.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      esconderAbas();
      if (formLoginCliente) formLoginCliente.style.display = 'none';
      if (formLoginEmpresa) formLoginEmpresa.style.display = 'none';
      if (cadastroCliente) cadastroCliente.style.display = 'grid';
    });
  });

  if (linkLoginRodape) {
    linkLoginRodape.addEventListener('click', e => {
      e.preventDefault();
      mostrarAbas();
      if (formLoginCliente) formLoginCliente.style.display = 'grid';
      if (formLoginEmpresa) formLoginEmpresa.style.display = 'none';
      if (cadastroCliente) cadastroCliente.style.display = 'none';
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateCNPJ(cnpj) {
    return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
  }

  function validateCPF(cpf) {
    return /^\d{11}$/.test(cpf);
  }

  function validateSenha(senha, senhaConfirm) {
    if (!senha || senha.length < 6) return false;
    if (senhaConfirm !== undefined) return senha === senhaConfirm;
    return true;
  }

  if (formLoginCliente) {
    formLoginCliente.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('email-cliente').value.trim();
      const senha = document.getElementById('senha-cliente').value.trim();

      if (!validateEmail(email)) {
        alert('Informe um e-mail válido para Cliente.');
        return;
      }
      if (!senha) {
        alert('Informe a senha para Cliente.');
        return;
      }

      // Se estiver correto, redireciona
      window.location.href = redirectURL;
    });
  }

  if (formLoginEmpresa) {
    formLoginEmpresa.addEventListener('submit', e => {
      e.preventDefault();
      const cnpj = document.getElementById('cnpj').value.trim();
      const senha = document.getElementById('senha-empresa').value.trim();

      if (!validateCNPJ(cnpj)) {
        alert('Informe um CNPJ válido no formato 00.000.000/0000-00.');
        return;
      }
      if (!senha) {
        alert('Informe a senha para Empresa.');
        return;
      }

      // Se estiver correto, redireciona
      window.location.href = redirectURL;
    });
  }

  if (cadastroCliente) {
    cadastroCliente.addEventListener('submit', e => {
      e.preventDefault();
      const tipo = cadastroTipo.value;
      const nome = document.getElementById('cadastroNome').value.trim();
      const email = document.getElementById('cadastroEmail').value.trim();
      const senha = document.getElementById('cadastroSenha').value.trim();
      const senha2 = document.getElementById('cadastroSenha2').value.trim();
      const cpfCnpj = cadastroCpfCnpjInput.value.trim();

      if (!nome) { alert('Informe o nome ou razão social.'); return; }
      if (!validateEmail(email)) { alert('Informe um e-mail válido.'); return; }
      if (!validateSenha(senha, senha2)) { alert('Senhas inválidas ou não conferem (mínimo 6 caracteres).'); return; }
      if (tipo === 'cliente' && !validateCPF(cpfCnpj)) { alert('Informe um CPF válido (11 números).'); return; }
      if (tipo === 'empresa' && !validateCNPJ(cpfCnpj)) { alert('Informe um CNPJ válido no formato 00.000.000/0000-00.'); return; }

      alert('Cadastro realizado com sucesso (simulado).');
      cadastroCliente.reset();
      mostrarAbas();
      if (formLoginCliente) formLoginCliente.style.display = 'grid';
      if (formLoginEmpresa) formLoginEmpresa.style.display = 'none';
      if (cadastroCliente) cadastroCliente.style.display = 'none';
      atualizarCampoCpfCnpj();
    });
  }
});
