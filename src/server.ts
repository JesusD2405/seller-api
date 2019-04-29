import express 		from 'express';
import morgan 		from 'morgan';
import helmet 		from 'helmet';
import compression 	from 'compression';
import cors 		from 'cors';

/* Routes */

import productEndPoints 	      from './routes/seller/productEndPoints';
import feedEndPoints    	      from './routes/seller/feedEndPoints';
import salesOrderEndPoints  	  from './routes/seller/salesOrderEndPoints';
import shipmentProviderEndPoints  from './routes/seller/shipmentProviderEndPoints';
import sellerEndPoints  	      from './routes/seller/sellerEndPoints';
import manifestEndPoints  	      from './routes/seller/manifestEndPoints';
import qualityControlEndPoints    from './routes/seller/qualityControlEndPoints';
import webhookEndPoints    		  from './routes/seller/webhookEndPoints';

class Server
{
	public app: express.Application;

	constructor()
	{
		this.app = express();
		this.config();
		this.routes();
	}

	config()
	{
		// Settings
		this.app.set('port', process.env.PORT || 3000);

		// Middlewares
		this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({extended: false}));
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(cors());
	}

	routes()
	{
		/* Routes Seller Api */

		// Products End Points
		this.app.use('/api/seller', productEndPoints);

		// Feed End Points
		this.app.use('/api/seller', feedEndPoints);

		// Sales Order End Points
		this.app.use('/api/seller', salesOrderEndPoints);

		// Shipment Provider End Points
		this.app.use('/api/seller', shipmentProviderEndPoints);

		// Seller End Points
		this.app.use('/api/seller', sellerEndPoints);

		// Manifest End Points
		this.app.use('/api/seller', manifestEndPoints);

		// Quality Control End Points
		this.app.use('/api/seller', qualityControlEndPoints);

		// Quality Control End Points
		this.app.use('/api/seller', webhookEndPoints);

	}

	start()
	{
		this.app.listen(this.app.get('port'), () => {

			console.log('Server on port: ', this.app.get('port'));

		});

	}

}


const server = new Server();

server.start();