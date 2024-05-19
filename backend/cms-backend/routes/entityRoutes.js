const express = require('express');
const router = express.Router();
const db = require('../models');


router.post('/entities', async (req, res) => {
  try {
    const { name, attributes } = req.body;
    const entity = await db.Entity.create({ name, attributes });
    res.json(entity);
  } catch (error) {
    console.error('Error creating entity:', error);
    res.status(500).send(error.message);
  }
});


router.get('/entities', async (req, res) => {
  try {
    const entities = await db.Entity.findAll();
    res.json(entities);
  } catch (error) {
    console.error('Error fetching entities:', error);
    res.status(500).send(error.message);
  }
});

router.post('/entities/:id/records', async (req, res) => {
  try {
    const entityId = req.params.id;
    const records = req.body.records;
    const entity = await db.Entity.findByPk(entityId);
    if (!entity) {
      return res.status(404).send('Entity not found');
    }
    await entity.update({ records });
    res.json(entity);
  } catch (error) {
    console.error('Error saving records:', error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
