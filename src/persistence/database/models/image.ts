import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "images",
  timestamps: false,
})
export class Image extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.UUID,
    unique: true,
  })
  uuid!: string;

  @Column({
    type: DataType.STRING,
  })
  mimeType!: string;

  @Column({
    type: DataType.BLOB,
  })
  image!: Buffer;
}
