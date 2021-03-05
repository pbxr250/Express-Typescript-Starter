import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

const testRouter = Router();

testRouter.get('*', async (req: Request, res: Response) => {
    
    return res.status(StatusCodes.OK).json({message: "test ok"});
});

export default testRouter;