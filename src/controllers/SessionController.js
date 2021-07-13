// metodos: index, show, update, store, destroy

/*
index: lsitagem de sessoes
store: criar uma sessao
show: quando queremos listar uma UNICA sessao
update: quando queremos altera alguma sesssao
destroy: quando queremos deletar
*/

import * as Yup from "yup";
import User from "../models/User";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha na validação." });
    }

    // verificando se usuario existe
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
