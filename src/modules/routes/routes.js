const express = require('express');
const router = express.Router();

const {
    getAllPurchases,
    createNewPurchases,
    deletePurchase,
    updatePurchasesInfo
} = require('../controllers/purchases.controller');

router.get('/getPurchases', getAllPurchases);
router.post('/createPurchase', createNewPurchases);
router.delete('/deletePurchase/:id', deletePurchase);
router.put('/updatePurchase', updatePurchasesInfo);

module.exports = router;