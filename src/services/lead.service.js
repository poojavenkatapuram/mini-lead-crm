const Lead = require('../models/lead.model');
const { client } = require('../config/redis');

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
    throw new Error(`Invalid status transition`);
  }
};

const clearCache = async () => {
  try {
    if (client.isOpen) await client.flushAll();
  } catch {}
};

// CREATE
exports.createLead = async (data) => {
  const lead = await Lead.create(data);
  await clearCache();
  return lead;
};

// GET (with caching)
exports.getLeads = async (query) => {
  const key = `leads:${JSON.stringify(query)}`;

  try {
    if (client.isOpen) {
      const cached = await client.get(key);
      if (cached) {
        console.log('⚡ Cache hit');
        return JSON.parse(cached);
      }
    }
  } catch {}

  console.log('🐢 Cache miss');

  const { status, search, page = 1, limit = 10 } = query;

  let filter = {};
  if (status) filter.status = status;

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * limit;

  const leads = await Lead.find(filter)
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ created_at: -1 });

  const total = await Lead.countDocuments(filter);

  const result = {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: leads
  };

  try {
    if (client.isOpen) {
      await client.setEx(key, 60, JSON.stringify(result));
    }
  } catch {}

  return result;
};

// GET ONE
exports.getLeadById = async (id) => {
  return await Lead.findById(id);
};

// UPDATE
exports.updateLead = async (id, data) => {
  const lead = await Lead.findByIdAndUpdate(id, data, { new: true });
  await clearCache();
  return lead;
};

// DELETE
exports.deleteLead = async (id) => {
  await Lead.findByIdAndDelete(id);
  await clearCache();
};

// STATUS
exports.updateStatus = async (id, status) => {
  const lead = await Lead.findById(id);
  if (!lead) throw new Error('Lead not found');

  validateTransition(lead.status, status);

  lead.status = status;
  await clearCache();
  return await lead.save();
};

// BULK CREATE
exports.bulkCreateLeads = async (data) => {
  const leads = await Lead.insertMany(data);
  await clearCache();
  return leads;
};

// BULK DELETE
exports.bulkDeleteLeads = async (ids) => {
  const result = await Lead.deleteMany({ _id: { $in: ids } });
  await clearCache();
  return result;
};