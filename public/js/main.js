const container = document.getElementById('eventos');

function getFiltroDaURL() {
  const path = window.location.pathname;
  const match = path.match(/\/eventos\/([^/]+)/);
  return match ? match[1] : null;
}

async function carregarEventos() {
  container.innerHTML = '<p>Carregando eventos...</p>';

  const filtro = getFiltroDaURL(); // cidade ou "reveillon"
  const url = filtro ? `/events?cidade=${filtro}` : '/events';

  try {
    const res = await fetch(url);
    const eventos = await res.json();

    if (!eventos.length) {
      container.innerHTML = '<p>Nenhum evento encontrado.</p>';
      return;
    }

    container.innerHTML = '';

    eventos.forEach(evento => {
      const link = document.createElement('a');
      link.href = `/evento/${evento.id}`;
      link.classList.add('card-link');

      const card = document.createElement('div');
      card.classList.add('card');

      const img = document.createElement('img');
      img.src = evento.imagem_url;
      img.alt = evento.nome;

      const content = document.createElement('div');
      content.classList.add('card-content');
      content.innerHTML = `
        <h3>${evento.nome}</h3>
        <p><strong>Data:</strong> ${new Date(evento.data).toLocaleDateString('pt-BR')}</p>
        <p><strong>Local:</strong> ${evento.local}</p>
        <p><strong>Cidade:</strong> ${evento.cidade}</p>
      `;

      card.appendChild(img);
      card.appendChild(content);
      link.appendChild(card);
      container.appendChild(link);
    });

  } catch (err) {
    container.innerHTML = `<p>Erro ao carregar eventos: ${err.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', carregarEventos);
