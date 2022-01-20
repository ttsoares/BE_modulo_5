import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { MessageRepository} from "../../infra/repositories/messages.repository"

export class DeleteMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const repository = new MessageRepository();

/*
public async destroy(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const user_id:number = Number(req.params.userid);
		const message_id:number = Number(req.params.messageid);
		const message: Message | undefined = await Message.findOne({
			where: [ {uid: message_id, user_id: user_id} ]});
		const temp:object={details: message!.details, description: message!.description}
		const remove = await Message.remove(message!);
		return res.status(200).json(temp);
	}
*/

		} catch (err) {
			return serverError(res, err);
		}
	}
}
