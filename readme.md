# MS-MVC
Microservicio basico para gateway y api final

## Inicializacion
> Clone el repositorio, borre la carpeta .git

> inicie su propio repositorio

#### Instalacion 
````
npm i
````
Si hay paquetes deprecados 
````
npm update -S
````

#### Iniciar modo dev
````
npm run dev
````

#### Variables de entorno
Para trabajar con variables de entorno solo basta crear un archivo **.env** en la raiz del proyecto con un contenido similar a este: 
````
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASS=mipassword
MYSQL_DB=nombre_de_db
````
y luego usar en el codigo como 
````
process.env.MYSQL_HOST
````
## Estructura
### Carpeta config 
##### api.js
En este archivo se creara la estructura de endpoints pertenecientes a los microservicios a los que se conectara nuestra api.
La estructura es:
```JSON
nombreMS: {
	server: process.env.MS_URL || 'http://localhost:8001',
	nombreAccion: {
			method: 'POST', //GET, POST, PUT, DELETE
			url: '/user'
		},
	nombreAccion2: {
		method:'GET', //GET, POST, PUT, DELETE
		url: '/status'
	},
	server: process.env.MS2_URL || 'http://localhost:8002',
	nombreOtra: {
			method: 'GET', //GET, POST, PUT, DELETE
			url: '/datos'
		},
}
```
#### app.js
Espacio para variables generales.
#### database.js
Espacion para configuracion de bases de datos.
#### string.js
Usado para generalizar string de respuestas.

### Carpeta Controllers
Reservado para controladores.

> Controlador de ejemplo

````javascript
'use strict'

const _ = require('lodash');
const Response = require('../service/response');
const P = require('bluebird');
const m = require('../models/exampleModel');
// const Con = require('../service/connector');

/**
 * 
 * @param {int} id_account 
 * @param {string} cloud_id 
 */
function controllerExampleFunction(req, res) {
	return P.bind(this)
		.then(() => {
			 return m.example2();
		})	
		.then(result => {
			// return Con.get("https://api.fungenerators.com/facts/random", null)
			//  	.then(result => {
			//  		console.log(result);
			// 		return result;
			//  	})
			//  	.catch(err => err);

			return m.modelExampleFunction()
				.then(results => [result, results])
				.catch(err => err);
		})
		.spread((a, b) => {
			return [a, b, m.example3(req.params.id)];
			
		})
		.spread((a, b, c) =>  new Response(res, [a,b,c], "").success())
		.catch(error =>  new Response(res, null, error).error()
	);
}

module.exports = {
	controllerExampleFunction
}
````
### Carpeta models 

> Modelo de ejemplo

````javascript
'use strict'

const _ = require('lodash');
const Model = require('../core/Model');
const P = require('bluebird');

/**
 * 
 */
class ExampleModel extends Model {

	modelExampleFunction() {
		return this.db.getAll("datos");
	}

	example2()  {
		return this.db.getById(2, "datos");
	}

	async example3(id) {
		let connection = await this.db.getConnection();

		return new P((resolve, reject) => {

			connection.beginTransaction(function (err) {
					if (err) {
						connection.release();
						return reject(err);
					}

					connection.query(`SELECT nombre, apellido FROM datos where id = ${id} `, function (error, results) {

						if (error) {
							return connection.rollback(function () {
								connection.release();
								return reject(error);
							});
						}

						connection.query(`INSERT INTO prueba (dato, id_dato) VALUES ('${results[0].nombre} ${results[0].apellido}', ${id})`, function (error, results) {
							if (error) {
								return connection.rollback(function () {
									connection.release();
									return reject(error);
								})
							}

							connection.commit(function (error) {
								if (error) {
									return connection.rollback(function () {
										return reject(error);
									});
								}

								connection.release();

								return resolve(true);
							});
						});
					});
				});
			})
	}

	example4(datos) {
		return this.db.putOne("datos", datos);
	}

	example4(id) {
		return this.db.deleteOne("datos", id);
	}

}

module.exports = new ExampleModel
````
### Carpeta core
Reservado.
### Carpeta routes
El archivo **api.routes.js** esta reservado para las rutas de nuestro endpoint. Usaremos express Router.
Composicion de una ruta

````
api.[VERBO HTTP]("ruta", [metodo de controlador]);
````
> Ruta de ejemplo

````javascript
'use strict';

const express = require('express');
const example = require('../controllers/exampleController');
const api = express.Router();

api.get('/example/:id', example.controllerExampleFunction);

module.exports = api
````
### Carpeta service
> Carpeta validate contiene archivos de validaciones para controladores

#### connector.js
Este archivo invoca axios para realizarlas llamadas http a otros microservicios.

#### database.js
Este archivo crea la conexion a la base de datos local. 
Metodos para usar

**table** es el nombre de la tabla
**fields** es una array de string con los nombres de los campos a devolver en la consulta.
**data** es un objeto representando a la tabla, {nombre_campo: valor}
**where** es un string con el where literal
````
> getAll(table, fields)
> getWhere(table, filds, where)
> getAllWhere(table, where)
> getAll(table)
> getOne(table)
> getSome(table, limit)
> getSomeWhere(table, where, limit)
> getById(table, id)
> putOne(table, data)
> setOne(table, data, where)
> deleteOne(tablem id) *
````
 * tener en cuenta que todas las tablas deben contener un campo status para su borrado logico *

 #### response.js
 La clase Response provee una respuesta generica para todas las apis, compuesta por
 ````JSON
 {status: bool, data: object, msg: string}
 ````
 El estado cambiara segun el metodo utilizado. Los permitodos son:
 ````
 > success() - retorna un 200
 > error() - retorna 500
 > notfound() - retorna 404
 > forbiden() - retorna 403
 ````
 
 