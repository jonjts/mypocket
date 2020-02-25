import moment from "moment";

const rules = {
    descricao: {
        presence: {
            message: 'Informe a descrição',
            allowEmpty: false
        },
    },
    realizado_em: {
        datetime: {
            dateOnly: true,
            message: "Informe uma data válida"
        },
        presence: {
            message: "Informe a data",
            allowEmpty: false
        }
    },
    tipo: {
        presence: {
            message: 'Informe o tipo',
            allowEmpty: false
        },
    },
    categoria: {
        presence: {
            message: 'Selecione uma categoria',
            allowEmpty: false
        },
    },
    valor: {
        presence: {
            message: "Informe o valor",
            allowEmpty: false
        }
    }

}

export default rules