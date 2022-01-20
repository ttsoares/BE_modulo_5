import { UserEntity } from "../../../../core/infra/data/database/entities/UserEntitie";
import { User } from "../../domain/models/user";

interface UserParams {
  uid?: string;
  name: string;
  password: string;
}

export class UserRepository {
  async signUp(data: UserParams): Promise<User> {
    const userEntity = UserEntity.create({
      name: data.name,
      password: data.password,
    });

    const verificaNome = await UserEntity.findOne({
      where: { name: data.name },
    });
    if (verificaNome) throw new Error("ALREADY_EXIST_USER_ERROR");

    await userEntity.save();

    return this.mapperFromEntityToModel(userEntity);
  }

  async signIn(data: UserParams): Promise<User | undefined> {
    const userEntity = await UserEntity.findOne({
      where: { name: data.name },
    });

    if (!userEntity) return undefined;

    return this.mapperFromEntityToModel(userEntity);
  }

  async getAll(): Promise<User[]> {
    const userEntities = await UserEntity.find({
      relations: ["messages"],
    });

    return userEntities.map((userEntity) =>
      this.mapperFromEntityToModel(userEntity)
    );
  }

  // async getByUid(uid: string): Promise<User | undefined> {
  //   const userEntity = await UserEntity.findOne(uid);

  //   if (!userEntity) return undefined;

  //   return this.mapperFromEntityToModel(userEntity);
  // }

  // async editUser(data: UserParams): Promise<User | undefined> {
  //   const userEntity = await UserEntity.findOne(data.uid);

  //   if (!userEntity) return undefined;

  //   const userUpdated = UserEntity.create({
  //     nome: data.nome,
  //     senha: data.senha,
  //     uid: data.uid,
  //   });

  //   await userUpdated.save();

  //   return this.mapperFromEntityToModel(userUpdated);
  // }

  // async destroy(uid: string): Promise<User | undefined> {
  //   const userEntity = await UserEntity.findOne(uid);

  //   if (!userEntity) return undefined;

  //   await UserEntity.remove(userEntity);

  //   return this.mapperFromEntityToModel(userEntity);
  // }

  private mapperFromEntityToModel(entity: UserEntity): User {
    return {
      uid: entity.uid,
      name: entity.name,
      password: entity.password,
      messages: entity.message,
    };
  }
}
