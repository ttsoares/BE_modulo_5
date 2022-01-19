import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { MessageRepository} from "../../infra/repositories/messages.repository"

export class GetOneMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

			const repository = new MessageRepository();



		} catch (err) {
			return serverError(res, err);
		}
	}
}
