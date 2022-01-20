import { MessageEntity } from "../../../../core/infra/data/database/entities/MessageEntitie";
import { UserEntity } from "../../../../core/infra/data/database/entities/UserEntitie";

import { Message } from "../../domain/models/message";

interface MessageParams {
  uid?: number;
  description: string;
  details: string;
  user_id: number;
}

export class MessageRepository {
  async create(
    data: MessageParams,
    user_id: number //////////////////////////???
  ): Promise<Message | undefined> {
    const messageEntity = MessageEntity.create({
      /// uid ????
      description: data.description,
      details: data.details,
      user_id: user_id,
    });
    const verifyUserByUid = await UserEntity.findOne({
      where: { uid: user_id },
    });
    if (!verifyUserByUid) return undefined;

    await messageEntity.save();

    return this.mapperFromEntityToModel(messageEntity);
  }

  async getByUid(uid: string): Promise<Message | undefined> {
    const messageEntity = await MessageEntity.findOne(uid, {
      select: ["description", "details", "uid"],
    });

    if (!messageEntity) return undefined;

    return this.mapperFromEntityToModel(messageEntity);
  }

  private mapperFromEntityToModel(entity: MessageEntity): Message {
    return {
      uid: entity.uid,
      description: entity.description,
      details: entity.details,
      user_id: entity.user_id,
    };
  }
}
