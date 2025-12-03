// --- Cambio de pestañas ---
document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelector(".tab.active").classList.remove("active");
        tab.classList.add("active");

        const target = tab.dataset.tab;

        document.querySelectorAll(".content").forEach(c => c.style.display = "none");
        document.getElementById("content-" + target).style.display = "block";
    });
});

// --- Validación de cédula dominicana ---
function validarCedula(ced) {
    if (!/^\d{11}$/.test(ced)) return false;

    let suma = 0;
    let multiplicador = [1,2,1,2,1,2,1,2,1,2];

    for (let i = 0; i < 10; i++) {
        let calc = ced[i] * multiplicador[i];
        if (calc > 9) calc = Math.floor(calc / 10) + (calc % 10);
        suma += calc;
    }

    let verificador = (10 - (suma % 10)) % 10;
    return verificador == ced[10];
}

// --- Eventos ---
const inputCedula = document.getElementById("cedula");
const btn = document.getElementById("btnValidar");

btn.addEventListener("click", procesar);
inputCedula.addEventListener("keypress", e => {
    if (e.key === "Enter") procesar();
});

function procesar() {
    const ced = inputCedula.value.trim();

    if (ced.length < 11) {
        actualizarEstado("Cédula incompleta", "Faltan dígitos.");
        return;
    }

    const ok = validarCedula(ced);
    actualizarResultado(ced, ok);
    guardarHistorial(ced, ok);
}

// --- Actualizar UI ---
function actualizarResultado(cedula, valido) {
    const badge = document.getElementById("badge");
    const icon = document.getElementById("badgeIcon");
    const label = document.getElementById("badgeLabel");
    const title = document.getElementById("resTitle");
    const msg = document.getElementById("resMsg");

    if (valido) {
        badge.classList.remove("invalid");
        badge.classList.add("valid");
        icon.textContent = "✔";
        label.textContent = "Válida";

        title.textContent = "Cédula válida";
        msg.textContent = "El número pasó la verificación.";
    } else {
        badge.classList.remove("valid");
        badge.classList.add("invalid");
        icon.textContent = "✖";
        label.textContent = "Inválida";

        title.textContent = "No válida";
        msg.textContent = "La cédula no cumple el dígito verificador.";
    }

    document.getElementById("idCard").style.display = "block";
    document.getElementById("idCed").textContent = cedula;
    document.getElementById("idEstado").textContent = valido ? "Activa (demo)" : "No válida";

    document.getElementById("lastCheck").textContent = new Date().toLocaleString();
}

// --- Historial ---
function guardarHistorial(ced, ok) {
    const body = document.getElementById("historyBody");

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${ced}</td>
        <td>${ok ? "Válida" : "Inválida"}</td>
        <td>${new Date().toLocaleString()}</td>
    `;

    body.prepend(tr);
}

function actualizarEstado(titulo, subtitulo) {
    document.getElementById("statusText").textContent = titulo;
    document.getElementById("statusSub").textContent = subtitulo;
}
