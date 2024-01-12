import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "tasks",
  timestamps: false,
})
export class Task extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
  })
  uuid!: string;

  @Column({
    type: DataType.STRING,
  })
  status!: string;

  @Column({
    type: DataType.JSONB,
  })
  parameters!: Record<string, any>;
}
