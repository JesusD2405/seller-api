import { Request, Response, Router } from "express";
import fetch from "node-fetch";
import cripto from "js-sha256";
import moment from "moment-timezone";


import { ApiSeller } from '../../apis/seller/config';

class salesOrderEndPoints
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
		const _function = new salesOrderEndPoints();

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
	*	Función que obtiene  los detalles del cliente para una gama de pedidos.
	*   Sustancialmente diferente de GetOrder, que recupera los artículos del pedido para un pedido.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getorders
	*/

	public async getOrders(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('GetOrders');

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
	*	Función que obtiene los artículos de pedido para un solo pedido. 
    *   Se diferencia de GetOrders, que obtiene los detalles del cliente.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getorder
	*/

	public async getOrder(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('GetOrder');

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
	*	Función que obtiene todos los comentarios pertenecientes a un solo pedido.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getordercomments
	*/

	public async getOrderComments(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('GetOrderComments');

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
	*	Función que obtiene los artículos para un pedido.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getorderitems
	*/

	public async getOrderItems(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('GetOrderItems');

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
	*	Función que obtiene los artículos para uno o más pedidos.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getorderitems
	*/

	public async getMultipleOrderItems(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('GetMultipleOrderItems');

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
	*	Función que cancela un solo artículo
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/setstatustocanceled
	*/

	public async postStatusToCanceled(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('SetStatusToCanceled');

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
	*	Función que marca un artículo de pedido como embalado
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/setstatustopackedbymarketplace
	*/

	public async postStatusToPacked(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('SetStatusToPackedByMarketplace');

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
	*	Función que marca un artículo de pedido como listo para enviar.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/setstatustoreadytoship
	*/

	public async postStatusToReady(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('SetStatusToReadyToShip');

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
	*	Función que registra un artículo con orden enviado.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/setstatustoshipped
	*/

	public async postStatusToShipped(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('SetStatusToShipped');

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
	*	Función que registra que un artículo de pedido no pudo ser entregado al cliente.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/setstatustofaileddelivery
	*/

	public async postStatusToFailed(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('SetStatusToFailedDelivery');

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
	*	Función que registra que un artículo de orden fue entregado.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/setstatustodelivered
	*/

	public async postStatusToDelivered(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('SetStatusToDelivered');

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
	*	
	*	Leer más.. https://sellerapi.sellercenter.net/docs/setinvoiceaccesskey
	*/

	public async postInvoiceAccessKey(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('SetInvoiceAccessKey');

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
	*	Función que recupera documentos relacionados con pedidos: facturas, etiquetas de envío y paquetes de envío.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getdocument
	*/

	public async getDocument(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('GetDocument');

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
	*	Función que devuelve un contexto de error adicional para SetToCancelled y SetToFailedDelivery.
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/getdocument
	*/

	public async getFailureReasons(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('GetFailureReasons');

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
	*	Leer más.. https://sellerapi.sellercenter.net/docs/setinvoicenumber
	*/

	public async postInvoiceNumber(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('SetInvoiceNumber');

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
	*	Función que marca los artículos de pedido como listos para recoger
	*
	*	Leer más.. https://sellerapi.sellercenter.net/docs/create-pickup-request
	*/

	public async postCreatePickupRequest(req: Request, res: Response): Promise<void>{

		const _function = new salesOrderEndPoints();
		const _params   = _function.setParams('CreatePickupRequest');

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
	*	Función que contiene todas las rutas de punto final de productos
	*/

	public routes(){

		// Feeds
		this.router.get('/orders',   			  this.getOrders);
		this.router.get('/order',    			  this.getOrder);
		this.router.get('/orderComments',   	  this.getOrderComments);
		this.router.get('/orderItems',   		  this.getOrderItems);
		this.router.get('/orderMultipleItems',    this.getMultipleOrderItems);

		this.router.post('/statusToCanceled',     this.postStatusToCanceled);
		this.router.post('/statusToPacked',       this.postStatusToPacked);
		this.router.post('/statusToReady',        this.postStatusToReady);
		this.router.post('/statusToShipped',      this.postStatusToShipped);
		this.router.post('/statusToFailed',       this.postStatusToFailed);
		this.router.post('/statusToDelivered',    this.postStatusToDelivered);
		this.router.post('/invoiceAccessKey',     this.postInvoiceAccessKey);

		this.router.get('/document',  			  this.getDocument);
		this.router.get('/failureReasons',  	  this.getFailureReasons);

		this.router.post('/invoiceNumber',     	  this.postInvoiceNumber);
		this.router.post('/createPickupRequest',  this.postCreatePickupRequest);

	}
}

const indexRoutes = new salesOrderEndPoints();

indexRoutes.routes();

export default indexRoutes.router;
