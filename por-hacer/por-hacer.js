const fs = require('fs');

let listadoPorHacer = [];

let guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err)

    });

}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;

}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();

        return true;
    } else {
        return false;
    }
}


const getListado = (descripcion) => {
    cargarDB();
    return listadoPorHacer;
}

const borrar = (descripcion) => {
    cargarDB();
    // let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    // if (index >= 0) {
    //     listadoPorHacer.splice(index, 1);
    //     guardarDB();

    //     return true;
    // } else {
    //     return false;
    // }

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }


}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}