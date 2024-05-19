module.exports = (sequelize, DataTypes) => {
    const Entity = sequelize.define('Entity', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      attributes: {
        type: DataTypes.JSON,
        allowNull: false
      },
      records: {
        type: DataTypes.JSON,
        allowNull: true
      }
    });
  
    return Entity;
  };
  