// o tipo user input serve para o req.body pois como exercicio inseri uma verificação dupla de senha
// porem esta verificação nao deve ser inserida no banco de dados, por isso nao faz parte da classe user. Nao tem ID porque o id sera recebido no service pelo uuid
export type userInput = {
  name: string
  email: string
  password: string
  checkPassword:string
}


// interface para definir os tipos das entradas
interface userType {
  name: string
  email: string
  password: string
  id: string
}

export class User implements userType {
  constructor(public name: string,public email: string,public password: string, public id: string) {}

}

// se eu estivesse usando sequelize, aqui viria a definiçao das tabelas e colunas, seguindo a definiçao da entidade user
/*
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';  // Conexão com o banco de dados


// Definindo a interface para os dados do usuário
export interface UserType {
  name: string;
  email: string;
  password: string;
}

// Definindo a classe User que implementa UserType
export class User extends Model<UserType> implements UserType {
  public name!: string;
  public email!: string;
  public password!: string;

  // Outras propriedades, como timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializando o Model no Sequelize
User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
});

*/
