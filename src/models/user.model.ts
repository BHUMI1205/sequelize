// src/models/user.model.ts
import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false, 
})
export class users extends Model<users> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
