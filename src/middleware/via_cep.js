import axios from 'axios';

const via_cep = (req, res, next) => {

   req.body.address = req.body.address.replaceAll(".", "").replaceAll("-", "")
   if (
      req.body.address.length == 8 &&
      !isNaN(Number(req.body.address))
   ) {

      axios.get(`https://viaaddres.com.br/ws/${req.body.address}/json/`)
         .then(resposta => {
             
             delete req.body.address
             
             req.body.address = resposta.data

            next()
         })
   } else {
      res.status(400).json()

   }
}

export default via_cep; 