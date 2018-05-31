const argv = require('./config/yargs').argv;
const colors = require('colors');

const porHacer = require('./por-hacer/por-hacer')

let comando = argv._[0];

switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();

        if (listado.length === 0) {
            console.log('No se han encontrado archivos en el JSON'.grey);
        }
        let i = 1;
        for (let tarea of listado) {


            console.log(`=======TAREA${ i++ }=======`.green);
            console.log(tarea.descripcion);
            console.log(`Estado : ${tarea.completado}`);
            console.log('===================='.green);
        }

        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('Comando no reconocido');

}