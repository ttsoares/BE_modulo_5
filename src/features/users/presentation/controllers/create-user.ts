import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/user.repository"

export class CreateUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

		const repository = new UserRepository();

    const { name, password } = req.body;
    const userExists: User | undefined = await User.findOne({where: [{name: name}]})
    if (userExists)  return res.status(400).send("Usuário já existe !")


		} catch (err) {
			return serverError(res, err);
		}
	}
}
