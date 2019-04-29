import { Request, Response, Router } from "express";
import fetch from "node-fetch";
import cripto from "js-sha256";
import moment from "moment-timezone";


import { ApiSeller } from '../../apis/seller/config';

class sellerEndPoints
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
		const _function = new sellerEndPoints();

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
	*	Función que devuelve ventas y métricas de orden por un período específico.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getmetrics
	*/

	public async getMetrics(req: Request, res: Response): Promise<void>{

		const _function = new sellerEndPoints();
		const _params   = _function.setParams('GetMetrics');

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
	*	Función que devuelve ventas y métricas de orden por un período específico.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getpayoutstatus
	*/

	public async getPayoutStatus(req: Request, res: Response): Promise<void>{

		const _function = new sellerEndPoints();
		const _params   = _function.setParams('GetPayoutStatus');

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
	*	Función que devuelve ventas y métricas de orden por un período específico.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getstatistics
	*/

	public async getStatistics(req: Request, res: Response): Promise<void>{

		const _function = new sellerEndPoints();
		const _params   = _function.setParams('GetStatistics');

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
	*	Función que  actualizará la dirección de correo electrónico del vendedor para el vendedor del usuario que realiza la llamada.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/sellerupdate
	*/

	public async postSellerUpdate(req: Request, res: Response): Promise<void>{

		const _function = new sellerEndPoints();
		const _params   = _function.setParams('SellerUpdate');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'GET', body: req, headers: _headers })
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
	*	Función que esta llamada actualizará la dirección de correo electrónico de un usuario para el vendedor del usuario que realiza la llamada.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/userupdate
	*/

	public async postUserUpdate(req: Request, res: Response): Promise<void>{

		const _function = new sellerEndPoints();
		const _params   = _function.setParams('UserUpdate');

		const _headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		await fetch(ApiSeller.Instance.url+_params, { method: 'GET', body: req, headers: _headers })
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

		// Seller End Points
		this.router.get('/metrics',  	   this.getMetrics);
		this.router.get('/payoutStatus',   this.getPayoutStatus);
		this.router.get('/statistics',     this.getStatistics);

		this.router.post('/sellerUpdate',  this.postSellerUpdate);
		this.router.post('/userUpdate',    this.postUserUpdate);

	}
}

const indexRoutes = new sellerEndPoints();

indexRoutes.routes();

export default indexRoutes.router;
