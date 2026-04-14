import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { Company } from '../company/company.model';

export interface ErpSyncLogAttributes {
    id?: string;
    companyId: string;
    entityType: string;
    entityId?: string | null;
    action: string;
    status: string;
    requestPayload?: any | null;
    responsePayload?: any | null;
    errorMessage?: string | null;
    syncedAt?: Date | null;
}

export type ErpSyncLogCreationAttributes = Optional<ErpSyncLogAttributes, 'id' | 'entityId' | 'requestPayload' | 'responsePayload' | 'errorMessage' | 'syncedAt'>;
export class ErpSyncLog extends Model<ErpSyncLogAttributes, ErpSyncLogCreationAttributes> { }

ErpSyncLog.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    companyId: { type: DataTypes.UUID, field: 'company_id', allowNull: false },
    entityType: { type: DataTypes.STRING, field: 'entity_type', allowNull: false },
    entityId: { type: DataTypes.UUID, field: 'entity_id', allowNull: true },
    action: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'success', 'failed'), allowNull: false },
    requestPayload: { type: DataTypes.JSON, field: 'request_payload', allowNull: true },
    responsePayload: { type: DataTypes.JSON, field: 'response_payload', allowNull: true },
    errorMessage: { type: DataTypes.TEXT, field: 'error_message', allowNull: true },
    syncedAt: { type: DataTypes.DATE, field: 'synced_at', allowNull: true }
}, { 
    sequelize, 
    tableName: 'erp_sync_log', 
    modelName: 'ErpSyncLog', 
    timestamps: false, 
    freezeTableName: true 
});

ErpSyncLog.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'id' });