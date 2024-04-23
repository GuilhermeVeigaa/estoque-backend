 import { db } from "./bd.js"

export const getProduct = (_, res) => {
    db.query("SELECT * FROM product", (err, data) => {
        if (err) {
            return res.status(500).json({error: "Erro ao fazer consulta"})
        } else {
            return res.status(200).json(data)
        }
    })
}
