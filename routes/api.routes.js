'use strict';

const express = require('express');
const users = require('../controllers/userController');
const roles = require('../controllers/rolController');
const rooms = require('../controllers/roomController');
const api = express.Router();

api.get('/users', users.getAll);
api.get('/users/deleted', users.getAllDeleted);
api.get('/users/:username', users.getByUsername);
api.post('/users', users.insertUsername);
api.put('/users/:username', users.updateUsername);
api.delete('/users/:username', users.deleteUsername);

api.get('/roles', roles.controllerRolFunction);
api.get('/rooms', rooms.getAllRooms);
api.get('/rooms/:id', rooms.getRoomsByParams);

module.exports = api