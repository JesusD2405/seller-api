import { Request, Response, Router } from "express";
import fetch from "node-fetch";
import cripto from "js-sha256";
import moment from "moment-timezone";


import { ApiSeller } from '../../apis/seller/config';

class manifestEndPoints
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
		const _function = new manifestEndPoints();

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
	*	Función que devuelve un conjunto de Manifiestos.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getmanifestlist
	*/

	public async getManifestList(req: Request, res: Response): Promise<void>{

		const _function = new manifestEndPoints();
		const _params   = _function.setParams('GetManifestList');

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
	*	Función que devuelve un conjunto de Manifiestos.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/createforwardmanifest
	*/

	public async postForwardManifest(req: Request, res: Response): Promise<void>{

		const _function = new manifestEndPoints();
		const _params   = _function.setParams('CreateForwardManifest');

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
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getmanifestdocument
	*/

	public async getManifestDocument(req: Request, res: Response): Promise<void>{

		const _function = new manifestEndPoints();
		const _params   = _function.setParams('GetManifestDocument');

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
	*	Leer más.. https://sellerapi.sellercenter.net/docs/setmanifeststatustoshipped
	*/

	public async postManifestStatus(req: Request, res: Response): Promise<void>{

		const _function = new manifestEndPoints();
		const _params   = _function.setParams('SetManifestStatusToShipped');

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

		// Manifest End Points
		this.router.get('/manifestList',  		this.getManifestList);
		this.router.post('/forwardManifest',  	this.postForwardManifest);
		this.router.get('/manifestDocument',  	this.getManifestDocument);
		this.router.post('/manifestStatus',  	this.postManifestStatus);

	}
}

const indexRoutes = new manifestEndPoints();

indexRoutes.routes();

export default indexRoutes.router;
