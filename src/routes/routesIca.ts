import { Router } from 'express';
import { isAuthenticated } from '../middleware/IsAuthticated';
import { isAuthIca } from '../middleware/isAuthIca';
import { GetAllAccountsController } from '../controllers/ica/GetAllAccountsController';
import { FetchIcaController } from '../controllers/ica/FetchIcaController';
import { GetAllTransactionsController } from '../controllers/ica/GetAllTransactionsController';

const router = Router();

// return all accounts to clientID
router.get(
  '/accounts',
  isAuthenticated,
  isAuthIca,
  new GetAllAccountsController().handle,
);

// return all transactions
router.get(
  '/transactions',
  isAuthenticated,
  isAuthIca,
  new GetAllTransactionsController().handle,
);

// fetch requests ica server api
router.post(
  '/request',
  isAuthenticated,
  isAuthIca,
  new FetchIcaController().handle,
);

export default router;
