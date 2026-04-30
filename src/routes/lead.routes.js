const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/lead.controller');

router.post('/leads', ctrl.createLead);
router.get('/leads', ctrl.getLeads);
router.get('/leads/:id', ctrl.getLeadById);
router.put('/leads/:id', ctrl.updateLead);
router.delete('/leads/:id', ctrl.deleteLead);

router.patch('/leads/:id/status', ctrl.updateStatus);

router.post('/leads/bulk', ctrl.bulkCreateLeads);
router.delete('/leads/bulk', ctrl.bulkDeleteLeads);

module.exports = router;