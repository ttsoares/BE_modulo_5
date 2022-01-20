import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { MessageRepository} from "../../infra/repositories/messages.repository"

export class UpdateMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const repository = new MessageRepository();

/*
public async update(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const user_id:number = Number(req.params.userid);
		const message_id:number = Number(req.params.messageid);
		const { description, details }: { description: string; details: string } = req.body;
		const message: Message | undefined = await Message.findOne({
			where: [ {uid: message_id, user_id: user_id} ]});
		message!.description = description;
		message!.details = details;
		await Message.save(message!);
		const temp:object = { details: details, description: description };
		return res.status(200).json(temp);
	}
*/


		} catch (err) {
			return serverError(res, err);
		}
	}
}
