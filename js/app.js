const ingresos = [
    new Ingreso('Salario',15000),
    new Ingreso('Renta de Auto',3000),
    new Ingreso('Inversiones',2500)
];

const egresos = [
    new Egreso('Despensa',3500),    
    new Egreso('Pago Casa',4000),    
    new Egreso('Gasolina',1500),    
];

function cargarApp () {
    cargaCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngresos = 0;
    for (let Ingreso of ingresos)
        totalIngresos += Ingreso.valor;
    return totalIngresos;  
};

let totalEgresos = () => {
    let totalEgresos = 0;
    for (let Egreso of egresos)
        totalEgresos += Egreso.valor;
    return totalEgresos;  
}

let cargaCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let egresosPorcentaje = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatCurrency(presupuesto);
    document.getElementById('porcentaje-egresos').innerHTML = formatPercent(egresosPorcentaje);
    document.getElementById('ingresos').innerHTML = formatCurrency(totalIngresos());
    document.getElementById('egresos').innerHTML = formatCurrency(totalEgresos());
}

const formatCurrency = (valor) => {
    return valor.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2});
}

const formatPercent = (valor) => {
    return valor.toLocaleString('en-US', {style: 'percent', minimumFractionDigits: 2});
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresosHTML(ingreso)
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresosHTML = (ingreso) => {
    let porcentaje = ingreso.valor / totalIngresos();
    let ingresosHTML = `
    <li class="elemento clean">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha">
                        <div class="elemento_valor">${formatCurrency(ingreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatPercent(porcentaje)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close" onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </li>
    `
    return ingresosHTML;
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresosHTML(egreso)
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresosHTML = (egreso) => {
    let porcentaje = egreso.valor / totalEgresos();
    let egresosHTML = `
    <li class="elemento clean">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha">
                        <div class="elemento_valor">${formatCurrency(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatPercent(porcentaje)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close" onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </li>
    `
    return egresosHTML;
}

const eliminarIngreso = (id) => {
    let eliminarIndice = ingresos.findIndex( (ingreso) => {ingreso.id === id});
    /*for (let ingreso of ingresos) {
        if (ingreso.id === id) {
            let eliminarIndice = ingreso;
        }
    }*/
    ingresos.splice(eliminarIndice, 1)
    cargaCabecero();
    cargarIngresos();
}

const eliminarEgreso = (id) => {
    let eliminarIndice = egresos.findIndex( (egreso) => {egreso.id === id});
    /*for (let egreso of egresos) {
        if (egreso.id === id) {
            let eliminarIndice = egreso;
        }
    }*/
    egresos.splice(eliminarIndice, 1)
    cargaCabecero();
    cargarEgresos();
}

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma ['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma ['valor'];
    if (descripcion.value != '' && valor.value !=='') {
        if (tipo.value === 'ingreso') {
            ingresos.push(new Ingreso(descripcion.value, parseInt(valor.value)));
            cargaCabecero();
            cargarIngresos();
        }else if (tipo.value === 'egreso') {
            egresos.push(new Egreso(descripcion.value, parseInt(valor.value)));
            cargaCabecero();
            cargarEgresos();
        }
    }
}