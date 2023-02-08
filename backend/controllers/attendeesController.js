const { createConnection } = require('../db');

const connection = createConnection();

    const getAttendees = (req, res) => {
        const user = req.user 
        connection.execute('SELECT * FROM event WHERE userid=? ORDER BY id DESC', [user.id], (err, attendees) => {
            res.send(attendees);
        });
    };


    const createAttendee = (req, res) => {
        const {name, surname, email, phone, userid} = req.body;

    
        let emptyFields =[]
        if(!name) {
        emptyFields.push('name')
        }
        if(!surname) {
        emptyFields.push('surname')
        }
        if(!email) {
        emptyFields.push('email')
        }
        if(!phone) {
        emptyFields.push('phone')
        }
    
        if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill all the fields', emptyFields})
        }

        // Email validation
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            emptyFields.push('email');
            return res.status(400).json({ error: 'Its not an Email adress', emptyFields });
        }
        
        try {
        connection.query('INSERT INTO event (name, surname, email, phone, userid) VALUES (?, ?, ?, ?, ?)', [name, surname, email, phone, userid], (error, results) => {
        });
        } catch (error) {
        res.status(400).json({error: error.message})
        }
        connection.query('SELECT * FROM event WHERE userId=? ORDER BY id DESC', [userid], (error, results) => {
            if (error) throw error;
            res.json(results);
        });
    } 

    const deleteAttendee = (req, res) => {
        const { id } = req.params;
        const {id: userid } = req.user;
      
        connection.execute(
            'DELETE FROM event WHERE id=? AND userid=?',
            [id, userid],
            () => {
                connection.execute(
                    'SELECT * FROM event WHERE userid=? ORDER BY id DESC', 
                    [userid],
                    (err, attendees) => {
                        res.send(attendees);
                    }
                )
            }
        )
      };


  module.exports = {
    getAttendees,
    createAttendee,
    deleteAttendee
  }