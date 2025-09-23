import express from 'express'

import { addBusinessListAction, viewBusinessListAction, viewAllBusinessListAction, updateBusinessListAction, deleteBusinessListAction, activeBusinessListAction } from "../controller/businessList/businessListController.js"
import { oauthAuthentication } from '../helper/oauthHelper.js';


const router = express.Router();

router.post('/api/businesslist/create', oauthAuthentication, addBusinessListAction);
router.get('/api/businesslist/view/:id', oauthAuthentication, viewBusinessListAction);
router.get('/api/businesslist/viewall', oauthAuthentication, viewAllBusinessListAction);
router.put('/api/businesslist/update/:id', oauthAuthentication, updateBusinessListAction);
router.delete('/api/businesslist/delete/:id', oauthAuthentication, deleteBusinessListAction);
router.put('/api/businesslist/activate/:id', oauthAuthentication, activeBusinessListAction);

export default router; 