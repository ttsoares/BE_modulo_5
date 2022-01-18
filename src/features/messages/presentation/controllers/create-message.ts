import { Request, Response } from "express";
import Database from "../../../../core/infra/data/connections/database";
import { Message } from "../../../../core/infra/data/database/entities/MessageEntitie"

export default class messagesController {
	// Add a message
	public async store(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const user_id:number = Number(req.params.userid);
		const { description, details } = req.body;
		const result: Message = await new Message(description.slice(0,44), details.slice(0,149), user_id).save();
		const temp:object = { details: details, description: description, user_id: user_id };
		return res.status(200).json(temp);
	}
}
