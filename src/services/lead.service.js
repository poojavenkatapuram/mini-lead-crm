const Lead = require('../models/lead.model');

// 🔥 Transition rules (PDF exact)
const transitions = {
  NEW: ['CONTACTED', 'LOST'],
  CONTACTED: ['QUALIFIED', 'LOST'],
  QUALIFIED: ['CONVERTED', 'LOST'],
  CONVERTED: [],
  LOST: []
};

const validateTransition = (current, next) => {
  if (['CONVERTED', 'LOST'].includes(current)) {
    throw new Error(`Cannot transition from ${current}`);
  }

  if (!transitions[current].includes(next)) {
    throw new Error(`Invalid status transition from ${current} to ${next}`);
  }
};

// CREATE
exports.createLead = async (data) => {
  if (!data.name) throw new Error('Name is required');
  if (!data.email) throw new Error('Email is required');

  return await Lead.create(data);
};

// GET ALL (with filter)
exports.getLeads = async (status) => {
  const filter = status ? { status } : {};
  return await Lead.find(filter);
};

// GET ONE
exports.getLeadById = async (id) => {
  return await Lead.findById(id);
};

// UPDATE
exports.updateLead = async (id, data) => {
  return await Lead.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
exports.deleteLead = async (id) => {
  return await Lead.findByIdAndDelete(id);
};

// STATUS UPDATE
exports.updateStatus = async (id, newStatus) => {
  const lead = await Lead.findById(id);
  if (!lead) throw new Error('Lead not found');

  validateTransition(lead.status, newStatus);

  lead.status = newStatus;
  return await lead.save();
};