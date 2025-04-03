import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('kanban_db', 'postgres', 'teste', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
