const express = require("express");
const app = express();
app.use(express.json());

function validarCedula(cedula) {
    cedula = cedula.replace(/-/g, "").trim();
    if (cedula.length !== 11) return false;

    let suma = 0;
    const multiplicadores = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1];

    for (let i = 0; i < 11; i++) {
        let resultado = cedula[i] * multiplicadores[i];
        if (resultado >= 10) resultado = Math.floor(resultado / 10) + (resultado % 10);
        suma += resultado;
    }

    return suma % 10 === 0;
}

app.get("/validar/:cedula", (req, res) => {
    const cedula = req.params.cedula;
    const esValida = validarCedula(cedula);
    res.json({ cedula, valida: esValida });
});

app.listen(3000, () => {
    console.log("Servicio web ejecutándose en http://localhost:3000");
});
