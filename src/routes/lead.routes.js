const express = require('express');
const router = express.Router();
const controller = require('../controllers/lead.controller');

// 🔥 BULK ROUTES FIRST (IMPORTANT FIX)
router.post('/leads/bulk', controller.bulkCreateLeads);
router.delete('/leads/bulk', controller.bulkDeleteLeads);

// Normal routes
router.post('/leads', controller.createLead);
router.get('/leads', controller.getLeads);
router.get('/leads/:id', controller.getLeadById);
router.put('/leads/:id', controller.updateLead);
router.delete('/leads/:id', controller.deleteLead);
router.patch('/leads/:id/status', controller.updateStatus);

module.exports = router;