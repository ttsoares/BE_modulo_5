import { MessageEntity } from
"../../../../core/infra/data/database/entities/MessageEntitie";
import { UserEntity } from
"../../../../core/infra/data/database/entities/UserEntitie";

import { Message } from "../../domain/models/message";

interface CreateMessageParams {
  description: string;
  details: string;
  user_id: number;
}

interface UpdateMessageParams{
  uid: number,
  description: string;
  details: string;
}

export class MessageRepository {
//******************************

  ///// Cria uma nova mensagem no DB
  async create( data: CreateMessageParams, ): Promise<Message | undefined> {

    // const verifyUserByUid = await UserEntity.findOne({
    //   where: { uid: data.user_id }});
    //
    // if (!verifyUserByUid) return undefined;

    const messageEntity = MessageEntity.create({
      description: data.description,
      details: data.details,
      user_id: data.user_id,
    });

    await messageEntity.save();

    return this.mapperFromEntityToModel(messageEntity);
  }

  /////  Busca uma mensagem pelo 'uid'
  async getByUid(uid: number): Promise<Message | undefined> {
    const messageEntity = await MessageEntity.findOne(uid, {
      select: ["description", "details", "uid"]});

    if (!messageEntity) return undefined;
    return this.mapperFromEntityToModel(messageEntity);
  }

  /////   Apaga uma mensagem pelo 'uid'
  async delete(uid: number): Promise<Message | undefined> {
    const messageEntity = await MessageEntity.findOne(uid);
    if (!messageEntity) return undefined;
    const apagado = await messageEntity.remove()
    return this.mapperFromEntityToModel(messageEntity);
  }

  /////  Busca um array com todas as mensagens de um usuário
  async getAll(user_id: number): Promise<Message[]> {
    const messages = await MessageEntity.find({where: {user_id} });

    return messages.map(elm => this.mapperFromEntityToModel(elm))
  }

  /////  Atualiza o resgistro de uma mensagem buscada pelo getByUid
  async update( data: UpdateMessageParams, ): Promise<Message | undefined> {

    const message: MessageEntity | undefined = await MessageEntity.findOne({
			where: [ {uid: data.uid} ]});

    if (!message) return undefined;

    message.description = data.description;
    message.details = data.details

    await message.save();

    return this.mapperFromEntityToModel(message);
  }

  /////  função que transforma de 'entity' para 'model'
  private mapperFromEntityToModel(entity: MessageEntity): Message {
    return {
      uid: entity.uid,
      description: entity.description,
      details: entity.details,
      user_id: entity.user_id,
    };
  }
}
