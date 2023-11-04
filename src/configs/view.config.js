import path from 'path';
import express from 'express';

export default (app) => {
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '../views'));
  app.use(express.static(path.join(__dirname, '../public')));
};
