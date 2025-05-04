import { LitElement, html, css } from 'https://unpkg.com/lit@latest?module';

class JugadoresTabla extends LitElement {
  static properties = {
    players: { type: Array }
  };

  constructor() {
    super();
    this.players = [];
  }

  connectedCallback() {
    super.connectedCallback();
    fetch('/players')
      .then((res) => res.json())
      .then((data) => {
        this.players = data;
      });
  }
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="w3-card w3-white w3-padding w3-margin w3-center">
        <h3>Información de todos los jugadores</h3>
        <table class="w3-table-all w3-hoverable">
          <thead>
            <tr class="w3-light-grey">
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Pais</th>
            </tr>
          </thead>
          <tbody>
            ${this.players.map(
              (p) => html`
                <tr>
                  <td>${p.nombre}</td>
                  <td>${p.apellido}</td>
                  <td>${p.pais}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

class QuizTabla extends LitElement {
  static properties = {
    quiz: {type: Array}
  };

  constructor() {
    super();
    this.quiz = [];
  }

  connectedCallback() {
    super.connectedCallback();
    fetch('/average-grade')
      .then((res) => res.json())
      .then((data) => {
        this.quiz = data;
      });
  }
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="w3-card w3-white w3-padding w3-margin" style="overflow-x: auto;">
        <h3>Calificación promedio de cada Quiz</h3>
        <table class="w3-table-all w3-hoverable">
          <thead>
            <tr class="w3-light-grey">
              <th>ID de Curso</th>
              <th>ID de Lección</th>
              <th>ID de Examen</th>
              <th>Promedio</th>
            </tr>
          </thead>
          <tbody>
            ${this.quiz.map(
              (q) => html`
                <tr>
                  <td>${q.id_curso}</td>
                  <td>${q.id_leccion}</td>
                  <td>${q.id_examen}</td>
                  <td>${q.promedio}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

class PreguntasTabla extends LitElement {
  static properties = {
    preguntas: {type: Array}
  };

  constructor() {
    super();
    this.preguntas = [];
  }

  connectedCallback() {
    super.connectedCallback();
    fetch('/wrong-answered-questions-percentage')
      .then((res) => res.json())
      .then((data) => {
        this.preguntas = data;
      });
  }
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="w3-card w3-white w3-padding w3-margin" style="overflow-y: scroll; max-height="300px;">
        <h3>Porcentaje de preguntas contestadas incorrectamente</h3>
        <table class="w3-table-all w3-hoverable">
          <thead>
            <tr class="w3-light-grey">
              <th>ID de Pregunta</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            ${this.preguntas.map(
              (p) => html`
                <tr>
                  <td>${p.pregunta}</td>
                  <td>${p.porcentaje}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

class HoraInicioSesión extends LitElement {
  static properties = {
    hora: {type: Array}
  };

  constructor() {
    super();
    this.hora = [];
  }

  connectedCallback() {
    super.connectedCallback();
    fetch('/typical-login-time')
      .then((res) => res.json())
      .then((data) => {
        this.hora = data;
      });
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="w3-card w3-white w3-padding w3-margin">
        <h3>Hora típica de inicio de sesión de más común a menos común</h3>
        <table class="w3-table-all w3-hoverable">
          <thead>
            <tr class="w3-light-grey w3-center">
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            ${this.hora.map((p) => html`
              <tr class="w3-center">
                <td>${p.hora}</td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

}

class DistribucionGenero extends LitElement {
  static properties = {
    data: { type: Object }
  };

  constructor() {
    super();
    this.data = { labels: [], values: [] };
  }

  connectedCallback() {
    super.connectedCallback();
    fetch("/gender-distribution")
      .then(res => res.json())
      .then(data => {
        const labels = data.map(d => {
          if (d.genero === "H") return "Hombre";
          if (d.genero === "M") return "Mujer";
          return "Otro";
        });        
        const values = data.map(d => d.cantidad);
        this.data = { labels, values };
      });
  }

  updated(changedProperties) {
    if (changedProperties.has('data') && this.data.labels.length > 0) {
      this.drawChart();
    }
  }

  drawChart() {
    const canvas = this.renderRoot.querySelector("#graficaDistribucionGenero");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: this.data.labels,
        datasets: [{
          label: "Distribución de género de jugadores",
          data: this.data.values,
          backgroundColor: ['#4CAF50', '#2196F3', '#FF9800']
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="w3-card w3-white w3-padding w3-margin">
        <h3>Distribución de género por jugadores</h3>
        <canvas id="graficaDistribucionGenero" max-width="300" max-height="300"></canvas>
      </div>
    `;
  }
}

class DistribucionPaises extends LitElement {
  static properties = {
    data: {type: Object}
  }

  constructor() {
    super();
    this.data = { labels: [], values: [] };
  }

  connectedCallback() {
    super.connectedCallback();
    try {
      fetch("/country-distribution")
      .then(res => res.json())
      .then(data => {
        const labels = data.map(d => d.pais);
        const values = data.map(d => d.cantidad);
        this.data = { labels, values };
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('data') && this.data.labels.length > 0) {
      this.drawChart();
    }
  }

  drawChart() {
    const canvas = this.renderRoot.querySelector("#graficaDistribucionPaises");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: this.data.labels,
        datasets: [{
          label: "Distribución de países de jugadores",
          data: this.data.values
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="w3-card w3-white w3-padding w3-margin">
        <h3>Distribución de países de jugadores</h3>
        <canvas id="graficaDistribucionPaises" max-width="300" max-height="300"></canvas>
      </div>
    `;
  }
}

class TiempoPromedio extends LitElement {
  static properties = {
    tiempo: {type: Number}
  };

  constructor() {
    super();
    this.tiempo = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    fetch('/average-time')
      .then((res) => res.json())
      .then((data) => {
        this.tiempo = Math.round(data[0].tiempo_promedio);
      });
  }
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="w3-card w3-white w3-padding w3-margin">
        <h3>Tiempo promedio por sesión</h3>
        <h4>${this.tiempo} minutos</h4>
      </div>
    `;
  }
}

customElements.define('tabla-jugadores', JugadoresTabla);
customElements.define('tabla-quiz', QuizTabla);
customElements.define('tabla-preguntas', PreguntasTabla);
customElements.define('grafica-genero', DistribucionGenero);
customElements.define('hora-login', HoraInicioSesión);
customElements.define('grafica-paises', DistribucionPaises);
customElements.define('tiempo-promedio', TiempoPromedio);



