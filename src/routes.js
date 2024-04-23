import express from "express"
import bcrypt from "bcrypt"
import { db } from "./database/bd.js"
import { getProduct, addProduct, updateProduct, deleteProduct } from "./database/product.js"

export const routes = express.Router()



/* Faz uma requizição POST na rota /register, consultando no banco de dados o email passado no body, e verifica se o email já foi cadastrado no banco
se já cadastrado retorna um erro falando que o email já foi cadastrado.

depois faz a criptografia da senha usando o bcrypt, transaformando a senha um hash

seguinte faz o insert das informações no banco.

name, email e hashedPassword */

routes.post('/register', (req, res) => {
    const { name ,email, password } = req.body

    db.query("SELECT email FROM users WHERE email = ?",[email], (err, results) => {
        if (err) {
            return res.status(500).json({error: "Erro ao verificar email no banco"})
        } 

        if (results.length > 0) {
            return res.status(400).json({error: "Email já cadastrado"})
        }

        bcrypt.hash(password, 10, (hashErr, hasRes) => {
            if (hashErr) {
                return res.status(500).json({err: "Erro ao criptografar a senha"})
            }

            db.query("INSERT INTO users(`name`, `email`, `password`) VALUES (?,?,?)",[name, email, hasRes], (err) => {
                if (err) {
                    return res.status(400).json({err: "Erro ao inserir dados"})
                } else {
                    return res.status(200).json({message: "Usuário cadastrado com sucesso"})
                }
            })
        })
    })

})

/* Faz uma requizição POST igual no /register só que na rota /login
em sequencia faz um comsulta no banco dados  consultando todas as informações com base no email passado.
se o do email passado não tiver no banco ele resulta em credenciais inválidas.
em sequencia se estiver tudo certo ele armazena o primeiro resultado em uma constante user
já que o email é unico pode ser o primeiro resultado.

em seguida faz uma comparação da senha, se forem iguais ele faz o login, caso não seja
ele retorna um erro */

routes.post('/login', (req, res) => {
    const { email, password } = req.body

    db.query("SELECT * FROM users WHERE email = ?",[email], (err, results) => {
        if (err) {
            return res.status(500).json({err: "Erro ao buscar o usuário no banco"})
        }

        if (results.length === 0) {
            return res.status(400).json({err: "Credenciais inválidas"})
        }

        const user = results[0]

        bcrypt.compare(password, user.password, (compErr, isMatch) => {
            if (compErr) {
                return res.status(500).json({error: "Erro ao comparar senhas"})
            }

            if (isMatch) {
                //return res.status(200).json({message: "Login bem-sucedido"})
                return res.redirect('/estoque')
            } 
            else {
                return res.status(400).json({error: "Credenciais inválidas"})
            }
        })
    })
})

routes.get('/estoque', getProduct)

routes.post("/estoque", addProduct)

routes.put("/estoque:id", updateProduct)

routes.delete("/estoque:id", deleteProduct)
