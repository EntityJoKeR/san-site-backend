import { init, addCase, deleteCase, getCases, getCase } from './database.js'
import Express from 'express'
import axios from 'axios'

const app = Express()
app.use(Express.json())

init()

app.get(`/`, (req, res)=>{
    testFunc()
})

app.get('/cases', async (req, res) => {
    const data = await getCases()
    res.send(data)
})

app.get('/cases/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    if(!id){
        return res.status(400).json({error: 'не добавлен id кейса'})
    }
    const data = await getCase(id)
    return res.status(200).json({message: 'ok', data: data[0]})
    
})

app.post('/addcase', (req, res) => {
    const { name, description, filename, date } = req.body;
    if (!name || !description || !filename || !date) {
        return res.status(400).json({ error: 'все поля обязательны' });
      }

    const newCase = {
        name,
        description,
        filename,
        date
    };
    addCase(newCase)
    res.status(200).json({
        message: 'кейс успешно создан',
        data: newCase
      });
})









const testFunc = () =>{
    const caseData = {
        name: "Test Case",
        description: "Some description",
        filename: "file.txt",
        date: "2023-10-01"
      };
      
      axios.post('http://localhost:3000/addcase', caseData)
  .then(response => {
    console.log(response.data); // Выводим только данные из ответа
  })
  .catch(error => {
    console.log(error.response ? error.response.data : error.message); // Выводим данные ошибки или сообщение
  });
}





app.listen(3000, () => {
    console.log('server run')
})