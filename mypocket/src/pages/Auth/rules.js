import moment from "moment";

const rules = {
    email: {
        presence: {
            message: "Informe seu email"
        },
        email: {
            message: 'Informe um email valido'
        }
    },
    password: {
        presence: {
            message: "Informe sua senha"
        },
        length: {
            minimum: 6,
            message: 'Sua senha precisa ter pelo menos 6 digitos'
        }
    },
    dataNascimento:{
        datetime: {
            dateOnly: true,
            latest: moment.utc().subtract(10, 'years'),
            message: "^Informe uma data de nascimento valida"
          }
    },
    nome: {
        presence: {
            message: 'Informe seu nome'
        },
        length: {
            minimum: 3,
            message: 'Informe seu nome'
        }
    }
}

export default rules