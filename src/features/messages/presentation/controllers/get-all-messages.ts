import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { MessageRepository} from "../../infra/repositories/messages.repository"

export class GetAllMessagesController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const repository = new MessageRepository();



/*
	public async view(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const user_id:number = Number(req.params.userid);
		const messages = await Message.find( { where: [ { user_id: user_id}]});
		return res.status(200).render('messages', {data:messages});  // To EJS
	}
*/
		} catch (err) {
			return serverError(res, err);
		}
	}
}
