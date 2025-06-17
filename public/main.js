const container = document.getElementById('eventos');

async function carregarEventos() {
  container.innerHTML = '<p>Carregando eventos...</p>';

  try {
    const res = await fetch('/events');
    const eventos = await res.json();

    if (eventos.length === 0) {
      container.innerHTML = '<p>Nenhum evento encontrado.</p>';
      return;
    }

    container.innerHTML = ''; // Limpa antes de mostrar novos
    eventos.forEach(ev => {
      const div = document.createElement('div');
      div.classList.add('evento');
      div.innerHTML = `
        <h2>${ev.title}</h2>
        <p>${ev.description}</p>
        <p><strong>Local:</strong> ${ev.location}</p>
        <p><strong>Início:</strong> ${new Date(ev.start_date).toLocaleString()}</p>
        <p><strong>Fim:</strong> ${new Date(ev.end_date).toLocaleString()}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = `<p>Erro ao carregar eventos: ${err.message}</p>`;
  }
}

// Carrega eventos ao abrir a página
document.addEventListener('DOMContentLoaded', carregarEventos);
