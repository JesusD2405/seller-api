import { Request, Response, Router } from "express";
import fetch from "node-fetch";
import cripto from "js-sha256";
import moment from "moment-timezone";


import { ApiSeller } from '../../apis/seller/config';

class productEndPoints
{	
	public router: Router;

	constructor() 
	{
		this.router = Router();
		this.routes();
	}

	/*
	*  Función que crea la firma de solicitud a la api de Seller
 	*/

	private getHash(action: string): any
	{
	    var hash = cripto.sha256.hmac.create(ApiSeller.Instance.apiKey);
		hash.update(action);
		
	    return hash.hex(); 
	}

	/*
	*	Función que crea los parametros de la solicitud
	*/

	private setParams(action: string): string
	{
		const _function = new productEndPoints();

		const time = moment().format();

		const _params = 'Action='		+encodeURIComponent(action)
						+'&Format=JSON'
						+'&Timestamp='	+encodeURIComponent(time)
						+'&UserID='		+encodeURIComponent(ApiSeller.Instance.userId)
						+'&Version=1.0'

		const firm = _function.getHash(_params);

		const _paramsFinally =  '/?Action='		+encodeURIComponent(action)
								+'&Format=JSON'
								+'&Timestamp='	+encodeURIComponent(time)
								+'&UserID='		+encodeURIComponent(ApiSeller.Instance.userId)
								+'&Version=1.0'
								+'&Signature='	+firm;

		console.log(_paramsFinally);

		return _paramsFinally;
	}

	/*
	*	Función que obtiene todos o una gama de productos.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getproducts 
	*/

