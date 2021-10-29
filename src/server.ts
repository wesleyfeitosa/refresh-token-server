import 'express-async-errors'; // to handle async errors
import express, {Request, Response, NextFunction} from 'express';  // to handle http requests
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';  

const app = express();

app.use(express.json());

app.use('/documentation', (request: Request, response: Response, next: NextFunction) => {
    const { format } = request.query;
    if (format === 'json') {
        return response.status(200).json(require('./swagger.json'));
    }
    next();
}, swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(400).json({
        status: 'Error',
        message: error.message,
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
})