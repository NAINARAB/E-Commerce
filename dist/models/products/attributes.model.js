"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeValue = exports.Attribute = void 0;
const sequelize_1 = require("sequelize");
const sequalizer_1 = require("../../config/sequalizer");
class Attribute extends sequelize_1.Model {
}
exports.Attribute = Attribute;
Attribute.init({
    id: { type: sequelize_1.DataTypes.UUID, primaryKey: true, defaultValue: sequelize_1.DataTypes.UUIDV4 },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    createdAt: { type: sequelize_1.DataTypes.DATE, field: 'created_at', defaultValue: sequelize_1.DataTypes.NOW }
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_attributes',
    modelName: 'Attribute',
    timestamps: false,
    freezeTableName: true
});
class AttributeValue extends sequelize_1.Model {
}
exports.AttributeValue = AttributeValue;
AttributeValue.init({
    id: { type: sequelize_1.DataTypes.UUID, primaryKey: true, defaultValue: sequelize_1.DataTypes.UUIDV4 },
    attributeId: { type: sequelize_1.DataTypes.UUID, field: 'attribute_id', allowNull: false },
    value: { type: sequelize_1.DataTypes.STRING, allowNull: false }
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_attribute_values',
    modelName: 'AttributeValue',
    timestamps: false,
    freezeTableName: true
});
// Associations
AttributeValue.belongsTo(Attribute, { foreignKey: 'attributeId', targetKey: 'id' });
