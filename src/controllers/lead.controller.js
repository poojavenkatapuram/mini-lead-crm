const service = require('../services/lead.service');

// CREATE
exports.createLead = async (req, res) => {
  try {
    const lead = await service.createLead(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
exports.getLeads = async (req, res) => {
  const data = await service.getLeads(req.query);
  res.json(data);
};

// GET ONE
exports.getLeadById = async (req, res) => {
  const lead = await service.getLeadById(req.params.id);
  res.json(lead);
};

// UPDATE
exports.updateLead = async (req, res) => {
  const lead = await service.updateLead(req.params.id, req.body);
  res.json(lead);
};

// DELETE
exports.deleteLead = async (req, res) => {
  await service.deleteLead(req.params.id);
  res.json({ message: 'Deleted' });
};

// STATUS
exports.updateStatus = async (req, res) => {
  try {
    const lead = await service.updateStatus(
      req.params.id,
      req.body.status
    );
    res.json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// BULK CREATE
exports.bulkCreateLeads = async (req, res) => {
  const leads = await service.bulkCreateLeads(req.body);
  res.json(leads);
};

// BULK DELETE
exports.bulkDeleteLeads = async (req, res) => {
  const result = await service.bulkDeleteLeads(req.body.ids);
  res.json(result);
};