import express from 'express'

import {addUsersAction, viewUsersAction, viewAllUsersAction,updateUsersAction,deleteUsersAction} from "../controller/userClient/userClientController.js"
import { oauthAuthentication } from '../helper/oauthHelper.js';


const router = express.Router();

router.post('/api/userclient/create',oauthAuthentication,  addUsersAction);
router.get('/api/userclient/view/:id', oauthAuthentication, viewUsersAction);
router.get('/api/userclient/viewall', oauthAuthentication, viewAllUsersAction);
router.put('/api/userclient/update/:id', oauthAuthentication, updateUsersAction);
router.delete('/api/userclient/delete/:id', oauthAuthentication, deleteUsersAction);

export default router; 