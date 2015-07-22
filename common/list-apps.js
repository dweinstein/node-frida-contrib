'use strict';
const co = require('co');
const Table = require('easy-table');

module.exports = co.wrap(function*(device) {
  const apps = yield device.enumerateApplications();
  const t = new Table();
  apps.forEach((app) => {
    t.cell('Name', app.name);
    t.cell('Identifier', app.identifier);
    t.cell('PID', app.pid || '-');
    t.newRow();
  });
  t.sort(['Name|asc']);
  return t.toString();
});