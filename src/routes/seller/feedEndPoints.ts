import { Request, Response, Router } from "express";
import fetch from "node-fetch";
import cripto from "js-sha256";
import moment from "moment-timezone";


import { ApiSeller } from '../../apis/seller/config';

class feedEndPoints
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
		const _function = new feedEndPoints();

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
	*	Función que obtiene todos los feeds creados en los últimos 30 días.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/feedlist
	*/

	public async getFeedList(req: Request, res: Response): Promise<void>{

		const _function = new feedEndPoints();
		const _params   = _function.setParams('FeedList');

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
	*	Función que obtiene todos o un subconjunto de todos los feeds creados en los últimos 30 días.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/feedoffsetlist
	*/

	public async getFeedOffsetList(req: Request, res: Response): Promise<void>{

		const _function = new feedEndPoints();
		const _params   = _function.setParams('FeedOffsetList');

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
	*	Función que obtiene estadísticas de alimentación
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/feedcount
	*/

	public async getFeedCount(req: Request, res: Response): Promise<void>{

		const _function = new feedEndPoints();
		const _params   = _function.setParams('FeedCount');

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
	*	Función que cancela todos los feeds en cola
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/feedcancel
	*/

	public async postFeedCancel(req: Request, res: Response): Promise<void>{

		const _function = new feedEndPoints();
		const _params   = _function.setParams('FeedCancel');

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
	*	Función que obtiene las fuentes especificadas, devuelve las solicitudes XML que se pasaron originalmente cuando se creó la fuente.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getfeedrawinput
	*/

	public async getFeedRawInput(req: Request, res: Response): Promise<void>{

		const _function = new feedEndPoints();
		const _params   = _function.setParams('GetFeedRawInput');

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
	*	Función que obtiene las fuentes especificadas, devuelve las solicitudes XML que se pasaron originalmente cuando se creó la fuente.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getfeedrawinput
	*/

	public async getFeedStatus(req: Request, res: Response): Promise<void>{

		const _function = new feedEndPoints();
		const _params   = _function.setParams('FeedStatus');

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

		// Feeds
		this.router.get('/feedList',  		this.getFeedList);
		this.router.get('/feedOffsetList',  this.getFeedOffsetList);
		this.router.get('/feedCount',  		this.getFeedCount);
		this.router.post('/feedCancel',     this.postFeedCancel);
		this.router.get('/feedRawInput',    this.getFeedRawInput);
		this.router.get('/feedStatus',      this.getFeedStatus);

	}
}

const indexRoutes = new feedEndPoints();

indexRoutes.routes();

export default indexRoutes.router;
