import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { MessageRepository} from "../../infra/repositories/messages.repository"

export class CreateMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

			const repository = new MessageRepository();

			const user_id:number = Number(req.params.userid);
			const { description, details } = req.body;

			const message = await repository.create(description.slice(0,44), details.slice(0,149), user_id)

			const temp:object = { details: details, description: description, user_id: user_id };
			return res.status(200).json(temp);

		} catch (err) {
			return serverError(res, err);
		}
	}
}
