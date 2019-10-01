import moment from "moment";

const rules = {
    data: {
        presence: {
            message: "Informe uma data válida"
        }
    },
    tipo: {
        presence: {
            message: 'Informe o tipo'
        },
    },
    categoria: {
        presence: {
            message: 'Selecione uma categoria'
        },
    },
    valor: {
        presence: {
            message: "Informe o valor"
        }
    }

}

export default rules