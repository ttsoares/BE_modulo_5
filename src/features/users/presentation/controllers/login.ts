import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/user.repository"

export class LoginUserController implements Controller{
  async handle(req: Request, res: Response): Promise<any> {
		try {

      const repository = new UserRepository();

      const { name, password } = req.body;

      const userExists = await repository.getOne(name);

      if (userExists.name === name && userExists.password === password)
        return res.status(200).send(`${userExists.uid}`);

    } catch (err:any) {
  			return serverError(res, err);
  		}
  }
}
