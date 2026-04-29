const service = require('../services/lead.service');

exports.createLead = async (req, res) => {
  try {
    const lead = await service.createLead(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLeads = async (req, res) => {
  const leads = await service.getLeads(req.query.status);
  res.json(leads);
};

exports.getLeadById = async (req, res) => {
  const lead = await service.getLeadById(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
};

exports.updateLead = async (req, res) => {
  const lead = await service.updateLead(req.params.id, req.body);
  res.json(lead);
};

exports.deleteLead = async (req, res) => {
  await service.deleteLead(req.params.id);
  res.status(204).send();
};

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