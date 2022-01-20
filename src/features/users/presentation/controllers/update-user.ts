import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/user.repository"

export class GetOneUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

		const repository = new UserRepository();

    const user_id:number = Number(req.params.userid);
		const { name, password }: { name: string; password: string } = req.body;

		// empty password is not allowed
		if ( password.replace(/\s+/g,'') === '') return res.status(400).send("Senha vazia !");

		const findUser = await repository.findOne({where: [ {uid: user_id}]});
		findUser!.name = name;
		findUser!.password = password;
		await repository.save(findUser!);

		const temp:object = { name: name, password: password }
		return res.status(200).json(temp);

		} catch (err) {
			return serverError(res, err);
		}
	}
}
