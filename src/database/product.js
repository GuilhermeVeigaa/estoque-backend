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

export const  addProduct = (req, res) => {
    const {name, desc, image, price, amount} = req.body

    db.query("INSERT INTO product(`name`, `desc`, `image`, `price`, `amount`) VALUES (?,?,?,?,?)",[name, desc, image, price, amount], (err) => {
        if (err) {
            return res.status(500).json({error: "Erro ao inserir os produtos"})
        } else {
            return res.status(200).json({message: "Produtos cadastrados com sucesso"})
        }
    })
}

export const updateProduct = (req, res) => {
    const values = [
        req.body.name,
        req.body.desc,
        req.body.image,
        req.body.price,
        req.body.amount,
    ]

    const q = "UPDATE product SET `name` = ?, `desc` = ?, `image` = ?, `price` = ?, `amount` = ? WHERE `id` = ?"

    db.query(q, [...values, req.params.id], (err) => {
        if (err) {
            return res.status(500).json({error: "Erro ao atualizar produto"})
        } else {
            return res.status(200).json({message: "Produto atualizado com sucesso"})
        }
    })
}

export const deleteProduct = (req, res) => {
    const q = "DELETE FROM product WHERE `id` = ?"

    db.query(q, [req.params.id], (err) => {
        if (err) {
            res.status(500).json({error: "Erro ao deletar produto"})
        } else {
            return res.status(200).json({message: "Produto deletado com sucesso"})
        }
    })
}