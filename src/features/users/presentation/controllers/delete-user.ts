import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/user.repository"

export class DeleteUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

		const repository = new UserRepository();

    const user_id:number = Number(req.params.userid)

		const findUser: User | undefined = await repository.findOne(user_id)

		if (!findUser) return res.status(404).send("Usuário não encontrado");

		const temp:object={name: findUser.name, password: findUser.password}

    const remove = await repository.remove(findUser)
		return res.status(200).json(temp);


		} catch (err) {
			return serverError(res, err);
		}
	}
}
