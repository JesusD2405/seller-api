import { Request, Response, Router } from "express";
import fetch from "node-fetch";
import cripto from "js-sha256";
import moment from "moment-timezone";


import { ApiSeller } from '../../apis/seller/config';

class webhookEndPoints
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
		const _function = new webhookEndPoints();

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
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getwebhooks
	*/

	public async getWebhooks(req: Request, res: Response): Promise<void>{

		const _function = new webhookEndPoints();
		const _params   = _function.setParams('GetWebhooks');

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
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getwebhookentities
	*/

	public async getWebhooksEntities(req: Request, res: Response): Promise<void>{

		const _function = new webhookEndPoints();
		const _params   = _function.setParams('GetWebhookEntities');

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
	*	Leer más.. https://sellerapi.sellercenter.net/docs/createwebhook
	*/

	public async postWebhooks(req: Request, res: Response): Promise<void>{

		const _function = new webhookEndPoints();
		const _params   = _function.setParams('CreateWebhook');

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
	*	Leer más.. https://sellerapi.sellercenter.net/docs/createwebhook
	*/

	public async deleteWebhooks(req: Request, res: Response): Promise<void>{

		const _function = new webhookEndPoints();
		const _params   = _function.setParams('DeleteWebhook');

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
	*	Función que contiene todas las rutas de punto finales de Webhook
	*/

	public routes(){

		// Webhook End Points
		this.router.get('/webhooks',  		    this.getWebhooks);
		this.router.get('/webhooksEntities',    this.getWebhooksEntities);
		this.router.post('/webhooksEntities',   this.postWebhooks);
		this.router.delete('/webhooksEntities', this.deleteWebhooks);

	}
}

const indexRoutes = new webhookEndPoints();

indexRoutes.routes();

export default indexRoutes.router;