	public async getProducts(req: Request, res: Response): Promise<void>{

		const _function = new productEndPoints();
		const _params   = _function.setParams('GetProducts');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'GET', headers: _headers })
	    .then(res => 
	    	res.json()
	    )
    	.then(json => {

    			console.log(json)
    			res.status(200).send(json);
    		},
    		err => {
		      console.log('Error '+err)
		      res.status(500).send({data: err});
		    },	
    	);
		
	}

	/*
	*	Función que crea uno o varios productos nuevos.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/productcreate 
	*/

	public async postProducts(req: Request, res: Response): Promise<void>{

		const _function = new productEndPoints();
		const _params   = _function.setParams('ProductCreate');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'POST', body: req, headers: _headers })
	    .then(res => 
	    	res.json()
	    )
    	.then(json => {

    			console.log(json)
    			res.status(200).send(json);
    		},
    		err => {
		      console.log('Error '+err)
		      res.status(500).send({data: err});
		    },	
    	);
		
	}

	/*
	*	Función que actualiza los atributos de uno o más productos existentes.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/productupdate 
	*/

	public async updateProducts(req: Request, res: Response): Promise<void>{

		const _function = new productEndPoints();
		const _params   = _function.setParams('ProductUpdate');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'POST', body: req, headers: _headers })
	    .then(res => 
	    	res.json()
	    )
    	.then(json => {

    			console.log(json)
    			res.status(200).send(json);
    		},
    		err => {
		      console.log('Error '+err)
		      res.status(500).send({data: err});
		    },	
    	);
		
	}

	/*
	*	Función que elimina uno o más productos.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/productremove
	*/

	public async deleteProducts(req: Request, res: Response): Promise<void>{

		const _function = new productEndPoints();
		const _params   = _function.setParams('ProductRemove');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'POST', body: req, headers: _headers })
	    .then(res => 
	    	res.json()
	    )
    	.then(json => {

    			console.log(json)
    			res.status(200).send(json);
    		},
    		err => {
		      console.log('Error '+err)
		      res.status(500).send({data: err});
		    },	
    	);
		
	}

	/*
	*	Función que guarda una o varias imagenes 
	*   La primera imagen pasada se convierte en la imagen por defecto del producto. 
	*   Al llamar a este punto final, todas las imágenes previamente asociadas se desasocian. 
	*   Hay un límite duro de como máximo 8 imágenes por producto. 
	*
	*   Leer más.. https://sellerapi.sellercenter.net/docs/image
	*/

	public async postImage(req: Request, res: Response): Promise<void>{

		const _function = new productEndPoints();
		const _params   = _function.setParams('Image');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'POST', body: req, headers: _headers })
	    .then(res => 
	    	res.json()
	    )
    	.then(json => {

    			console.log(json)
    			res.status(200).send(json);
    		},
    		err => {
		      console.log('Error '+err)
		      res.status(500).send({data: err});
		    },	
    	);
		
	}


	/*
	*	Función que obtiene todas las marcas de productos.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getbrands
	*/

	public async getBrands(req: Request, res: Response): Promise<void>{

		const _function = new productEndPoints();
		const _params   = _function.setParams('GetBrands');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'GET', headers: _headers })
	    .then(res => 
	    	res.json()
	    )
    	.then(json => {

    			console.log(json)
    			res.status(200).send(json);
    		},
    		err => {
		      console.log('Error '+err)
		      res.status(500).send({data: err});
		    },	
    	);
		
	}

	/*
	*	Función que obtiene la lista de todas las categorías de productos.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getcategorytree
	*/

	public async getCategoryTree(req: Request, res: Response): Promise<void>{

		const _function = new productEndPoints();
		const _params   = _function.setParams('GetCategoryTree');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'GET', headers: _headers })
	    .then(res => 
	    	res.json()
	    )
    	.then(json => {

    			console.log(json)
    			res.status(200).send(json);
    		},
    		err => {
		      console.log('Error '+err)
		      res.status(500).send({data: err});
		    },	
    	);
		
	}

	/*
	*	Función que obtiene una lista de atributos con opciones para una categoría dada. 
	*   También mostrará atributos para TaxClass y ShipmentType, con sus posibles valores listados como opciones.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getcategoryattributes
	*/

	public async getCategoryAttributes(req: Request, res: Response): Promise<void>{

		const _function = new productEndPoints();
		const _params   = _function.setParams('GetCategoryAttributes');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'GET', headers: _headers })
	    .then(res => 
	    	res.json()
	    )
    	.then(json => {

    			console.log(json)
    			res.status(200).send(json);
    		},
    		err => {
		      console.log('Error '+err)
		      res.status(500).send({data: err});
		    },	
    	);
		
	}

	/*
	*	
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getcategoriesbyattributeset
	*/

	public async getCategorySetAttributes(req: Request, res: Response): Promise<void>{

		const _function = new productEndPoints();
		const _params   = _function.setParams('GetCategoriesByAttributeSet');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'GET', headers: _headers })
	    .then(res => 
	    	res.json()
	    )
    	.then(json => {

    			console.log(json)
    			res.status(200).send(json);
    		},
    		err => {
		      console.log('Error '+err)
		      res.status(500).send({data: err});
		    },	
    	);
		
	}

	/*
	*	Función que obtiene atributos mapeados para marcas
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getbrandmappedattributes
	*/

	public async getBrandMappedAttributes(req: Request, res: Response): Promise<void>{

		const _function = new productEndPoints();
		const _params   = _function.setParams('GetBrandMappedAttributes');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'GET', headers: _headers })
	    .then(res => 
	    	res.json()
	    )
    	.then(json => {

    			console.log(json)
    			res.status(200).send(json);
    		},
    		err => {
		      console.log('Error '+err)
		      res.status(500).send({data: err});
		    },	
    	);
		
	}

	/*
	*	Función que obtiene las opciones de atributo asignadas a otras opciones de atributo
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getmappedattributeoptions
	*/

	public async getMappedAttribute(req: Request, res: Response): Promise<void>{

		const _function = new productEndPoints();
		const _params   = _function.setParams('GetMappedAttributeOptions');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'GET', headers: _headers })
	    .then(res => 
	    	res.json()
	    )
    	.then(json => {

    			console.log(json)
    			res.status(200).send(json);
    		},
    		err => {
		      console.log('Error '+err)
		      res.status(500).send({data: err});
		    },	
    	);
		
	}

	/*
	*	Función que contiene todas las rutas de punto final de productos
	*/

	public routes(){

		// Productos
		this.router.get('/products',    this.getProducts);
		this.router.post('/products',   this.postProducts);
		this.router.put('/products',    this.updateProducts);
		this.router.delete('/products', this.deleteProducts);

		// Imágenes
		this.router.post('/image', this.postImage);

		// Marcas
		this.router.get('/brands', 		 this.getBrands);
		this.router.get('/brandsMapped', this.getBrandMappedAttributes);

		// Mapas
		this.router.get('/mapped', this.getMappedAttribute);

		// Categorias
		this.router.get('/categoryTree', 		  this.getCategoryTree);
		this.router.get('/categoryAttributes', 	  this.getCategoryAttributes);
		this.router.get('/categorySetAttributes', this.getCategorySetAttributes);

	}
}

const indexRoutes = new productEndPoints();

indexRoutes.routes();

export default indexRoutes.router;
